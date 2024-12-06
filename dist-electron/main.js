var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { BrowserWindow, app, ipcMain } from "electron";
import { execFile, exec } from "child_process";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
class SingletonIndicator {
  constructor() {
    __publicField(this, "__value__", false);
  }
  get value() {
    const ref = this.__value__;
    this.__value__ = true;
    return ref;
  }
}
const _ConfigProvider = class _ConfigProvider {
  /**
   * Initialize the ConfigProvider.
   */
  static init() {
    if (this.__indicator__.value) {
      return;
    }
    _ConfigProvider.props = {};
    _ConfigProvider.props.isDev = process.env.NODE_ENV === "development";
    _ConfigProvider.props.appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    _ConfigProvider.props.mainDist = path.join(_ConfigProvider.props.appRoot, "dist-electron");
    _ConfigProvider.props.viteDevServerUrl = process.env["VITE_DEV_SERVER_URL"];
    _ConfigProvider.props.rendererDist = path.join(_ConfigProvider.props.appRoot, "dist");
    _ConfigProvider.props.vitePublic = _ConfigProvider.props.viteDevServerUrl ? path.join(_ConfigProvider.props.appRoot, "public") : _ConfigProvider.props.rendererDist;
    _ConfigProvider.props.databaseName = "mygpx_pgsdb";
    _ConfigProvider.props.resourcesPath = _ConfigProvider.props.isDev ? path.resolve(_ConfigProvider.props.appRoot, "resources") : path.join(process.resourcesPath);
    _ConfigProvider.props.postgresPath = path.join(_ConfigProvider.props.resourcesPath, "postgres");
    _ConfigProvider.props.dataDir = _ConfigProvider.props.isDev ? path.join(_ConfigProvider.props.appRoot, "pgsdatabase") : path.join(process.resourcesPath, "pgsdatabase");
    _ConfigProvider.props.initdbPath = path.join(_ConfigProvider.props.postgresPath, "bin", "initdb");
    _ConfigProvider.props.pgVersionPath = path.join(_ConfigProvider.props.dataDir, "PG_VERSION");
    _ConfigProvider.props.postgresBin = path.join(_ConfigProvider.props.postgresPath, "bin", "postgres");
    _ConfigProvider.props.psqlPath = path.join(_ConfigProvider.props.postgresPath, "bin", "psql");
    _ConfigProvider.props.socketDir = path.join(_ConfigProvider.props.postgresPath, "tmp");
    _ConfigProvider.props.socketFile = path.join(_ConfigProvider.props.socketDir, ".s.PGSQL.5432");
    _ConfigProvider.props.pgCtlPath = path.join(_ConfigProvider.props.postgresPath, "bin", "pg_ctl");
  }
};
__publicField(_ConfigProvider, "__indicator__", new SingletonIndicator());
__publicField(_ConfigProvider, "props");
let ConfigProvider = _ConfigProvider;
ConfigProvider.init();
const $props = { ...ConfigProvider.props };
const _WindowProvider = class _WindowProvider {
  /**
   * Create a new electron window.
   */
  static async createWindow() {
    var _a;
    _WindowProvider.win = new BrowserWindow({
      icon: path.join($props.vitePublic, "electron-vite.svg"),
      webPreferences: {
        preload: path.join($props.mainDist, "preload.mjs")
      },
      minWidth: 1080,
      width: 1080,
      minHeight: 720,
      height: 720
    });
    (_a = _WindowProvider.win) == null ? void 0 : _a.webContents.openDevTools();
    _WindowProvider.loadRenderer();
  }
  /**
   * Load the renderer process.
   */
  static async loadRenderer() {
    var _a, _b;
    if ($props.viteDevServerUrl) {
      await ((_a = _WindowProvider.win) == null ? void 0 : _a.loadURL($props.viteDevServerUrl));
    } else {
      await ((_b = _WindowProvider.win) == null ? void 0 : _b.loadFile(path.join($props.rendererDist, "index.html")));
    }
  }
};
/**
 * The electron window.
 */
