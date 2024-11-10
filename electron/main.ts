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

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Init providers
{
  ConfigProvider.initConfigs(__dirname);
  WindowProvider.init(__dirname);
  LOG.init(WindowProvider.getWin);
  WinContentProvider.init(WindowProvider.getWin)
  RouterProvider.init();
}

// TODO: move to /handlers
const onBeforeMount = () => {
  runLLM();
};
const onWindowAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};
const onBeforeQuit = () => {
  stopLLM();
};
const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow();
  }
};
const onWhenReady = () => {
  WindowProvider.createWindow();
};

WindowProvider.setOnBeforeMount(onBeforeMount);

app.on('window-all-closed', onWindowAllClosed);
app.on('before-quit', onBeforeQuit);
app.on('activate', onActivate);
app.whenReady().then(onWhenReady);
