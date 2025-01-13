import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

import path from 'node:path';

export const openDb = () => {
  const filename =
    process.env.NODE_ENV === 'development'
      ? path.resolve(process.env.APP_ROOT, 'server', 'database', 'db.dev.sqlite')
      : path.resolve(process.env.RESOURCES_PATH, 'database', 'db.sqlite');

  return new Database(filename);
};
