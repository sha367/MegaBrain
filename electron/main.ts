import { app, BrowserWindow } from 'electron';

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

import { ConfigProvider } from './providers/configProvider';
import { WindowProvider } from './providers/windowProvider';
import { LOG } from './providers/logProvider';
import { RouterProvider } from './providers/routerProvider';
import { runLLM, stopLLM } from './services/llmService';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

ConfigProvider.initConfigs(__dirname);
WindowProvider.init(__dirname);
LOG.init(WindowProvider.getWin);
RouterProvider.init();

WindowProvider.setOnBeforeMount(runLLM);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    WindowProvider.deleteWindow()
  }
});

app.on('before-quit', stopLLM);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow();
  }
});

app.whenReady().then(WindowProvider.createWindow);
