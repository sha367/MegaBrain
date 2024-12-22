import { app } from "electron"
import { WindowProvider } from "../providers/WindowProvider"

export class RendererService {
  /** Initialize the WindowProvider */
  public static launch() {
    app.on('window-all-closed', WindowProvider.onWindowAllClosed)
    app.on('activate', WindowProvider.onActivate)
    app.whenReady().then(WindowProvider.onReady)
  }
}
