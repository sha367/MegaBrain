import { app, BrowserWindow } from "electron"
import path from "node:path"
import { ConfigProvider } from "./ConfigProvider"

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
      icon: path.join(ConfigProvider.$props.VITE_PUBLIC, 'electron-vite.svg'),
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        preload: path.join(ConfigProvider.$props.APP_ROOT, 'el/preload.mjs'),
      },
    })

    // Open the DevTools.
    // if (ConfigProvider.$props.VITE_DEV_SERVER_URL) {
    WindowProvider._win.webContents.openDevTools()

    // Test active push message to Renderer-process.
    WindowProvider._win.webContents.on('did-finish-load', () => {
      WindowProvider._win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (ConfigProvider.$props.VITE_DEV_SERVER_URL) {
      await WindowProvider._win.loadURL(ConfigProvider.$props.VITE_DEV_SERVER_URL)
    } else {
      // win.loadFile('dist/index.html')
      await WindowProvider._win.loadFile(path.join(ConfigProvider.$props.RENDERER_DIST, 'index.html'))
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

  /** Send a message to the main process */
  public static sendMainProcessMessage(channel: string, ...args: unknown[]) {
    WindowProvider._win?.webContents.send(channel, ...args)
  }
}

WindowProvider.init();