__publicField(_WindowProvider, "win");
let WindowProvider = _WindowProvider;
class WindowContentService {
  /**
   * Send a message to all windows.
   */
  static sendToAllWindows(channel, ...args) {
    var _a;
    (_a = WindowProvider.win) == null ? void 0 : _a.webContents.send(channel, ...args);
  }
}
class LogService {
  /**
   * Log a message.
   */
  static log(...args) {
    console.log(...args);
    WindowContentService.sendToAllWindows("log-channel", ...args);
  }
  /**
   * Log a warning.
   */
  static warn(...args) {
    console.warn(...args);
    WindowContentService.sendToAllWindows("warn-channel", ...args);
  }
  /**
   * Log an error.
   */
  static error(...args) {
    console.error(...args);
    WindowContentService.sendToAllWindows("error-channel", ...args);
  }
}
const createModelsQuery = `
  CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL
  );
`;
const createChatsQuery = `
  CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    model_id INTEGER REFERENCES models(id) ON DELETE SET NULL
  );
`;
const createMessagesQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL
  );
`;
const createRoleIfNotExistsQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'default_role') THEN
    CREATE ROLE default_role WITH LOGIN SUPERUSER;
  END IF;
END
$$;
`;
class PostgresService {
  /** Initialize the Postgres database cluster. */
  static initializeDatabaseCluster() {
    LogService.log("Initializing PostgreSQL cluster...");
    if (fs.existsSync($props.pgVersionPath)) {
      LogService.log("PostgreSQL cluster is already initialized.");
      return Promise.resolve();
    }
    if (!fs.existsSync($props.dataDir)) {
      fs.mkdirSync($props.dataDir, { recursive: true });
    }
    return new Promise((resolve, reject) => {
      execFile(
        $props.initdbPath,
        [
          "-D",
          $props.dataDir
        ],
        {
          env: {
            ...process.env,
            LANG: "en_US.UTF-8",
            LC_ALL: "en_US.UTF-8"
          }
        },
        (error, stdout, stderr) => error ? reject(`Error initializing cluster: ${error} ${stderr}`) : resolve(stdout)
      );
    });
  }
  /** Stop the Postgres server if it is running. */
  static stopPostgresIfRunning() {
    LogService.log("stop Postgres if running...");
    return new Promise((resolve, reject) => {
      if (!fs.existsSync($props.socketFile)) {
        return resolve(void 0);
      }
      LogService.log("PostgreSQL server is running, stopping it...");
      execFile(
        $props.pgCtlPath,
        [
          "stop",
          "-D",
          $props.dataDir,
          "-m",
          "fast"
        ],
        (error, stdout, stderr) => error ? reject(new Error(`Error stopping PostgreSQL server: ${stderr}`)) : resolve(void 0)
      );
    });
  }
  static freePortIfInUse(port) {
    return new Promise((resolve, reject) => {
      exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
        if (error) {
          if (stderr.trim() === "") {
            return resolve(new Error(`No processes on port ${port}.`));
          }
          return reject(new Error(`Error freeing port ${port}: ${stderr}`));
        }
        LogService.log(`Freed processes on port ${port}.`);
        resolve(void 0);
      });
    });
  }
  /** Start the Postgres server. */
  static startPostgresServer() {
    LogService.log("Starting PostgreSQL server...");
    if (!fs.existsSync($props.socketDir)) {
      fs.mkdirSync($props.socketDir, { recursive: true });
    }
    execFile($props.postgresBin, [
      "-D",
      $props.dataDir,
      "-k",
      $props.socketDir,
      "-p",
      "5432",
      "-c",
      `logging_collector=off`,
      "-c",
      `log_destination=stderr`
    ], (error, stdout, stderr) => {
      if (error) {
        throw new Error(`Error starting PostgreSQL server: ${stderr}`);
      }
    });
  }
  /** Wait for the Postgres server to start. */
  static waitForPostgresServer() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        LogService.log("Checking postgres server status...");
        execFile($props.pgCtlPath, ["status", "-D", $props.dataDir], (error, stdout) => {
          if (!error && stdout.includes("server is running")) {
            clearInterval(interval);
            resolve(stdout);
          }
        });
      }, 500);
      setTimeout(() => {
        clearInterval(interval);
        reject(new Error("PostgreSQL server did not start in time."));
      }, 15e3);
    });
  }
  /** Create a role if it does not exist. */
  static createRoleIfNotExists() {
    LogService.log("Creating role...");
    return new Promise((resolve, reject) => {
      execFile(
        $props.psqlPath,
        [
          "-h",
          $props.socketDir,
          "-p",
          "5432",
          "-d",
          "postgres",
          "-c",
          createRoleIfNotExistsQuery
        ],
        (error, stdout, stderr) => error ? reject(new Error(`Error creating role: ${stderr}`)) : resolve(stdout)
      );
    });
  }
  /** Create a database if it does not exist. */
  static checkIfDatabaseExist() {
    LogService.log("Checking if database exists...");
    return new Promise((resolve, reject) => {
      execFile(
        $props.psqlPath,
        [
          "-h",
          $props.socketDir,
          "-p",
          "5432",
          "-d",
          "postgres",
          "-c",
          `SELECT datname FROM pg_database WHERE datname = '${$props.databaseName}';`
        ],
        (error, stdout, stderr) => error ? reject(new Error(`Error checking database existence: ${stderr}`)) : resolve(stdout.includes($props.databaseName))
      );
    });
  }
  /** Create a database if it does not exist. */
  static createDatabase() {
    LogService.log("Creating database...");
    return new Promise((resolve, reject) => {
      execFile(
        $props.psqlPath,
        [
          "-h",
          $props.socketDir,
          "-p",
          "5432",
          "-d",
          "postgres",
          "-c",
          `CREATE DATABASE ${$props.databaseName} OWNER default_role;`
        ],
        (error, stdout, stderr) => error ? reject(new Error(`Error creating database: ${stderr}`)) : resolve(stdout)
      );
    });
  }
  /** Create tables. */
  static createTables() {
    LogService.log("Creating tables...");
    const createTablesQuery = `
      DROP TABLE IF EXISTS models CASCADE;
      DROP TABLE IF EXISTS chats CASCADE;
      DROP TABLE IF EXISTS messages CASCADE;

      ${createModelsQuery}
      ${createChatsQuery}
      ${createMessagesQuery}

      INSERT INTO models (name, url)
      VALUES ('Test Model', 'https://www.google.com/');
    `;
    return new Promise((resolve, reject) => {
      execFile(
        $props.psqlPath,
        [
          "-h",
          $props.socketDir,
          "-p",
          "5432",
          "-d",
          $props.databaseName,
          "-c",
          createTablesQuery
        ],
        (error, stdout, stderr) => error ? reject(new Error(`Error creating tables: ${stderr}`)) : resolve(stdout)
      );
    });
  }
  /** Quick setup the Postgres database. */
  static async launch() {
    try {
      await PostgresService.stopPostgresIfRunning();
      await PostgresService.initializeDatabaseCluster();
      await PostgresService.freePortIfInUse("5432");
      PostgresService.startPostgresServer();
      await PostgresService.waitForPostgresServer();
      await PostgresService.createRoleIfNotExists();
      const isDbExists = await PostgresService.checkIfDatabaseExist();
      if (!isDbExists) {
        await PostgresService.createDatabase();
      }
      await PostgresService.createTables();
      WindowContentService.sendToAllWindows("set-loading-status", false);
      LogService.log("PostgreSQL server is running on port 5432");
    } catch (error) {
      LogService.error("Error during setup:", error);
    }
  }
}
let isQuitting = false;
const onBeforeQuit = async (event) => {
  if (isQuitting) return;
  console.log("Stopping PostgreSQL server...");
  isQuitting = true;
  event.preventDefault();
  try {
    await PostgresService.stopPostgresIfRunning();
  } catch (error) {
    LogService.error("Error stopping PostgreSQL server:", error);
  } finally {
    app.quit();
  }
};
const onWindowAllClosed = () => {
  if (process.platform !== "darwin") {
    app.quit();
    WindowProvider.win = null;
  }
};
const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow();
  }
};
const onWhenReady = async () => {
  await WindowProvider.createWindow();
  PostgresService.launch();
};
class PostgresQueriesService {
  /** Execute a SQL query using psql. */
  static executeQuery(query) {
    return new Promise((resolve, reject) => {
      execFile(
        $props.psqlPath,
        [
          "-h",
          $props.socketDir,
          "-p",
          "5432",
          "-d",
          $props.databaseName,
          "-c",
          query
        ],
        (error, stdout, stderr) => error ? reject(`Error executing query: ${query}: ${stderr}`) : resolve(stdout)
      );
    });
  }
  /** Parse the raw query result into an array of objects. */
  static parseQueryResult(rawResult) {
    const lines = rawResult.split("\n");
    const headerLine = lines[0].trim();
    const rows = lines.slice(2, -2);
    const headers = headerLine.split("|").map((header) => header.trim());
    const result = rows.filter((row) => row.trim() !== "" && !row.includes("row")).map((row) => {
      const columns = row.split("|").map((col) => col.trim());
      return headers.reduce((acc, header, index) => {
        acc[header] = columns[index];
        return acc;
      }, {});
    });
    return result;
  }
  /** Get all records from a table. */
  static async getAllRecords(tableName) {
    const query = `SELECT * FROM ${tableName};`;
    const result = await PostgresQueriesService.executeQuery(query);
    return PostgresQueriesService.parseQueryResult(result);
  }
  /** Add a new record to a table. */
  static async addRecord(tableName, fields) {
    console.warn("addRecord", tableName, fields);
    const columns = Object.keys(fields).join(", ");
    const values = Object.values(fields).map((value) => `'${value}'`).join(", ");
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    await PostgresQueriesService.executeQuery(query);
  }
  /** Update a record by ID. */
  static async updateRecordById(tableName, id, fields) {
    const updates = Object.entries(fields).map(([key, value]) => `${key} = '${value}'`).join(", ");
    const query = `UPDATE ${tableName} SET ${updates} WHERE id = ${id};`;
    await PostgresQueriesService.executeQuery(query);
  }
  /** Delete a record by ID. */
  static async deleteRecordById(tableName, id) {
    const query = `DELETE FROM ${tableName} WHERE id = ${id};`;
    await PostgresQueriesService.executeQuery(query);
  }
}
class ChatsController {
  static async getChats() {
    return await PostgresQueriesService.getAllRecords("chats");
  }
  static async createChat(_, { title, model_id }) {
    await PostgresQueriesService.addRecord("chats", { title, model_id });
  }
  static async updateChat(_, id, fields) {
    await PostgresQueriesService.updateRecordById("chats", id, fields);
  }
  static async deleteChat(_, id) {
    await PostgresQueriesService.deleteRecordById("chats", id);
  }
}
class ModelsController {
  static async getModels() {
    return await PostgresQueriesService.getAllRecords("models");
  }
  static async createModel(_, name, url) {
    await PostgresQueriesService.addRecord("models", { name, url });
  }
  static async updateModel(_, id, fields) {
    await PostgresQueriesService.updateRecordById("models", id, fields);
  }
  static async deleteModel(_, id) {
    await PostgresQueriesService.deleteRecordById("models", id);
  }
}
class MessagesController {
  static async getMessages() {
    return await PostgresQueriesService.getAllRecords("messages");
  }
  static async createMessage(_, chatId, messageText) {
    await PostgresQueriesService.addRecord("messages", { chat_id: chatId, message_text: messageText });
  }
  static async updateMessage(_, id, fields) {
    await PostgresQueriesService.updateRecordById("messages", id, fields);
  }
  static async deleteMessage(_, id) {
    await PostgresQueriesService.deleteRecordById("messages", id);
  }
}
const startRouter = () => {
  console.log("Router started");
  ipcMain.handle("chats:get", ChatsController.getChats);
  ipcMain.handle("chats:update", ChatsController.updateChat);
  ipcMain.handle("chats:create", ChatsController.createChat);
  ipcMain.handle("chats:delete", ChatsController.deleteChat);
  ipcMain.handle("models:get", ModelsController.getModels);
  ipcMain.handle("models:delete", ModelsController.deleteModel);
  ipcMain.handle("messages:get", MessagesController.getMessages);
};
class AppService {
  static launch() {
    app.on("before-quit", onBeforeQuit);
    app.on("window-all-closed", onWindowAllClosed);
    app.on("activate", onActivate);
    app.whenReady().then(onWhenReady);
    startRouter();
  }
}
AppService.launch();
