import { BrowserWindow } from "electron";
import path from 'node:path';
import { $props } from "./ConfigProvider";

/**
 * A provider for the electron window.
 */
export class WindowProvider {
  /**
   * The electron window.
   */
  public static win: BrowserWindow | null;

  /**
   * Create a new electron window.
   */
  public static async createWindow() {
    WindowProvider.win = new BrowserWindow({
      icon: path.join($props.vitePublic, 'electron-vite.svg'),
      webPreferences: {
        preload: path.join($props.mainDist, 'preload.mjs'),
      },
      minWidth: 1080,
      width: 1080,
      minHeight: 720,
      height: 720,
    });
    
    // if ($props.isDev) {
      WindowProvider.win?.webContents.openDevTools();
    // }

    WindowProvider.loadRenderer();
  }

  /**
   * Load the renderer process.
   */
  private static async loadRenderer() {
    if ($props.viteDevServerUrl) {
      await WindowProvider.win?.loadURL($props.viteDevServerUrl);
    } else {
      await WindowProvider.win?.loadFile(path.join($props.rendererDist, 'index.html'));
    }
  }
}
