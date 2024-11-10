import { BrowserWindow } from "electron";

export class WinContentProvider {
  static getWin?: (() => BrowserWindow | null) | undefined;

  static init(getWin: () => BrowserWindow | null) {
    WinContentProvider.getWin = getWin;
  }

  static send(channel: string, message: string) {
    WinContentProvider.getWin?.()?.webContents.send(channel, message);
  }
};
