import { LogProvider } from "./LogProvider";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const sqlite3 = require('sqlite3').verbose();

export class SqliteProvider {
  public static async launch() {
    try {
      console.warn('=====');
      LogProvider.log('Sqlite launched', sqlite3);
    } catch (err) {
      console.warn('=====', err);
    }
  }
}
