import { app, BrowserWindow } from "electron"
import path from "node:path"
import { LLMProvider } from "./LLMProvider"

export class WindowProvider {
  /** The BrowserWindow instance */
  private static _win: BrowserWindow | null

  /** Get the BrowserWindow instance */
  public static get win() {
    return WindowProvider._win
  }

  /** Initialize the WindowProvider */
  public static init() {}

  /** Create a new window */
  public static async createWindow() {
    WindowProvider._win = new BrowserWindow({
      // icon: process.platform === 'linux' ? 'assets/icons/icon.png' : undefined,
      icon: path.join(process.env.VITE_PUBLIC, 'assets/icons/icon.icns'),
      width: 1280,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: path.join(process.env.MAIN_DIST, 'preload.mjs'),
      },
    })

    // Open the DevTools.
    if (process.env.VITE_DEV_SERVER_URL) {
      WindowProvider._win.webContents.openDevTools()
    }

    // Test active push message to Renderer-process.
    WindowProvider._win.webContents.on('did-finish-load', () => {
      WindowProvider._win?.webContents.send('main-process-message', 'Hello from main process!');
    })

    if (process.env.VITE_DEV_SERVER_URL) {
      await WindowProvider._win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
      // win.loadFile('dist/index.html')
      await WindowProvider._win.loadFile(path.join(process.env.RENDERER_DIST, 'index.html'))
    }
  }

  /**
   * Quit when all windows are closed, except on macOS.
   * There, it's common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q.
   */
  public static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
      WindowProvider._win = null;
    }
  }

  /** Activate the window */
  public static onActivate() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      WindowProvider.createWindow();
    }
  }

  /** When the app is ready */
  public static onReady() {
    WindowProvider.createWindow();
  }

  /** Before the app quits */
  public static onBeforeQuit() {
    LLMProvider.stopLLM();
  }

  /** Send a message to the main process */
  public static sendMainProcessMessage(channel: string, ...args: unknown[]) {
    // BrowserWindow.getAllWindows().forEach(window => {
    //   window.webContents.send(channel, ...args);
    // });
    WindowProvider._win?.webContents.send(channel, ...args)
  }
}

WindowProvider.init();
