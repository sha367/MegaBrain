import { BrowserWindow } from "electron";

export class LOG {
  static getWin?: (() => BrowserWindow | null) | undefined;

  static init(getWin: () => BrowserWindow | null) {
    LOG.getWin = getWin;
  }

  static info(message: string) {
    console.log(message);
    LOG.getWin?.()?.webContents.send('main-process-message', message);
  }
  static error(message: string) {
    console.error(message);
    LOG.getWin?.()?.webContents.send('main-process-error', message);
  }
  static warn(message: string) {
    console.warn(message);
    LOG.getWin?.()?.webContents.send('main-process-warn', message);
  }
};
