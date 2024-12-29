import { LoadingProvider } from "./../providers/LoadingProvider"
import { ipcMain } from "electron"

export const startElRouter = () => {
  ipcMain.handle('get:loading', async () => {
    return LoadingProvider.loading;
  });
}
