import { app } from "electron";
import { onActivate, onBeforeQuit, onWhenReady, onWindowAllClosed } from "../handlers/app";
import { startRouter } from './../router';

export class AppService {
  public static launch() {
    app.on('before-quit', onBeforeQuit);
    app.on('window-all-closed', onWindowAllClosed);
    app.on('activate', onActivate);
    app.whenReady().then(onWhenReady);

    startRouter();

    // process.on('SIGINT', async () => {
    //   LogService.log('Received SIGINT. Stopping PostgreSQL server...');
    //   await PostgresService.stopPostgresServer();
    //   process.exit(0);
    // });
    // process.on('SIGTERM', async () => {
    //   LogService.log('Received SIGTERM. Stopping PostgreSQL server...');
    //   await PostgresService.stopPostgresServer();
    //   process.exit(0);
    // });
    // process.on('uncaughtException', async (err) => {
    //   LogService.error('Uncaught exception:', err);
    //   LogService.log('Stopping PostgreSQL server due to error...');
    //   await PostgresService.stopPostgresServer();
    //   process.exit(1);
    // });
  }
}
