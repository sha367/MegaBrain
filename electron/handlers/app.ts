import { app, BrowserWindow } from "electron";
import { PostgresService } from "../services/PostgresService/PostgresService";
import { WindowProvider } from "../providers/WindowProvider";
import { LogService } from "../services/LogService";

let isQuitting = false;

/**
 * On before quitting the app.
 */
export const onBeforeQuit = async (event: Electron.Event) => {
  if (isQuitting) return;
  console.log('Stopping PostgreSQL server...');
  isQuitting = true;
  event.preventDefault();

  try {
    await PostgresService.stopPostgresIfRunning();
  } catch (error) {
    LogService.error('Error stopping PostgreSQL server:', error);
  } finally {
    app.quit();
  }
};

/**
 * On all windows closed.
 * @description Quit when all windows are closed, except on macOS. There, it's common
 * for applications and their menu bar to stay active until the user quits 
 * explicitly with Cmd + Q.
 */
export const onWindowAllClosed = () => {
  if (process.platform !== 'darwin') {
    app.quit()
    WindowProvider.win = null
  }
};

/**
 * On activate.
 */
export const onActivate = () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow()
  }
};

/**
 * On when ready.
 */
export const onWhenReady = async () => {
  await WindowProvider.createWindow();
  PostgresService.launch();
};
