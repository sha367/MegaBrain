import path from 'node:path';
import { BrowserWindow } from "electron";
import { ConfigProvider as CP } from "./configProvider";

export class WindowProvider {
  private static dirname: string = '';
  static init(dirname: string) {
    WindowProvider.dirname = dirname;
  }

  static _win: BrowserWindow | null = null;
  static getWin() {
    return WindowProvider._win;
  }
  static deleteWindow() {
    WindowProvider._win = null;
  }

  static onBeforeMount: (() => void) | undefined;
  static setOnBeforeMount(callback: () => void) {
    WindowProvider.onBeforeMount = callback;
  }

  static createWindow() {
    console.log('========================');
    console.log('=======Creating window=====');
    console.log('========================');
    WindowProvider._win = new BrowserWindow({
      icon: path.join(CP.configs.VITE_PUBLIC, 'images/ollama-avatar.png'),
      width: 1080,
      minWidth: 1080,
      height: 800,
      minHeight: 800,
      webPreferences: {
        preload: path.join(WindowProvider.dirname, 'preload.mjs'),
      },
    });

    // !Comment it before release build
    WindowProvider._win.webContents.openDevTools();

    WindowProvider.onBeforeMount?.();

    if (CP.configs.VITE_DEV_SERVER_URL) {
      WindowProvider._win.loadURL(CP.configs.VITE_DEV_SERVER_URL);
    } else {
      WindowProvider._win.loadFile(path.join(CP.configs.RENDERER_DIST, 'index.html'));
    }

    WindowProvider._win.on('closed', () => {
      WindowProvider._win = null;
    });
  }
}
