import { app } from "electron"
import { WindowProvider } from "../providers/WindowProvider"

export class MainService {
  /** Initialize the WindowProvider */
  public static launch() {
    app.on('window-all-closed', WindowProvider.onWindowAllClosed)
    app.on('activate', WindowProvider.onActivate)
    app.on('before-quit', WindowProvider.onBeforeQuit)
    app.whenReady().then(WindowProvider.onReady)
  }
}
