// import { BrowserWindow } from "electron";
import { WindowProvider } from "../providers/WindowProvider";

/**
 * Send messages to all windows.
 */
export class WindowContentService {
  /**
   * Send a message to all windows.
   */
  public static sendToAllWindows(channel: string, ...args: unknown[]) {
    // BrowserWindow.getAllWindows().forEach(window => {
    //   window.webContents.send(channel, ...args);
    // });
    WindowProvider.win?.webContents.send(channel, ...args);
  }
}
