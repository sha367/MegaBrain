import { createRequire } from "module";
import path from "node:path";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3");

import { open } from "sqlite";

export const openDb = async () => {
  return open({
    filename: process.env.NODE_ENV === 'development'
      ? path.resolve(process.env.APP_ROOT, 'server', 'database', 'db.dev.sqlite')
      : path.resolve(process.env.RESOURCES_PATH, 'database', 'db.sqlite'),
    driver: sqlite3.Database
  });
};
