import { SingletonTouch } from "../lib/classes/SingletonTouch";
import path from "node:path"
import { fileURLToPath } from "node:url";

export class ConfigProvider {
  private static touch: SingletonTouch = new SingletonTouch();

  /** An empty method to avoid unused imports and let you nothing to do */
  public static touchProvider() {}

  public static init() {
    if (this.touch.value) {
      return;
    }

    // MAIN
    process.env.APP_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    process.env.VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || '';
    process.env.MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
    process.env.RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
    process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
      ? path.join(process.env.APP_ROOT, 'public')
      : process.env.RENDERER_DIST;

    // RELEASE
    process.env.RESOURCES_PATH = process.env.NODE_ENV === 'development'
      ? path.resolve(process.env.APP_ROOT, 'resources')
      : path.join(process.resourcesPath);

    // LLM
    process.env.LLM_EXEC_PATH = path.join(process.env.RESOURCES_PATH, 'ollama', 'llm');
    process.env.LLM_LOCAL_ADDRESS = 'http://127.0.0.1:11434';

    // POSTGRES
    process.env.DATABASE_NAME = 'mygpx_pgsdb';
    process.env.POSTGRES_PATH = path.join(process.env.RESOURCES_PATH, 'postgres');
    process.env.DATABASE_DIR = process.env.NODE_ENV === 'development'
      ? path.join(process.env.APP_ROOT, 'database')
      : path.join(process.resourcesPath, 'database');
    process.env.INITDB_PATH = path.join(process.env.POSTGRES_PATH, 'bin', 'initdb');
    process.env.PG_VERSION_PATH = path.join(process.env.DATABASE_DIR, 'PG_VERSION');
    process.env.POSTGRES_BIN = path.join(process.env.POSTGRES_PATH, 'bin', 'postgres');
    process.env.PSQL_PATH = path.join(process.env.POSTGRES_PATH, 'bin', 'psql');
    process.env.SOCKET_DIR = path.join(process.env.POSTGRES_PATH, 'tmp');
    process.env.SOCKET_FILE = path.join(process.env.SOCKET_DIR, '.s.PGSQL.5432');
    process.env.PG_CTL_PATH = path.join(process.env.POSTGRES_PATH, 'bin', 'pg_ctl');
  }
}

ConfigProvider.init();
