import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

import path from 'node:path';

export const openDb = () => {
  const filename =
    process.env.NODE_ENV === 'development'
      ? path.resolve("/Users/manjotsingh/Projects/MegaLLM/", 'cloud', 'database', 'db.dev.sqlite')
      : path.resolve("/Users/manjotsingh/Projects/MegaLLM/", 'cloud', 'database', 'db.dev.sqlite')
      ;
console.log("filename", filename);
  return new Database(filename);
};
