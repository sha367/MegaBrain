import { app, BrowserWindow } from 'electron';

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

import { ConfigProvider } from './providers/configProvider';
import { WindowProvider } from './providers/windowProvider';
import { LOG } from './providers/logProvider';
import { RouterProvider } from './providers/routerProvider';
import { runLLM, stopLLM } from './services/llmService';
import { WinContentProvider } from './providers/winContentProvider';
import { applyMigrations, initDB, startDB, stopDB } from './services/postgresService';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('process env: 1')

// Init providers
{
  ConfigProvider.initConfigs(__dirname);
  console.log('process env: 2')
  WindowProvider.init(__dirname);
  LOG.init(WindowProvider.getWin);
  WinContentProvider.init(WindowProvider.getWin)
  RouterProvider.init();
}

// TODO: move to /handlers
// const onBeforeMount = () => {
//   runLLM();
//   initDB();
//   startDB();
// };
const onWindowAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};
const onBeforeQuit = () => {
  stopLLM();
  stopDB();
};
const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow();
  }
};
const onWhenReady = async () => {
  try {
    WindowProvider.createWindow();
    runLLM(); // Запускаем LLM
    await initDB(); // Инициализация базы данных
    await startDB(); // Запуск базы данных
    await applyMigrations(); // Применение миграций
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error('Error during initialization: ' + message);
  }
};

// WindowProvider.setOnBeforeMount(onBeforeMount);

app.on('window-all-closed', onWindowAllClosed);
app.on('before-quit', onBeforeQuit);
app.on('activate', onActivate);
app.whenReady().then(onWhenReady);
