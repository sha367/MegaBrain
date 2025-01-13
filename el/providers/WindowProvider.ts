import { app, BrowserWindow, ipcMain } from "electron"
import path from "node:path"
import { LLMProvider } from "./LLMProvider"

export class WindowProvider {
  /** The BrowserWindow instance */
  private static _win: BrowserWindow | null = null;

  /** Get the BrowserWindow instance */
  public static get win() {
    return WindowProvider._win;
  }

  /** Initialize the WindowProvider */
  public static init() {
    // Initialize window control handlers
    WindowProvider.initWindowControlHandlers();
  }

  /** Initialize window control handlers */
  private static initWindowControlHandlers() {
    ipcMain.on("window-control", (_, action: "minimize" | "maximize" | "close") => {
      if (!WindowProvider._win) return;

      switch (action) {
        case "minimize":
          WindowProvider._win.minimize();
          break;
        case "maximize":
          if (WindowProvider._win.isMaximized()) {
            WindowProvider._win.unmaximize();
          } else {
            WindowProvider._win.maximize();
          }
          break;
        case "close":
          WindowProvider._win.close();
          break;
      }
    });
  }

  /** Create a new window */
  public static async createWindow() {
    WindowProvider._win = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, "assets/icons/icon.icns"),
      width: 1280,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      frame: false, // Required for custom titlebar
      titleBarStyle: "hidden", // Better integration with macOS
      trafficLightPosition: { x: 12, y: 18 }, // Position macOS window controls
      webPreferences: {
        preload: path.join(process.env.MAIN_DIST, "preload.mjs"),
        nodeIntegration: true,
        contextIsolation: true,
      },
    })

    // Open the DevTools in development
    if (process.env.VITE_DEV_SERVER_URL) {
      WindowProvider._win.webContents.openDevTools()
    }

    // Test active push message to Renderer-process
    WindowProvider._win.webContents.on("did-finish-load", () => {
      WindowProvider._win?.webContents.send("main-process-message", "Hello from main process!")
    })

    if (process.env.VITE_DEV_SERVER_URL) {
      await WindowProvider._win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
      await WindowProvider._win.loadFile(path.join(process.env.RENDERER_DIST, "index.html"))
    }
  }

  /**
   * Quit when all windows are closed, except on macOS.
   * There, it's common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q.
   */
  public static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
      WindowProvider._win = null;
    }
  }

  /** Activate the window */
  public static onActivate() {
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
    WindowProvider._win?.webContents.send(channel, ...args);
  }
}

WindowProvider.init();
