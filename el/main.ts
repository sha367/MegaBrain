import { ipcMain } from "electron";
import { startElectron } from ".";
import * as os from "os";

startElectron();

// Add this with your other IPC handlers
ipcMain.handle("get:system-ram", () => {
  const totalMemory = os.totalmem();
  // Convert to GB and round to 1 decimal place
  return Math.round((totalMemory / (1024 * 1024 * 1024)) * 10) / 10;
});
