import { LogProvider } from "../providers/LogProvider";
import { SqliteProvider } from "../providers/SqliteProvider";

export class SqliteService {
  public static async launch() {
    try {
      await SqliteProvider.launch();
      LogProvider.log('Sqlite launched');
    } catch (err) {
      LogProvider.error('Failed to launch Postgres server', err);
    }
  }
}
