import { LogProvider } from "../providers/LogProvider";
import { PostgresProvider } from "../providers/PostgresProvider";

export class PostgresService {
  /** Launch the server */
  public static async launch() {
    try {
      await PostgresProvider.launch();
      LogProvider.log('Postgres server launched');
    } catch (err) {
      LogProvider.error('Failed to launch Postgres server', err);
    }
  }
}
