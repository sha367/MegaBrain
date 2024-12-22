/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    // === MAIN ===
    /** The root path of the application */
    APP_ROOT: string;
    /** The Vite development server URL */
    VITE_DEV_SERVER_URL: string;
    /** The main process distribution path */
    MAIN_DIST: string;
    /** The renderer process distribution path */
    RENDERER_DIST: string;
    /** The Vite public path */
    VITE_PUBLIC: string;

    // === RELEASE ===
    /** The path to the resources directory */
    RESOURCES_PATH: string;

    // === LLM ===
    /** The path to the LLM executable */
    LLM_EXEC_PATH: string;
    /** The local address of the LLM server */
    LLM_LOCAL_ADDRESS: string;

    // === POSTGRES ===
    /** The name of the database */
    DATABASE_NAME: string;
    /** The path to the Postgres directory */
    POSTGRES_PATH: string;
    /** The path to the database directory */
    DATABASE_DIR: string;
    /** The path to the initdb executable */
    INITDB_PATH: string;
    /** The path to the PG_VERSION file */
    PG_VERSION_PATH: string;
    /** The path to the Postgres executable */
    POSTGRES_BIN: string;
    /** The path to the psql executable */
    PSQL_PATH: string;
    /** The path to the socket directory */
    SOCKET_DIR: string;
    /** The path to the socket file */
    SOCKET_FILE: string;
    /** The path to the pg_ctl executable */
    PG_CTL_PATH: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
}
