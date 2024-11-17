var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { BrowserWindow, ipcMain, app } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import require$$0 from "fs";
import require$$0$1 from "path";
import require$$2$1 from "os";
import require$$0$2 from "crypto";
import http from "node:http";
import fs$1 from "node:fs";
import { spawn, exec } from "node:child_process";
import { execSync } from "child_process";
import require$$0$4 from "events";
import require$$0$3 from "dns";
import require$$0$5 from "net";
import require$$1 from "tls";
import require$$0$6 from "stream";
import require$$1$1 from "string_decoder";
import require$$1$2 from "util";
import require$$1$3 from "assert";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var main$2 = { exports: {} };
const name$1 = "dotenv";
const version$2 = "16.4.5";
const description$1 = "Loads environment variables from .env file";
const main$1 = "lib/main.js";
const types$2 = "lib/main.d.ts";
const exports = {
  ".": {
    types: "./lib/main.d.ts",
    require: "./lib/main.js",
    "default": "./lib/main.js"
  },
  "./config": "./config.js",
  "./config.js": "./config.js",
  "./lib/env-options": "./lib/env-options.js",
  "./lib/env-options.js": "./lib/env-options.js",
  "./lib/cli-options": "./lib/cli-options.js",
  "./lib/cli-options.js": "./lib/cli-options.js",
  "./package.json": "./package.json"
};
const scripts$1 = {
  "dts-check": "tsc --project tests/types/tsconfig.json",
  lint: "standard",
  "lint-readme": "standard-markdown",
  pretest: "npm run lint && npm run dts-check",
  test: "tap tests/*.js --100 -Rspec",
  "test:coverage": "tap --coverage-report=lcov",
  prerelease: "npm test",
  release: "standard-version"
};
const repository$1 = {
  type: "git",
  url: "git://github.com/motdotla/dotenv.git"
};
const funding = "https://dotenvx.com";
const keywords$1 = [
  "dotenv",
  "env",
  ".env",
  "environment",
  "variables",
  "config",
  "settings"
];
const readmeFilename = "README.md";
const license$1 = "BSD-2-Clause";
const devDependencies$1 = {
  "@definitelytyped/dtslint": "^0.0.133",
  "@types/node": "^18.11.3",
  decache: "^4.6.1",
  sinon: "^14.0.1",
  standard: "^17.0.0",
  "standard-markdown": "^7.1.0",
  "standard-version": "^9.5.0",
  tap: "^16.3.0",
  tar: "^6.1.11",
  typescript: "^4.8.4"
};
const engines = {
  node: ">=12"
};
const browser = {
  fs: false
};
const require$$4 = {
  name: name$1,
  version: version$2,
  description: description$1,
  main: main$1,
  types: types$2,
  exports,
  scripts: scripts$1,
  repository: repository$1,
  funding,
  keywords: keywords$1,
  readmeFilename,
  license: license$1,
  devDependencies: devDependencies$1,
  engines,
  browser
};
const fs = require$$0;
const path = require$$0$1;
const os = require$$2$1;
const crypto$2 = require$$0$2;
const packageJson = require$$4;
const version$1 = packageJson.version;
const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function parse$4(src) {
  const obj = {};
  let lines = src.toString();
  lines = lines.replace(/\r\n?/mg, "\n");
  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];
    let value = match[2] || "";
    value = value.trim();
    const maybeQuote = value[0];
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, "\n");
      value = value.replace(/\\r/g, "\r");
    }
    obj[key] = value;
  }
  return obj;
}
function _parseVault(options) {
  const vaultPath = _vaultPath(options);
  const result2 = DotenvModule.configDotenv({ path: vaultPath });
  if (!result2.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
    err.code = "MISSING_DATA";
    throw err;
  }
  const keys = _dotenvKey(options).split(",");
  const length = keys.length;
  let decrypted;
  for (let i = 0; i < length; i++) {
    try {
      const key = keys[i].trim();
      const attrs = _instructions(result2, key);
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
      break;
    } catch (error) {
      if (i + 1 >= length) {
        throw error;
      }
    }
  }
  return DotenvModule.parse(decrypted);
}
function _log(message) {
  console.log(`[dotenv@${version$1}][INFO] ${message}`);
}
function _warn(message) {
  console.log(`[dotenv@${version$1}][WARN] ${message}`);
}
function _debug(message) {
  console.log(`[dotenv@${version$1}][DEBUG] ${message}`);
}
function _dotenvKey(options) {
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY;
  }
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY;
  }
  return "";
}
function _instructions(result2, dotenvKey) {
  let uri;
  try {
    uri = new URL(dotenvKey);
  } catch (error) {
    if (error.code === "ERR_INVALID_URL") {
      const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
      err.code = "INVALID_DOTENV_KEY";
      throw err;
    }
    throw error;
  }
  const key = uri.password;
  if (!key) {
    const err = new Error("INVALID_DOTENV_KEY: Missing key part");
    err.code = "INVALID_DOTENV_KEY";
    throw err;
  }
  const environment = uri.searchParams.get("environment");
  if (!environment) {
    const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
    err.code = "INVALID_DOTENV_KEY";
    throw err;
  }
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
  const ciphertext = result2.parsed[environmentKey];
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
    err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
    throw err;
  }
  return { ciphertext, key };
}
function _vaultPath(options) {
  let possibleVaultPath = null;
  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
  }
  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath;
  }
  return null;
}
function _resolveHome(envPath) {
  return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
}
function _configVault(options) {
  _log("Loading env from encrypted .env.vault");
  const parsed = DotenvModule._parseVault(options);
  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }
  DotenvModule.populate(processEnv, parsed, options);
  return { parsed };
}
function configDotenv(options) {
  const dotenvPath = path.resolve(process.cwd(), ".env");
  let encoding = "utf8";
  const debug = Boolean(options && options.debug);
  if (options && options.encoding) {
    encoding = options.encoding;
  } else {
    if (debug) {
      _debug("No encoding is specified. UTF-8 is used by default");
    }
  }
  let optionPaths = [dotenvPath];
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)];
    } else {
      optionPaths = [];
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath));
      }
    }
  }
  let lastError;
  const parsedAll = {};
  for (const path2 of optionPaths) {
    try {
      const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
      DotenvModule.populate(parsedAll, parsed, options);
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path2} ${e.message}`);
      }
      lastError = e;
    }
  }
  let processEnv = process.env;
  if (options && options.processEnv != null) {
    processEnv = options.processEnv;
  }
  DotenvModule.populate(processEnv, parsedAll, options);
  if (lastError) {
    return { parsed: parsedAll, error: lastError };
  } else {
    return { parsed: parsedAll };
  }
}
function config(options) {
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options);
  }
  const vaultPath = _vaultPath(options);
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
    return DotenvModule.configDotenv(options);
  }
  return DotenvModule._configVault(options);
}
function decrypt(encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), "hex");
  let ciphertext = Buffer.from(encrypted, "base64");
  const nonce = ciphertext.subarray(0, 12);
  const authTag = ciphertext.subarray(-16);
  ciphertext = ciphertext.subarray(12, -16);
  try {
    const aesgcm = crypto$2.createDecipheriv("aes-256-gcm", key, nonce);
    aesgcm.setAuthTag(authTag);
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
  } catch (error) {
    const isRange = error instanceof RangeError;
    const invalidKeyLength = error.message === "Invalid key length";
    const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
    if (isRange || invalidKeyLength) {
      const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
      err.code = "INVALID_DOTENV_KEY";
      throw err;
    } else if (decryptionFailed) {
      const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
      err.code = "DECRYPTION_FAILED";
      throw err;
    } else {
      throw error;
    }
  }
}
function populate(processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug);
  const override = Boolean(options && options.override);
  if (typeof parsed !== "object") {
    const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
    err.code = "OBJECT_REQUIRED";
    throw err;
  }
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key];
      }
      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`);
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`);
        }
      }
    } else {
      processEnv[key] = parsed[key];
    }
  }
}
const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse: parse$4,
  populate
};
main$2.exports.configDotenv = DotenvModule.configDotenv;
main$2.exports._configVault = DotenvModule._configVault;
main$2.exports._parseVault = DotenvModule._parseVault;
main$2.exports.config = DotenvModule.config;
main$2.exports.decrypt = DotenvModule.decrypt;
main$2.exports.parse = DotenvModule.parse;
main$2.exports.populate = DotenvModule.populate;
main$2.exports = DotenvModule;
var mainExports = main$2.exports;
const dotenv = /* @__PURE__ */ getDefaultExportFromCjs(mainExports);
const getConfigs = (dirname) => {
  const RUN_LLM = process.env.RUN_LLM === "1";
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  const OLLAMA_MODELS = `${USER_HOME}/ollama_models`;
  const APP_ROOT = path$1.join(dirname, "..");
  const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
  const MAIN_DIST = path$1.join(APP_ROOT, "dist-electron");
  const RENDERER_DIST = path$1.join(APP_ROOT, "dist");
  const RESOURCES_PATH = VITE_DEV_SERVER_URL ? path$1.join(dirname, "../resources") : process.resourcesPath;
  const LLM_PATH = path$1.join(RESOURCES_PATH, "ollama/llm");
  const MODEL_FILE_PATH = path$1.join(OLLAMA_MODELS, "Modelfile");
  const VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(APP_ROOT, "public") : RENDERER_DIST;
  process.env.VITE_PUBLIC = VITE_PUBLIC;
  process.env.OLLAMA_MODELS = OLLAMA_MODELS;
  return {
    RUN_LLM,
    USER_HOME,
    OLLAMA_MODELS,
    APP_ROOT,
    VITE_DEV_SERVER_URL,
    MAIN_DIST,
    RENDERER_DIST,
    RESOURCES_PATH,
    LLM_PATH,
    VITE_PUBLIC,
    MODEL_FILE_PATH,
    POSTGRES_PATH: path$1.join(RESOURCES_PATH, "postgresql"),
    DATA_PATH: path$1.join(RESOURCES_PATH, "data")
  };
};
const _ConfigProvider = class _ConfigProvider {
  static get configs() {
    return _ConfigProvider._configs;
  }
  /** ! init before usage configs ! */
  static initConfigs(dirname) {
    _ConfigProvider._configs = getConfigs(dirname);
  }
};
__publicField(_ConfigProvider, "_configs");
let ConfigProvider = _ConfigProvider;
const _WindowProvider = class _WindowProvider {
  static init(dirname) {
    _WindowProvider.dirname = dirname;
  }
  static getWin() {
    return _WindowProvider._win;
  }
  static deleteWindow() {
    _WindowProvider._win = null;
  }
  static setOnBeforeMount(callback) {
    _WindowProvider.onBeforeMount = callback;
  }
  static createWindow() {
    var _a;
    console.log("Creating window");
    _WindowProvider._win = new BrowserWindow({
      icon: path$1.join(ConfigProvider.configs.VITE_PUBLIC, "images/ollama-avatar.png"),
      width: 1080,
      minWidth: 1080,
      height: 800,
      minHeight: 800,
      webPreferences: {
        preload: path$1.join(_WindowProvider.dirname, "preload.mjs")
      }
    });
    _WindowProvider._win.webContents.openDevTools();
    (_a = _WindowProvider.onBeforeMount) == null ? void 0 : _a.call(_WindowProvider);
    if (ConfigProvider.configs.VITE_DEV_SERVER_URL) {
      _WindowProvider._win.loadURL(ConfigProvider.configs.VITE_DEV_SERVER_URL);
    } else {
      _WindowProvider._win.loadFile(path$1.join(ConfigProvider.configs.RENDERER_DIST, "index.html"));
    }
    _WindowProvider._win.on("closed", () => {
      _WindowProvider._win = null;
    });
  }
};
__publicField(_WindowProvider, "dirname", "");
__publicField(_WindowProvider, "_win", null);
__publicField(_WindowProvider, "onBeforeMount");
let WindowProvider = _WindowProvider;
const _LOG = class _LOG {
  static init(getWin) {
    _LOG.getWin = getWin;
  }
  static info(message) {
    var _a, _b;
    console.log(message);
    (_b = (_a = _LOG.getWin) == null ? void 0 : _a.call(_LOG)) == null ? void 0 : _b.webContents.send("main-process-message", message);
  }
  static error(message) {
    var _a, _b;
    console.error(message);
    (_b = (_a = _LOG.getWin) == null ? void 0 : _a.call(_LOG)) == null ? void 0 : _b.webContents.send("main-process-error", message);
  }
  static warn(message) {
    var _a, _b;
    console.warn(message);
    (_b = (_a = _LOG.getWin) == null ? void 0 : _a.call(_LOG)) == null ? void 0 : _b.webContents.send("main-process-warn", message);
  }
};
__publicField(_LOG, "getWin");
let LOG = _LOG;
const getMockChats = async () => [
  {
    id: "1",
    modelId: "1",
    lastMessage: "Chat 1 last message"
  },
  {
    id: "2",
    modelId: "2",
    lastMessage: "Chat 1 last message"
  }
];
const getMockMessages = async () => [
  {
    id: "1",
    chatId: "1",
    message: "Message 1",
    createdAt: /* @__PURE__ */ new Date()
  },
  {
    id: "2",
    chatId: "1",
    message: "Message 2",
    createdAt: /* @__PURE__ */ new Date()
  },
  {
    id: "3",
    chatId: "2",
    message: "Message 3",
    createdAt: /* @__PURE__ */ new Date()
  },
  {
    id: "4",
    chatId: "2",
    message: "Message 3",
    createdAt: /* @__PURE__ */ new Date()
  }
];
const getMockModels = async () => [
  {
    id: "1",
    name: "Model 1",
    description: "Model 1 description",
    avatar: path$1.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com"
  },
  {
    id: "2",
    name: "Model 2",
    description: "Model 2 description",
    avatar: path$1.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com"
  },
  {
    id: "3",
    name: "Model 3",
    description: "Model 3 description",
    avatar: path$1.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com"
  }
];
class ModelController {
  static async getModels(_, params) {
    const models = (await getMockModels()).filter((params == null ? void 0 : params.ids) ? (model) => {
      var _a;
      return (_a = params == null ? void 0 : params.ids) == null ? void 0 : _a.includes(model.id);
    } : () => Boolean);
    return {
      data: [
        ...models
      ]
    };
  }
  static async getModel(_, params) {
    const model = (await getMockModels()).find((model2) => model2.id === params.id);
    return {
      data: {
        ...model
      }
    };
  }
  static async downloadModel(_, params) {
    return {
      data: {
        id: params.id
      }
    };
  }
  static async deleteModel(_, params) {
    return {
      data: {
        id: params.id
      }
    };
  }
}
class ChatController {
  static async getChats(_) {
    const chats = await getMockChats();
    const modelIds = chats.map((chat) => chat.modelId);
    const models = await ModelController.getModels(_, { ids: modelIds });
    const chatsWithModels = chats.map((chat) => {
      const model = models.data.find((model2) => model2.id === chat.modelId);
      return {
        ...chat,
        model
      };
    });
    return {
      data: [
        ...chatsWithModels
      ]
    };
  }
  static async getChat(_, params) {
    const modelId = "llama1";
    const model = await ModelController.getModel(_, { id: modelId });
    const chat = (await getMockChats()).find((chat2) => chat2.id === params.id);
    const chatWithModel = {
      ...chat,
      model
    };
    return {
      data: {
        ...chatWithModel
      }
    };
  }
  static async updateChat(_, params) {
    const chat = await ChatController.getChat(_, { id: params.id });
    const modelId = chat.data.modelId;
    if (!modelId) {
      return {
        error: {
          message: "Model not found"
        }
      };
    }
    const model = await ModelController.getModel(_, { id: modelId });
    const chatWithModel = {
      ...chat.data,
      model
    };
    return {
      data: {
        ...chatWithModel
      }
    };
  }
  static async createNewChat(_, params) {
    const { modelId, message } = params;
    const model = await ModelController.getModel(_, { id: modelId });
    const newChat = {
      id: "somenewid",
      modelId,
      lastMessage: message
    };
    const newChatWithModel = {
      ...newChat,
      model
    };
    return {
      data: {
        ...newChatWithModel
      }
    };
  }
  static async deleteChat(_, params) {
    const chat = await ChatController.getChat(_, { id: params.id });
    const modelId = chat.data.modelId;
    if (!modelId) {
      return {
        error: {
          message: "Chat not found"
        }
      };
    }
    const model = await ModelController.getModel(_, { id: modelId });
    const newChatWithModel = {
      ...chat,
      model
    };
    return {
      data: {
        ...newChatWithModel
      }
    };
  }
}
class MessagesController {
  static async getChatMessages(_, params) {
    const messages2 = (await getMockMessages()).filter((message) => message.chatId === params.chatId);
    return {
      data: [
        ...messages2
      ]
    };
  }
}
const startRouter = () => {
  ipcMain.handle("chats:get", ChatController.getChats);
  ipcMain.handle("chat:get", ChatController.getChat);
  ipcMain.handle("chat:update", ChatController.updateChat);
  ipcMain.handle("chat:create", ChatController.createNewChat);
  ipcMain.handle("chat:delete", ChatController.deleteChat);
  ipcMain.handle("models:get", ModelController.getModels);
  ipcMain.handle("model:download", ModelController.downloadModel);
  ipcMain.handle("model:delete", ModelController.deleteModel);
  ipcMain.handle("messages:get", MessagesController.getChatMessages);
};
class RouterProvider {
  static init() {
    startRouter();
  }
}
const runCommand = (command, args, detached = false) => {
  return new Promise((resolve, reject) => {
    const process2 = spawn(command, args, { detached, stdio: "inherit" });
    if (!detached) {
      process2.on("close", (code) => {
        if (code === 0) resolve(true);
        else reject(new Error(`Command failed with exit code ${code}`));
      });
    } else {
      resolve(true);
    }
  });
};
const _WinContentProvider = class _WinContentProvider {
  static init(getWin) {
    _WinContentProvider.getWin = getWin;
  }
  static send(channel, message) {
    var _a, _b;
    (_b = (_a = _WinContentProvider.getWin) == null ? void 0 : _a.call(_WinContentProvider)) == null ? void 0 : _b.webContents.send(channel, message);
  }
};
__publicField(_WinContentProvider, "getWin");
let WinContentProvider = _WinContentProvider;
function createModelfileIfNeeded() {
  if (fs$1.existsSync(ConfigProvider.configs.MODEL_FILE_PATH)) return;
  const files = fs$1.readdirSync(ConfigProvider.configs.OLLAMA_MODELS);
  const ggufFile = files.find((file) => file.endsWith(".gguf"));
  if (!ggufFile) {
    WinContentProvider.send("main-process-loading-status", "error");
    throw new Error("No .gguf model file found in ollama_models directory.");
  }
  const modelfileContent = `FROM ${path$1.join(ConfigProvider.configs.OLLAMA_MODELS, ggufFile)}`;
  fs$1.writeFileSync(ConfigProvider.configs.MODEL_FILE_PATH, modelfileContent);
  console.log(`Created Modelfile: ${modelfileContent}`);
}
async function runLLM() {
  try {
    await _runLLM();
  } catch (error) {
    LOG.error(`Failed to run LLM: ${error}`);
  }
}
async function _runLLM() {
  if (!ConfigProvider.configs.RUN_LLM) return;
  LOG.info("Trying to run LLM...");
  WinContentProvider.send("main-process-loading-status", "init_llm");
  await createModelfileIfNeeded();
  WinContentProvider.send("main-process-loading-status", "launch_llm");
  if (!fs$1.existsSync(ConfigProvider.configs.LLM_PATH)) {
    LOG.error(`LLM executable not found at path: ${ConfigProvider.configs.LLM_PATH}`);
    WinContentProvider.send("main-process-loading-status", "error");
    throw new Error(`LLM executable not found at ${ConfigProvider.configs.LLM_PATH}`);
  }
  await runCommand(`${ConfigProvider.configs.LLM_PATH}`, ["serve"], true);
  LOG.info("LLM serve started.");
  await waitForLLMServer();
  WinContentProvider.send("main-process-loading-status", "wait_for_llm");
  const modelExists = await checkModelExists("defaultModel");
  if (!modelExists) {
    LOG.info("Creating model...");
    await runCommand(`${ConfigProvider.configs.LLM_PATH}`, [
      "create",
      "defaultModel",
      "-f",
      ConfigProvider.configs.MODEL_FILE_PATH
    ]);
  } else {
    LOG.warn("Model already exists. Skipping creation.");
  }
  LOG.info("LLM started successfully");
  WinContentProvider.send("main-process-loading-status", "completed");
}
async function stopLLM() {
  exec(`pkill -f ${ConfigProvider.configs.LLM_PATH}`, (error) => {
    if (!ConfigProvider.configs.RUN_LLM) return;
    if (error) console.error("Failed to terminate LLM process:", error);
    else console.log("LLM process terminated.");
  });
}
async function checkModelExists(modelName) {
  return new Promise((resolve, reject) => {
    exec(`${ConfigProvider.configs.LLM_PATH} list`, (error, stdout) => {
      if (error) {
        LOG.error(`Error checking model list: ${error}`);
        reject(error);
      } else {
        const modelExists = stdout.includes(`${modelName}:latest`);
        if (modelExists) {
          LOG.info(`Models: 
${stdout}`);
        }
        resolve(modelExists);
      }
    });
  });
}
function waitForLLMServer() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      http.get("http://127.0.0.1:11434", (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve(true);
        }
      }).on("error", () => {
      });
    }, 1e3);
    setTimeout(() => {
      clearInterval(interval);
      reject(new Error("LLM server failed to start in time."));
    }, 15e3);
  });
}
var lib$2 = { exports: {} };
var defaults$4 = { exports: {} };
var pgTypes$1 = {};
var postgresArray$1 = {};
var hasRequiredPostgresArray$1;
function requirePostgresArray$1() {
  if (hasRequiredPostgresArray$1) return postgresArray$1;
  hasRequiredPostgresArray$1 = 1;
  postgresArray$1.parse = function(source, transform) {
    return new ArrayParser(source, transform).parse();
  };
  class ArrayParser {
    constructor(source, transform) {
      this.source = source;
      this.transform = transform || identity;
      this.position = 0;
      this.entries = [];
      this.recorded = [];
      this.dimension = 0;
    }
    isEof() {
      return this.position >= this.source.length;
    }
    nextCharacter() {
      var character = this.source[this.position++];
      if (character === "\\") {
        return {
          value: this.source[this.position++],
          escaped: true
        };
      }
      return {
        value: character,
        escaped: false
      };
    }
    record(character) {
      this.recorded.push(character);
    }
    newEntry(includeEmpty) {
      var entry;
      if (this.recorded.length > 0 || includeEmpty) {
        entry = this.recorded.join("");
        if (entry === "NULL" && !includeEmpty) {
          entry = null;
        }
        if (entry !== null) entry = this.transform(entry);
        this.entries.push(entry);
        this.recorded = [];
      }
    }
    consumeDimensions() {
      if (this.source[0] === "[") {
        while (!this.isEof()) {
          var char = this.nextCharacter();
          if (char.value === "=") break;
        }
      }
    }
    parse(nested) {
      var character, parser2, quote;
      this.consumeDimensions();
      while (!this.isEof()) {
        character = this.nextCharacter();
        if (character.value === "{" && !quote) {
          this.dimension++;
          if (this.dimension > 1) {
            parser2 = new ArrayParser(this.source.substr(this.position - 1), this.transform);
            this.entries.push(parser2.parse(true));
            this.position += parser2.position - 2;
          }
        } else if (character.value === "}" && !quote) {
          this.dimension--;
          if (!this.dimension) {
            this.newEntry();
            if (nested) return this.entries;
          }
        } else if (character.value === '"' && !character.escaped) {
          if (quote) this.newEntry(true);
          quote = !quote;
        } else if (character.value === "," && !quote) {
          this.newEntry();
        } else {
          this.record(character.value);
        }
      }
      if (this.dimension !== 0) {
        throw new Error("array dimension not balanced");
      }
      return this.entries;
    }
  }
  function identity(value) {
    return value;
  }
  return postgresArray$1;
}
var arrayParser$1;
var hasRequiredArrayParser$1;
function requireArrayParser$1() {
  if (hasRequiredArrayParser$1) return arrayParser$1;
  hasRequiredArrayParser$1 = 1;
  var array = requirePostgresArray$1();
  arrayParser$1 = {
    create: function(source, transform) {
      return {
        parse: function() {
          return array.parse(source, transform);
        }
      };
    }
  };
  return arrayParser$1;
}
var postgresDate;
var hasRequiredPostgresDate;
function requirePostgresDate() {
  if (hasRequiredPostgresDate) return postgresDate;
  hasRequiredPostgresDate = 1;
  var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
  var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
  var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
  var INFINITY = /^-?infinity$/;
  postgresDate = function parseDate(isoDate) {
    if (INFINITY.test(isoDate)) {
      return Number(isoDate.replace("i", "I"));
    }
    var matches = DATE_TIME.exec(isoDate);
    if (!matches) {
      return getDate(isoDate) || null;
    }
    var isBC = !!matches[8];
    var year = parseInt(matches[1], 10);
    if (isBC) {
      year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    var hour = parseInt(matches[4], 10);
    var minute = parseInt(matches[5], 10);
    var second = parseInt(matches[6], 10);
    var ms = matches[7];
    ms = ms ? 1e3 * parseFloat(ms) : 0;
    var date;
    var offset = timeZoneOffset(isoDate);
    if (offset != null) {
      date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
      if (is0To99(year)) {
        date.setUTCFullYear(year);
      }
      if (offset !== 0) {
        date.setTime(date.getTime() - offset);
      }
    } else {
      date = new Date(year, month, day, hour, minute, second, ms);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
    }
    return date;
  };
  function getDate(isoDate) {
    var matches = DATE.exec(isoDate);
    if (!matches) {
      return;
    }
    var year = parseInt(matches[1], 10);
    var isBC = !!matches[4];
    if (isBC) {
      year = bcYearToNegativeYear(year);
    }
    var month = parseInt(matches[2], 10) - 1;
    var day = matches[3];
    var date = new Date(year, month, day);
    if (is0To99(year)) {
      date.setFullYear(year);
    }
    return date;
  }
  function timeZoneOffset(isoDate) {
    if (isoDate.endsWith("+00")) {
      return 0;
    }
    var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
    if (!zone) return;
    var type = zone[1];
    if (type === "Z") {
      return 0;
    }
    var sign = type === "-" ? -1 : 1;
    var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
    return offset * sign * 1e3;
  }
  function bcYearToNegativeYear(year) {
    return -(year - 1);
  }
  function is0To99(num) {
    return num >= 0 && num < 100;
  }
  return postgresDate;
}
var mutable;
var hasRequiredMutable;
function requireMutable() {
  if (hasRequiredMutable) return mutable;
  hasRequiredMutable = 1;
  mutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return mutable;
}
var postgresInterval;
var hasRequiredPostgresInterval;
function requirePostgresInterval() {
  if (hasRequiredPostgresInterval) return postgresInterval;
  hasRequiredPostgresInterval = 1;
  var extend = requireMutable();
  postgresInterval = PostgresInterval;
  function PostgresInterval(raw) {
    if (!(this instanceof PostgresInterval)) {
      return new PostgresInterval(raw);
    }
    extend(this, parse2(raw));
  }
  var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
  PostgresInterval.prototype.toPostgres = function() {
    var filtered = properties.filter(this.hasOwnProperty, this);
    if (this.milliseconds && filtered.indexOf("seconds") < 0) {
      filtered.push("seconds");
    }
    if (filtered.length === 0) return "0";
    return filtered.map(function(property) {
      var value = this[property] || 0;
      if (property === "seconds" && this.milliseconds) {
        value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
      }
      return value + " " + property;
    }, this).join(" ");
  };
  var propertiesISOEquivalent = {
    years: "Y",
    months: "M",
    days: "D",
    hours: "H",
    minutes: "M",
    seconds: "S"
  };
  var dateProperties = ["years", "months", "days"];
  var timeProperties = ["hours", "minutes", "seconds"];
  PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
    var datePart = dateProperties.map(buildProperty, this).join("");
    var timePart = timeProperties.map(buildProperty, this).join("");
    return "P" + datePart + "T" + timePart;
    function buildProperty(property) {
      var value = this[property] || 0;
      if (property === "seconds" && this.milliseconds) {
        value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
      }
      return value + propertiesISOEquivalent[property];
    }
  };
  var NUMBER = "([+-]?\\d+)";
  var YEAR = NUMBER + "\\s+years?";
  var MONTH = NUMBER + "\\s+mons?";
  var DAY = NUMBER + "\\s+days?";
  var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
  var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
    return "(" + regexString + ")?";
  }).join("\\s*"));
  var positions = {
    years: 2,
    months: 4,
    days: 6,
    hours: 9,
    minutes: 10,
    seconds: 11,
    milliseconds: 12
  };
  var negatives = ["hours", "minutes", "seconds", "milliseconds"];
  function parseMilliseconds(fraction) {
    var microseconds = fraction + "000000".slice(fraction.length);
    return parseInt(microseconds, 10) / 1e3;
  }
  function parse2(interval) {
    if (!interval) return {};
    var matches = INTERVAL.exec(interval);
    var isNegative = matches[8] === "-";
    return Object.keys(positions).reduce(function(parsed, property) {
      var position = positions[property];
      var value = matches[position];
      if (!value) return parsed;
      value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
      if (!value) return parsed;
      if (isNegative && ~negatives.indexOf(property)) {
        value *= -1;
      }
      parsed[property] = value;
      return parsed;
    }, {});
  }
  return postgresInterval;
}
var postgresBytea;
var hasRequiredPostgresBytea;
function requirePostgresBytea() {
  if (hasRequiredPostgresBytea) return postgresBytea;
  hasRequiredPostgresBytea = 1;
  postgresBytea = function parseBytea(input) {
    if (/^\\x/.test(input)) {
      return new Buffer(input.substr(2), "hex");
    }
    var output = "";
    var i = 0;
    while (i < input.length) {
      if (input[i] !== "\\") {
        output += input[i];
        ++i;
      } else {
        if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
          output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
          i += 4;
        } else {
          var backslashes = 1;
          while (i + backslashes < input.length && input[i + backslashes] === "\\") {
            backslashes++;
          }
          for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
            output += "\\";
          }
          i += Math.floor(backslashes / 2) * 2;
        }
      }
    }
    return new Buffer(output, "binary");
  };
  return postgresBytea;
}
var textParsers$1;
var hasRequiredTextParsers$1;
function requireTextParsers$1() {
  if (hasRequiredTextParsers$1) return textParsers$1;
  hasRequiredTextParsers$1 = 1;
  var array = requirePostgresArray$1();
  var arrayParser2 = requireArrayParser$1();
  var parseDate = requirePostgresDate();
  var parseInterval = requirePostgresInterval();
  var parseByteA = requirePostgresBytea();
  function allowNull(fn) {
    return function nullAllowed(value) {
      if (value === null) return value;
      return fn(value);
    };
  }
  function parseBool(value) {
    if (value === null) return value;
    return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
  }
  function parseBoolArray(value) {
    if (!value) return null;
    return array.parse(value, parseBool);
  }
  function parseBaseTenInt(string) {
    return parseInt(string, 10);
  }
  function parseIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(parseBaseTenInt));
  }
  function parseBigIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(function(entry) {
      return parseBigInteger(entry).trim();
    }));
  }
  var parsePointArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parsePoint(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseFloatArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parseFloat(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseStringArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value);
    return p.parse();
  };
  var parseDateArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parseDate(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseIntervalArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parseInterval(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseByteAArray = function(value) {
    if (!value) {
      return null;
    }
    return array.parse(value, allowNull(parseByteA));
  };
  var parseInteger = function(value) {
    return parseInt(value, 10);
  };
  var parseBigInteger = function(value) {
    var valStr = String(value);
    if (/^\d+$/.test(valStr)) {
      return valStr;
    }
    return value;
  };
  var parseJsonArray = function(value) {
    if (!value) {
      return null;
    }
    return array.parse(value, allowNull(JSON.parse));
  };
  var parsePoint = function(value) {
    if (value[0] !== "(") {
      return null;
    }
    value = value.substring(1, value.length - 1).split(",");
    return {
      x: parseFloat(value[0]),
      y: parseFloat(value[1])
    };
  };
  var parseCircle = function(value) {
    if (value[0] !== "<" && value[1] !== "(") {
      return null;
    }
    var point = "(";
    var radius = "";
    var pointParsed = false;
    for (var i = 2; i < value.length - 1; i++) {
      if (!pointParsed) {
        point += value[i];
      }
      if (value[i] === ")") {
        pointParsed = true;
        continue;
      } else if (!pointParsed) {
        continue;
      }
      if (value[i] === ",") {
        continue;
      }
      radius += value[i];
    }
    var result2 = parsePoint(point);
    result2.radius = parseFloat(radius);
    return result2;
  };
  var init = function(register) {
    register(20, parseBigInteger);
    register(21, parseInteger);
    register(23, parseInteger);
    register(26, parseInteger);
    register(700, parseFloat);
    register(701, parseFloat);
    register(16, parseBool);
    register(1082, parseDate);
    register(1114, parseDate);
    register(1184, parseDate);
    register(600, parsePoint);
    register(651, parseStringArray);
    register(718, parseCircle);
    register(1e3, parseBoolArray);
    register(1001, parseByteAArray);
    register(1005, parseIntegerArray);
    register(1007, parseIntegerArray);
    register(1028, parseIntegerArray);
    register(1016, parseBigIntegerArray);
    register(1017, parsePointArray);
    register(1021, parseFloatArray);
    register(1022, parseFloatArray);
    register(1231, parseFloatArray);
    register(1014, parseStringArray);
    register(1015, parseStringArray);
    register(1008, parseStringArray);
    register(1009, parseStringArray);
    register(1040, parseStringArray);
    register(1041, parseStringArray);
    register(1115, parseDateArray);
    register(1182, parseDateArray);
    register(1185, parseDateArray);
    register(1186, parseInterval);
    register(1187, parseIntervalArray);
    register(17, parseByteA);
    register(114, JSON.parse.bind(JSON));
    register(3802, JSON.parse.bind(JSON));
    register(199, parseJsonArray);
    register(3807, parseJsonArray);
    register(3907, parseStringArray);
    register(2951, parseStringArray);
    register(791, parseStringArray);
    register(1183, parseStringArray);
    register(1270, parseStringArray);
  };
  textParsers$1 = {
    init
  };
  return textParsers$1;
}
var pgInt8;
var hasRequiredPgInt8;
function requirePgInt8() {
  if (hasRequiredPgInt8) return pgInt8;
  hasRequiredPgInt8 = 1;
  var BASE = 1e6;
  function readInt8(buffer) {
    var high = buffer.readInt32BE(0);
    var low = buffer.readUInt32BE(4);
    var sign = "";
    if (high < 0) {
      high = ~high + (low === 0);
      low = ~low + 1 >>> 0;
      sign = "-";
    }
    var result2 = "";
    var carry;
    var t;
    var digits;
    var pad2;
    var l;
    var i;
    {
      carry = high % BASE;
      high = high / BASE >>> 0;
      t = 4294967296 * carry + low;
      low = t / BASE >>> 0;
      digits = "" + (t - BASE * low);
      if (low === 0 && high === 0) {
        return sign + digits + result2;
      }
      pad2 = "";
      l = 6 - digits.length;
      for (i = 0; i < l; i++) {
        pad2 += "0";
      }
      result2 = pad2 + digits + result2;
    }
    {
      carry = high % BASE;
      high = high / BASE >>> 0;
      t = 4294967296 * carry + low;
      low = t / BASE >>> 0;
      digits = "" + (t - BASE * low);
      if (low === 0 && high === 0) {
        return sign + digits + result2;
      }
      pad2 = "";
      l = 6 - digits.length;
      for (i = 0; i < l; i++) {
        pad2 += "0";
      }
      result2 = pad2 + digits + result2;
    }
    {
      carry = high % BASE;
      high = high / BASE >>> 0;
      t = 4294967296 * carry + low;
      low = t / BASE >>> 0;
      digits = "" + (t - BASE * low);
      if (low === 0 && high === 0) {
        return sign + digits + result2;
      }
      pad2 = "";
      l = 6 - digits.length;
      for (i = 0; i < l; i++) {
        pad2 += "0";
      }
      result2 = pad2 + digits + result2;
    }
    {
      carry = high % BASE;
      t = 4294967296 * carry + low;
      digits = "" + t % BASE;
      return sign + digits + result2;
    }
  }
  pgInt8 = readInt8;
  return pgInt8;
}
var binaryParsers$1;
var hasRequiredBinaryParsers$1;
function requireBinaryParsers$1() {
  if (hasRequiredBinaryParsers$1) return binaryParsers$1;
  hasRequiredBinaryParsers$1 = 1;
  var parseInt64 = requirePgInt8();
  var parseBits = function(data, bits, offset, invert, callback) {
    offset = offset || 0;
    invert = invert || false;
    callback = callback || function(lastValue, newValue, bits2) {
      return lastValue * Math.pow(2, bits2) + newValue;
    };
    var offsetBytes = offset >> 3;
    var inv = function(value) {
      if (invert) {
        return ~value & 255;
      }
      return value;
    };
    var mask = 255;
    var firstBits = 8 - offset % 8;
    if (bits < firstBits) {
      mask = 255 << 8 - bits & 255;
      firstBits = bits;
    }
    if (offset) {
      mask = mask >> offset % 8;
    }
    var result2 = 0;
    if (offset % 8 + bits >= 8) {
      result2 = callback(0, inv(data[offsetBytes]) & mask, firstBits);
    }
    var bytes = bits + offset >> 3;
    for (var i = offsetBytes + 1; i < bytes; i++) {
      result2 = callback(result2, inv(data[i]), 8);
    }
    var lastBits = (bits + offset) % 8;
    if (lastBits > 0) {
      result2 = callback(result2, inv(data[bytes]) >> 8 - lastBits, lastBits);
    }
    return result2;
  };
  var parseFloatFromBits = function(data, precisionBits, exponentBits) {
    var bias = Math.pow(2, exponentBits - 1) - 1;
    var sign = parseBits(data, 1);
    var exponent = parseBits(data, exponentBits, 1);
    if (exponent === 0) {
      return 0;
    }
    var precisionBitsCounter = 1;
    var parsePrecisionBits = function(lastValue, newValue, bits) {
      if (lastValue === 0) {
        lastValue = 1;
      }
      for (var i = 1; i <= bits; i++) {
        precisionBitsCounter /= 2;
        if ((newValue & 1 << bits - i) > 0) {
          lastValue += precisionBitsCounter;
        }
      }
      return lastValue;
    };
    var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
    if (exponent == Math.pow(2, exponentBits + 1) - 1) {
      if (mantissa === 0) {
        return sign === 0 ? Infinity : -Infinity;
      }
      return NaN;
    }
    return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
  };
  var parseInt16 = function(value) {
    if (parseBits(value, 1) == 1) {
      return -1 * (parseBits(value, 15, 1, true) + 1);
    }
    return parseBits(value, 15, 1);
  };
  var parseInt32 = function(value) {
    if (parseBits(value, 1) == 1) {
      return -1 * (parseBits(value, 31, 1, true) + 1);
    }
    return parseBits(value, 31, 1);
  };
  var parseFloat32 = function(value) {
    return parseFloatFromBits(value, 23, 8);
  };
  var parseFloat64 = function(value) {
    return parseFloatFromBits(value, 52, 11);
  };
  var parseNumeric = function(value) {
    var sign = parseBits(value, 16, 32);
    if (sign == 49152) {
      return NaN;
    }
    var weight = Math.pow(1e4, parseBits(value, 16, 16));
    var result2 = 0;
    var ndigits = parseBits(value, 16);
    for (var i = 0; i < ndigits; i++) {
      result2 += parseBits(value, 16, 64 + 16 * i) * weight;
      weight /= 1e4;
    }
    var scale = Math.pow(10, parseBits(value, 16, 48));
    return (sign === 0 ? 1 : -1) * Math.round(result2 * scale) / scale;
  };
  var parseDate = function(isUTC, value) {
    var sign = parseBits(value, 1);
    var rawValue = parseBits(value, 63, 1);
    var result2 = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
    if (!isUTC) {
      result2.setTime(result2.getTime() + result2.getTimezoneOffset() * 6e4);
    }
    result2.usec = rawValue % 1e3;
    result2.getMicroSeconds = function() {
      return this.usec;
    };
    result2.setMicroSeconds = function(value2) {
      this.usec = value2;
    };
    result2.getUTCMicroSeconds = function() {
      return this.usec;
    };
    return result2;
  };
  var parseArray = function(value) {
    var dim = parseBits(value, 32);
    parseBits(value, 32, 32);
    var elementType = parseBits(value, 32, 64);
    var offset = 96;
    var dims = [];
    for (var i = 0; i < dim; i++) {
      dims[i] = parseBits(value, 32, offset);
      offset += 32;
      offset += 32;
    }
    var parseElement = function(elementType2) {
      var length = parseBits(value, 32, offset);
      offset += 32;
      if (length == 4294967295) {
        return null;
      }
      var result2;
      if (elementType2 == 23 || elementType2 == 20) {
        result2 = parseBits(value, length * 8, offset);
        offset += length * 8;
        return result2;
      } else if (elementType2 == 25) {
        result2 = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
        return result2;
      } else {
        console.log("ERROR: ElementType not implemented: " + elementType2);
      }
    };
    var parse2 = function(dimension, elementType2) {
      var array = [];
      var i2;
      if (dimension.length > 1) {
        var count = dimension.shift();
        for (i2 = 0; i2 < count; i2++) {
          array[i2] = parse2(dimension, elementType2);
        }
        dimension.unshift(count);
      } else {
        for (i2 = 0; i2 < dimension[0]; i2++) {
          array[i2] = parseElement(elementType2);
        }
      }
      return array;
    };
    return parse2(dims, elementType);
  };
  var parseText = function(value) {
    return value.toString("utf8");
  };
  var parseBool = function(value) {
    if (value === null) return null;
    return parseBits(value, 8) > 0;
  };
  var init = function(register) {
    register(20, parseInt64);
    register(21, parseInt16);
    register(23, parseInt32);
    register(26, parseInt32);
    register(1700, parseNumeric);
    register(700, parseFloat32);
    register(701, parseFloat64);
    register(16, parseBool);
    register(1114, parseDate.bind(null, false));
    register(1184, parseDate.bind(null, true));
    register(1e3, parseArray);
    register(1007, parseArray);
    register(1016, parseArray);
    register(1008, parseArray);
    register(1009, parseArray);
    register(25, parseText);
  };
  binaryParsers$1 = {
    init
  };
  return binaryParsers$1;
}
var builtins;
var hasRequiredBuiltins;
function requireBuiltins() {
  if (hasRequiredBuiltins) return builtins;
  hasRequiredBuiltins = 1;
  builtins = {
    BOOL: 16,
    BYTEA: 17,
    CHAR: 18,
    INT8: 20,
    INT2: 21,
    INT4: 23,
    REGPROC: 24,
    TEXT: 25,
    OID: 26,
    TID: 27,
    XID: 28,
    CID: 29,
    JSON: 114,
    XML: 142,
    PG_NODE_TREE: 194,
    SMGR: 210,
    PATH: 602,
    POLYGON: 604,
    CIDR: 650,
    FLOAT4: 700,
    FLOAT8: 701,
    ABSTIME: 702,
    RELTIME: 703,
    TINTERVAL: 704,
    CIRCLE: 718,
    MACADDR8: 774,
    MONEY: 790,
    MACADDR: 829,
    INET: 869,
    ACLITEM: 1033,
    BPCHAR: 1042,
    VARCHAR: 1043,
    DATE: 1082,
    TIME: 1083,
    TIMESTAMP: 1114,
    TIMESTAMPTZ: 1184,
    INTERVAL: 1186,
    TIMETZ: 1266,
    BIT: 1560,
    VARBIT: 1562,
    NUMERIC: 1700,
    REFCURSOR: 1790,
    REGPROCEDURE: 2202,
    REGOPER: 2203,
    REGOPERATOR: 2204,
    REGCLASS: 2205,
    REGTYPE: 2206,
    UUID: 2950,
    TXID_SNAPSHOT: 2970,
    PG_LSN: 3220,
    PG_NDISTINCT: 3361,
    PG_DEPENDENCIES: 3402,
    TSVECTOR: 3614,
    TSQUERY: 3615,
    GTSVECTOR: 3642,
    REGCONFIG: 3734,
    REGDICTIONARY: 3769,
    JSONB: 3802,
    REGNAMESPACE: 4089,
    REGROLE: 4096
  };
  return builtins;
}
var hasRequiredPgTypes$1;
function requirePgTypes$1() {
  if (hasRequiredPgTypes$1) return pgTypes$1;
  hasRequiredPgTypes$1 = 1;
  var textParsers2 = requireTextParsers$1();
  var binaryParsers2 = requireBinaryParsers$1();
  var arrayParser2 = requireArrayParser$1();
  var builtinTypes = requireBuiltins();
  pgTypes$1.getTypeParser = getTypeParser;
  pgTypes$1.setTypeParser = setTypeParser;
  pgTypes$1.arrayParser = arrayParser2;
  pgTypes$1.builtins = builtinTypes;
  var typeParsers = {
    text: {},
    binary: {}
  };
  function noParse(val2) {
    return String(val2);
  }
  function getTypeParser(oid, format) {
    format = format || "text";
    if (!typeParsers[format]) {
      return noParse;
    }
    return typeParsers[format][oid] || noParse;
  }
  function setTypeParser(oid, format, parseFn) {
    if (typeof format == "function") {
      parseFn = format;
      format = "text";
    }
    typeParsers[format][oid] = parseFn;
  }
  textParsers2.init(function(oid, converter) {
    typeParsers.text[oid] = converter;
  });
  binaryParsers2.init(function(oid, converter) {
    typeParsers.binary[oid] = converter;
  });
  return pgTypes$1;
}
(function(module) {
  module.exports = {
    // database host. defaults to localhost
    host: "localhost",
    // database user's name
    user: process.platform === "win32" ? process.env.USERNAME : process.env.USER,
    // name of database to connect
    database: void 0,
    // database user's password
    password: null,
    // a Postgres connection string to be used instead of setting individual connection items
    // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
    // in the defaults object.
    connectionString: void 0,
    // database port
    port: 5432,
    // number of rows to return at a time from a prepared statement's
    // portal. 0 will return all rows at once
    rows: 0,
    // binary result mode
    binary: false,
    // Connection pool options - see https://github.com/brianc/node-pg-pool
    // number of connections to use in connection pool
    // 0 will disable connection pooling
    max: 10,
    // max milliseconds a client can go unused before it is removed
    // from the pool and destroyed
    idleTimeoutMillis: 3e4,
    client_encoding: "",
    ssl: false,
    application_name: void 0,
    fallback_application_name: void 0,
    options: void 0,
    parseInputDatesAsUTC: false,
    // max milliseconds any query using this connection will execute for before timing out in error.
    // false=unlimited
    statement_timeout: false,
    // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
    // false=unlimited
    lock_timeout: false,
    // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
    // false=unlimited
    idle_in_transaction_session_timeout: false,
    // max milliseconds to wait for query to complete (client side)
    query_timeout: false,
    connect_timeout: 0,
    keepalives: 1,
    keepalives_idle: 0
  };
  var pgTypes2 = requirePgTypes$1();
  var parseBigInteger = pgTypes2.getTypeParser(20, "text");
  var parseBigIntegerArray = pgTypes2.getTypeParser(1016, "text");
  module.exports.__defineSetter__("parseInt8", function(val2) {
    pgTypes2.setTypeParser(20, "text", val2 ? pgTypes2.getTypeParser(23, "text") : parseBigInteger);
    pgTypes2.setTypeParser(1016, "text", val2 ? pgTypes2.getTypeParser(1007, "text") : parseBigIntegerArray);
  });
})(defaults$4);
var defaultsExports = defaults$4.exports;
const defaults$3 = defaultsExports;
function escapeElement(elementRepresentation) {
  var escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return '"' + escaped + '"';
}
function arrayString(val2) {
  var result2 = "{";
  for (var i = 0; i < val2.length; i++) {
    if (i > 0) {
      result2 = result2 + ",";
    }
    if (val2[i] === null || typeof val2[i] === "undefined") {
      result2 = result2 + "NULL";
    } else if (Array.isArray(val2[i])) {
      result2 = result2 + arrayString(val2[i]);
    } else if (ArrayBuffer.isView(val2[i])) {
      var item = val2[i];
      if (!(item instanceof Buffer)) {
        var buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
        if (buf.length === item.byteLength) {
          item = buf;
        } else {
          item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
        }
      }
      result2 += "\\\\x" + item.toString("hex");
    } else {
      result2 += escapeElement(prepareValue(val2[i]));
    }
  }
  result2 = result2 + "}";
  return result2;
}
var prepareValue = function(val2, seen) {
  if (val2 == null) {
    return null;
  }
  if (val2 instanceof Buffer) {
    return val2;
  }
  if (ArrayBuffer.isView(val2)) {
    var buf = Buffer.from(val2.buffer, val2.byteOffset, val2.byteLength);
    if (buf.length === val2.byteLength) {
      return buf;
    }
    return buf.slice(val2.byteOffset, val2.byteOffset + val2.byteLength);
  }
  if (val2 instanceof Date) {
    if (defaults$3.parseInputDatesAsUTC) {
      return dateToStringUTC(val2);
    } else {
      return dateToString(val2);
    }
  }
  if (Array.isArray(val2)) {
    return arrayString(val2);
  }
  if (typeof val2 === "object") {
    return prepareObject(val2, seen);
  }
  return val2.toString();
};
function prepareObject(val2, seen) {
  if (val2 && typeof val2.toPostgres === "function") {
    seen = seen || [];
    if (seen.indexOf(val2) !== -1) {
      throw new Error('circular reference detected while preparing "' + val2 + '" for query');
    }
    seen.push(val2);
    return prepareValue(val2.toPostgres(prepareValue), seen);
  }
  return JSON.stringify(val2);
}
function pad(number, digits) {
  number = "" + number;
  while (number.length < digits) {
    number = "0" + number;
  }
  return number;
}
function dateToString(date) {
  var offset = -date.getTimezoneOffset();
  var year = date.getFullYear();
  var isBCYear = year < 1;
  if (isBCYear) year = Math.abs(year) + 1;
  var ret = pad(year, 4) + "-" + pad(date.getMonth() + 1, 2) + "-" + pad(date.getDate(), 2) + "T" + pad(date.getHours(), 2) + ":" + pad(date.getMinutes(), 2) + ":" + pad(date.getSeconds(), 2) + "." + pad(date.getMilliseconds(), 3);
  if (offset < 0) {
    ret += "-";
    offset *= -1;
  } else {
    ret += "+";
  }
  ret += pad(Math.floor(offset / 60), 2) + ":" + pad(offset % 60, 2);
  if (isBCYear) ret += " BC";
  return ret;
}
function dateToStringUTC(date) {
  var year = date.getUTCFullYear();
  var isBCYear = year < 1;
  if (isBCYear) year = Math.abs(year) + 1;
  var ret = pad(year, 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + "T" + pad(date.getUTCHours(), 2) + ":" + pad(date.getUTCMinutes(), 2) + ":" + pad(date.getUTCSeconds(), 2) + "." + pad(date.getUTCMilliseconds(), 3);
  ret += "+00:00";
  if (isBCYear) ret += " BC";
  return ret;
}
function normalizeQueryConfig(config2, values, callback) {
  config2 = typeof config2 === "string" ? { text: config2 } : config2;
  if (values) {
    if (typeof values === "function") {
      config2.callback = values;
    } else {
      config2.values = values;
    }
  }
  if (callback) {
    config2.callback = callback;
  }
  return config2;
}
const escapeIdentifier = function(str) {
  return '"' + str.replace(/"/g, '""') + '"';
};
const escapeLiteral = function(str) {
  var hasBackslash = false;
  var escaped = "'";
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (c === "'") {
      escaped += c + c;
    } else if (c === "\\") {
      escaped += c + c;
      hasBackslash = true;
    } else {
      escaped += c;
    }
  }
  escaped += "'";
  if (hasBackslash === true) {
    escaped = " E" + escaped;
  }
  return escaped;
};
var utils$5 = {
  prepareValue: function prepareValueWrapper(value) {
    return prepareValue(value);
  },
  normalizeQueryConfig,
  escapeIdentifier,
  escapeLiteral
};
var utils$4 = { exports: {} };
var utilsLegacy$1;
var hasRequiredUtilsLegacy$1;
function requireUtilsLegacy$1() {
  if (hasRequiredUtilsLegacy$1) return utilsLegacy$1;
  hasRequiredUtilsLegacy$1 = 1;
  const nodeCrypto = require$$0$2;
  function md5(string) {
    return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
  }
  function postgresMd5PasswordHash(user, password2, salt) {
    var inner = md5(password2 + user);
    var outer = md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  function sha256(text) {
    return nodeCrypto.createHash("sha256").update(text).digest();
  }
  function hmacSha256(key, msg) {
    return nodeCrypto.createHmac("sha256", key).update(msg).digest();
  }
  async function deriveKey(password2, salt, iterations) {
    return nodeCrypto.pbkdf2Sync(password2, salt, iterations, 32, "sha256");
  }
  utilsLegacy$1 = {
    postgresMd5PasswordHash,
    randomBytes: nodeCrypto.randomBytes,
    deriveKey,
    sha256,
    hmacSha256,
    md5
  };
  return utilsLegacy$1;
}
var utilsWebcrypto$1;
var hasRequiredUtilsWebcrypto$1;
function requireUtilsWebcrypto$1() {
  if (hasRequiredUtilsWebcrypto$1) return utilsWebcrypto$1;
  hasRequiredUtilsWebcrypto$1 = 1;
  const nodeCrypto = require$$0$2;
  utilsWebcrypto$1 = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hmacSha256,
    md5
  };
  const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
  const subtleCrypto = webCrypto.subtle;
  const textEncoder = new TextEncoder();
  function randomBytes(length) {
    return webCrypto.getRandomValues(Buffer.alloc(length));
  }
  async function md5(string) {
    try {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    } catch (e) {
      const data = typeof string === "string" ? textEncoder.encode(string) : string;
      const hash = await subtleCrypto.digest("MD5", data);
      return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  }
  async function postgresMd5PasswordHash(user, password2, salt) {
    var inner = await md5(password2 + user);
    var outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  async function sha256(text) {
    return await subtleCrypto.digest("SHA-256", text);
  }
  async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
  }
  async function deriveKey(password2, salt, iterations) {
    const key = await subtleCrypto.importKey("raw", textEncoder.encode(password2), "PBKDF2", false, ["deriveBits"]);
    const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
  }
  return utilsWebcrypto$1;
}
const useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
if (useLegacyCrypto) {
  utils$4.exports = requireUtilsLegacy$1();
} else {
  utils$4.exports = requireUtilsWebcrypto$1();
}
var utilsExports = utils$4.exports;
const crypto$1 = utilsExports;
function startSession(mechanisms) {
  if (mechanisms.indexOf("SCRAM-SHA-256") === -1) {
    throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
  }
  const clientNonce = crypto$1.randomBytes(18).toString("base64");
  return {
    mechanism: "SCRAM-SHA-256",
    clientNonce,
    response: "n,,n=*,r=" + clientNonce,
    message: "SASLInitialResponse"
  };
}
async function continueSession(session, password2, serverData) {
  if (session.message !== "SASLInitialResponse") {
    throw new Error("SASL: Last message was not SASLInitialResponse");
  }
  if (typeof password2 !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
  }
  if (password2 === "") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
  }
  if (typeof serverData !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
  }
  const sv = parseServerFirstMessage(serverData);
  if (!sv.nonce.startsWith(session.clientNonce)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
  } else if (sv.nonce.length === session.clientNonce.length) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
  }
  var clientFirstMessageBare = "n=*,r=" + session.clientNonce;
  var serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
  var clientFinalMessageWithoutProof = "c=biws,r=" + sv.nonce;
  var authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
  var saltBytes = Buffer.from(sv.salt, "base64");
  var saltedPassword = await crypto$1.deriveKey(password2, saltBytes, sv.iteration);
  var clientKey = await crypto$1.hmacSha256(saltedPassword, "Client Key");
  var storedKey = await crypto$1.sha256(clientKey);
  var clientSignature = await crypto$1.hmacSha256(storedKey, authMessage);
  var clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
  var serverKey = await crypto$1.hmacSha256(saltedPassword, "Server Key");
  var serverSignatureBytes = await crypto$1.hmacSha256(serverKey, authMessage);
  session.message = "SASLResponse";
  session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
  session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
}
function finalizeSession(session, serverData) {
  if (session.message !== "SASLResponse") {
    throw new Error("SASL: Last message was not SASLResponse");
  }
  if (typeof serverData !== "string") {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
  }
  const { serverSignature } = parseServerFinalMessage(serverData);
  if (serverSignature !== session.serverSignature) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
  }
}
function isPrintableChars(text) {
  if (typeof text !== "string") {
    throw new TypeError("SASL: text must be a string");
  }
  return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
}
function isBase64(text) {
  return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
}
function parseAttributePairs(text) {
  if (typeof text !== "string") {
    throw new TypeError("SASL: attribute pairs text must be a string");
  }
  return new Map(
    text.split(",").map((attrValue) => {
      if (!/^.=/.test(attrValue)) {
        throw new Error("SASL: Invalid attribute pair entry");
      }
      const name2 = attrValue[0];
      const value = attrValue.substring(2);
      return [name2, value];
    })
  );
}
function parseServerFirstMessage(data) {
  const attrPairs = parseAttributePairs(data);
  const nonce = attrPairs.get("r");
  if (!nonce) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
  } else if (!isPrintableChars(nonce)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
  }
  const salt = attrPairs.get("s");
  if (!salt) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
  } else if (!isBase64(salt)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
  }
  const iterationText = attrPairs.get("i");
  if (!iterationText) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
  } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
    throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
  }
  const iteration = parseInt(iterationText, 10);
  return {
    nonce,
    salt,
    iteration
  };
}
function parseServerFinalMessage(serverData) {
  const attrPairs = parseAttributePairs(serverData);
  const serverSignature = attrPairs.get("v");
  if (!serverSignature) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
  } else if (!isBase64(serverSignature)) {
    throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
  }
  return {
    serverSignature
  };
}
function xorBuffers(a, b) {
  if (!Buffer.isBuffer(a)) {
    throw new TypeError("first argument must be a Buffer");
  }
  if (!Buffer.isBuffer(b)) {
    throw new TypeError("second argument must be a Buffer");
  }
  if (a.length !== b.length) {
    throw new Error("Buffer lengths must match");
  }
  if (a.length === 0) {
    throw new Error("Buffers cannot be empty");
  }
  return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
}
var sasl$2 = {
  startSession,
  continueSession,
  finalizeSession
};
var types$1 = requirePgTypes$1();
function TypeOverrides$1(userTypes) {
  this._types = userTypes || types$1;
  this.text = {};
  this.binary = {};
}
TypeOverrides$1.prototype.getOverrides = function(format) {
  switch (format) {
    case "text":
      return this.text;
    case "binary":
      return this.binary;
    default:
      return {};
  }
};
TypeOverrides$1.prototype.setTypeParser = function(oid, format, parseFn) {
  if (typeof format === "function") {
    parseFn = format;
    format = "text";
  }
  this.getOverrides(format)[oid] = parseFn;
};
TypeOverrides$1.prototype.getTypeParser = function(oid, format) {
  format = format || "text";
  return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
};
var typeOverrides$1 = TypeOverrides$1;
function parse$3(str) {
  if (str.charAt(0) === "/") {
    const config3 = str.split(" ");
    return { host: config3[0], database: config3[1] };
  }
  const config2 = {};
  let result2;
  let dummyHost = false;
  if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
    str = encodeURI(str).replace(/\%25(\d\d)/g, "%$1");
  }
  try {
    result2 = new URL(str, "postgres://base");
  } catch (e) {
    result2 = new URL(str.replace("@/", "@___DUMMY___/"), "postgres://base");
    dummyHost = true;
  }
  for (const entry of result2.searchParams.entries()) {
    config2[entry[0]] = entry[1];
  }
  config2.user = config2.user || decodeURIComponent(result2.username);
  config2.password = config2.password || decodeURIComponent(result2.password);
  if (result2.protocol == "socket:") {
    config2.host = decodeURI(result2.pathname);
    config2.database = result2.searchParams.get("db");
    config2.client_encoding = result2.searchParams.get("encoding");
    return config2;
  }
  const hostname = dummyHost ? "" : result2.hostname;
  if (!config2.host) {
    config2.host = decodeURIComponent(hostname);
  } else if (hostname && /^%2f/i.test(hostname)) {
    result2.pathname = hostname + result2.pathname;
  }
  if (!config2.port) {
    config2.port = result2.port;
  }
  const pathname = result2.pathname.slice(1) || null;
  config2.database = pathname ? decodeURI(pathname) : null;
  if (config2.ssl === "true" || config2.ssl === "1") {
    config2.ssl = true;
  }
  if (config2.ssl === "0") {
    config2.ssl = false;
  }
  if (config2.sslcert || config2.sslkey || config2.sslrootcert || config2.sslmode) {
    config2.ssl = {};
  }
  const fs2 = config2.sslcert || config2.sslkey || config2.sslrootcert ? require$$0 : null;
  if (config2.sslcert) {
    config2.ssl.cert = fs2.readFileSync(config2.sslcert).toString();
  }
  if (config2.sslkey) {
    config2.ssl.key = fs2.readFileSync(config2.sslkey).toString();
  }
  if (config2.sslrootcert) {
    config2.ssl.ca = fs2.readFileSync(config2.sslrootcert).toString();
  }
  switch (config2.sslmode) {
    case "disable": {
      config2.ssl = false;
      break;
    }
    case "prefer":
    case "require":
    case "verify-ca":
    case "verify-full": {
      break;
    }
    case "no-verify": {
      config2.ssl.rejectUnauthorized = false;
      break;
    }
  }
  return config2;
}
var pgConnectionString = parse$3;
parse$3.parse = parse$3;
var dns = require$$0$3;
var defaults$2 = defaultsExports;
var parse$2 = pgConnectionString.parse;
var val = function(key, config2, envVar) {
  if (envVar === void 0) {
    envVar = process.env["PG" + key.toUpperCase()];
  } else if (envVar === false) ;
  else {
    envVar = process.env[envVar];
  }
  return config2[key] || envVar || defaults$2[key];
};
var readSSLConfigFromEnvironment = function() {
  switch (process.env.PGSSLMODE) {
    case "disable":
      return false;
    case "prefer":
    case "require":
    case "verify-ca":
    case "verify-full":
      return true;
    case "no-verify":
      return { rejectUnauthorized: false };
  }
  return defaults$2.ssl;
};
var quoteParamValue = function(value) {
  return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
};
var add = function(params, config2, paramName) {
  var value = config2[paramName];
  if (value !== void 0 && value !== null) {
    params.push(paramName + "=" + quoteParamValue(value));
  }
};
let ConnectionParameters$1 = class ConnectionParameters {
  constructor(config2) {
    config2 = typeof config2 === "string" ? parse$2(config2) : config2 || {};
    if (config2.connectionString) {
      config2 = Object.assign({}, config2, parse$2(config2.connectionString));
    }
    this.user = val("user", config2);
    this.database = val("database", config2);
    if (this.database === void 0) {
      this.database = this.user;
    }
    this.port = parseInt(val("port", config2), 10);
    this.host = val("host", config2);
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: val("password", config2)
    });
    this.binary = val("binary", config2);
    this.options = val("options", config2);
    this.ssl = typeof config2.ssl === "undefined" ? readSSLConfigFromEnvironment() : config2.ssl;
    if (typeof this.ssl === "string") {
      if (this.ssl === "true") {
        this.ssl = true;
      }
    }
    if (this.ssl === "no-verify") {
      this.ssl = { rejectUnauthorized: false };
    }
    if (this.ssl && this.ssl.key) {
      Object.defineProperty(this.ssl, "key", {
        enumerable: false
      });
    }
    this.client_encoding = val("client_encoding", config2);
    this.replication = val("replication", config2);
    this.isDomainSocket = !(this.host || "").indexOf("/");
    this.application_name = val("application_name", config2, "PGAPPNAME");
    this.fallback_application_name = val("fallback_application_name", config2, false);
    this.statement_timeout = val("statement_timeout", config2, false);
    this.lock_timeout = val("lock_timeout", config2, false);
    this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config2, false);
    this.query_timeout = val("query_timeout", config2, false);
    if (config2.connectionTimeoutMillis === void 0) {
      this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
    } else {
      this.connect_timeout = Math.floor(config2.connectionTimeoutMillis / 1e3);
    }
    if (config2.keepAlive === false) {
      this.keepalives = 0;
    } else if (config2.keepAlive === true) {
      this.keepalives = 1;
    }
    if (typeof config2.keepAliveInitialDelayMillis === "number") {
      this.keepalives_idle = Math.floor(config2.keepAliveInitialDelayMillis / 1e3);
    }
  }
  getLibpqConnectionString(cb) {
    var params = [];
    add(params, this, "user");
    add(params, this, "password");
    add(params, this, "port");
    add(params, this, "application_name");
    add(params, this, "fallback_application_name");
    add(params, this, "connect_timeout");
    add(params, this, "options");
    var ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
    add(params, ssl, "sslmode");
    add(params, ssl, "sslca");
    add(params, ssl, "sslkey");
    add(params, ssl, "sslcert");
    add(params, ssl, "sslrootcert");
    if (this.database) {
      params.push("dbname=" + quoteParamValue(this.database));
    }
    if (this.replication) {
      params.push("replication=" + quoteParamValue(this.replication));
    }
    if (this.host) {
      params.push("host=" + quoteParamValue(this.host));
    }
    if (this.isDomainSocket) {
      return cb(null, params.join(" "));
    }
    if (this.client_encoding) {
      params.push("client_encoding=" + quoteParamValue(this.client_encoding));
    }
    dns.lookup(this.host, function(err, address) {
      if (err) return cb(err, null);
      params.push("hostaddr=" + quoteParamValue(address));
      return cb(null, params.join(" "));
    });
  }
};
var connectionParameters$1 = ConnectionParameters$1;
var types = requirePgTypes$1();
var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
let Result$1 = class Result {
  constructor(rowMode, types2) {
    this.command = null;
    this.rowCount = null;
    this.oid = null;
    this.rows = [];
    this.fields = [];
    this._parsers = void 0;
    this._types = types2;
    this.RowCtor = null;
    this.rowAsArray = rowMode === "array";
    if (this.rowAsArray) {
      this.parseRow = this._parseRowAsArray;
    }
    this._prebuiltEmptyResultObject = null;
  }
  // adds a command complete message
  addCommandComplete(msg) {
    var match;
    if (msg.text) {
      match = matchRegexp.exec(msg.text);
    } else {
      match = matchRegexp.exec(msg.command);
    }
    if (match) {
      this.command = match[1];
      if (match[3]) {
        this.oid = parseInt(match[2], 10);
        this.rowCount = parseInt(match[3], 10);
      } else if (match[2]) {
        this.rowCount = parseInt(match[2], 10);
      }
    }
  }
  _parseRowAsArray(rowData) {
    var row = new Array(rowData.length);
    for (var i = 0, len = rowData.length; i < len; i++) {
      var rawValue = rowData[i];
      if (rawValue !== null) {
        row[i] = this._parsers[i](rawValue);
      } else {
        row[i] = null;
      }
    }
    return row;
  }
  parseRow(rowData) {
    var row = { ...this._prebuiltEmptyResultObject };
    for (var i = 0, len = rowData.length; i < len; i++) {
      var rawValue = rowData[i];
      var field = this.fields[i].name;
      if (rawValue !== null) {
        row[field] = this._parsers[i](rawValue);
      } else {
        row[field] = null;
      }
    }
    return row;
  }
  addRow(row) {
    this.rows.push(row);
  }
  addFields(fieldDescriptions) {
    this.fields = fieldDescriptions;
    if (this.fields.length) {
      this._parsers = new Array(fieldDescriptions.length);
    }
    var row = {};
    for (var i = 0; i < fieldDescriptions.length; i++) {
      var desc = fieldDescriptions[i];
      row[desc.name] = null;
      if (this._types) {
        this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
      } else {
        this._parsers[i] = types.getTypeParser(desc.dataTypeID, desc.format || "text");
      }
    }
    this._prebuiltEmptyResultObject = { ...row };
  }
};
var result$1 = Result$1;
const { EventEmitter: EventEmitter$2 } = require$$0$4;
const Result2 = result$1;
const utils$3 = utils$5;
let Query$1 = class Query extends EventEmitter$2 {
  constructor(config2, values, callback) {
    super();
    config2 = utils$3.normalizeQueryConfig(config2, values, callback);
    this.text = config2.text;
    this.values = config2.values;
    this.rows = config2.rows;
    this.types = config2.types;
    this.name = config2.name;
    this.queryMode = config2.queryMode;
    this.binary = config2.binary;
    this.portal = config2.portal || "";
    this.callback = config2.callback;
    this._rowMode = config2.rowMode;
    if (process.domain && config2.callback) {
      this.callback = process.domain.bind(config2.callback);
    }
    this._result = new Result2(this._rowMode, this.types);
    this._results = this._result;
    this._canceledDueToError = false;
  }
  requiresPreparation() {
    if (this.queryMode === "extended") {
      return true;
    }
    if (this.name) {
      return true;
    }
    if (this.rows) {
      return true;
    }
    if (!this.text) {
      return false;
    }
    if (!this.values) {
      return false;
    }
    return this.values.length > 0;
  }
  _checkForMultirow() {
    if (this._result.command) {
      if (!Array.isArray(this._results)) {
        this._results = [this._result];
      }
      this._result = new Result2(this._rowMode, this._result._types);
      this._results.push(this._result);
    }
  }
  // associates row metadata from the supplied
  // message with this query object
  // metadata used when parsing row results
  handleRowDescription(msg) {
    this._checkForMultirow();
    this._result.addFields(msg.fields);
    this._accumulateRows = this.callback || !this.listeners("row").length;
  }
  handleDataRow(msg) {
    let row;
    if (this._canceledDueToError) {
      return;
    }
    try {
      row = this._result.parseRow(msg.fields);
    } catch (err) {
      this._canceledDueToError = err;
      return;
    }
    this.emit("row", row, this._result);
    if (this._accumulateRows) {
      this._result.addRow(row);
    }
  }
  handleCommandComplete(msg, connection2) {
    this._checkForMultirow();
    this._result.addCommandComplete(msg);
    if (this.rows) {
      connection2.sync();
    }
  }
  // if a named prepared statement is created with empty query text
  // the backend will send an emptyQuery message but *not* a command complete message
  // since we pipeline sync immediately after execute we don't need to do anything here
  // unless we have rows specified, in which case we did not pipeline the intial sync call
  handleEmptyQuery(connection2) {
    if (this.rows) {
      connection2.sync();
    }
  }
  handleError(err, connection2) {
    if (this._canceledDueToError) {
      err = this._canceledDueToError;
      this._canceledDueToError = false;
    }
    if (this.callback) {
      return this.callback(err);
    }
    this.emit("error", err);
  }
  handleReadyForQuery(con) {
    if (this._canceledDueToError) {
      return this.handleError(this._canceledDueToError, con);
    }
    if (this.callback) {
      try {
        this.callback(null, this._results);
      } catch (err) {
        process.nextTick(() => {
          throw err;
        });
      }
    }
    this.emit("end", this._results);
  }
  submit(connection2) {
    if (typeof this.text !== "string" && typeof this.name !== "string") {
      return new Error("A query must have either text or a name. Supplying neither is unsupported.");
    }
    const previous = connection2.parsedStatements[this.name];
    if (this.text && previous && this.text !== previous) {
      return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
    }
    if (this.values && !Array.isArray(this.values)) {
      return new Error("Query values must be an array");
    }
    if (this.requiresPreparation()) {
      this.prepare(connection2);
    } else {
      connection2.query(this.text);
    }
    return null;
  }
  hasBeenParsed(connection2) {
    return this.name && connection2.parsedStatements[this.name];
  }
  handlePortalSuspended(connection2) {
    this._getRows(connection2, this.rows);
  }
  _getRows(connection2, rows) {
    connection2.execute({
      portal: this.portal,
      rows
    });
    if (!rows) {
      connection2.sync();
    } else {
      connection2.flush();
    }
  }
  // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
  prepare(connection2) {
    if (!this.hasBeenParsed(connection2)) {
      connection2.parse({
        text: this.text,
        name: this.name,
        types: this.types
      });
    }
    try {
      connection2.bind({
        portal: this.portal,
        statement: this.name,
        values: this.values,
        binary: this.binary,
        valueMapper: utils$3.prepareValue
      });
    } catch (err) {
      this.handleError(err, connection2);
      return;
    }
    connection2.describe({
      type: "P",
      name: this.portal || ""
    });
    this._getRows(connection2, this.rows);
  }
  handleCopyInResponse(connection2) {
    connection2.sendCopyFail("No source stream defined");
  }
  // eslint-disable-next-line no-unused-vars
  handleCopyData(msg, connection2) {
  }
};
var query$4 = Query$1;
var dist = {};
var messages = {};
Object.defineProperty(messages, "__esModule", { value: true });
messages.NoticeMessage = messages.DataRowMessage = messages.CommandCompleteMessage = messages.ReadyForQueryMessage = messages.NotificationResponseMessage = messages.BackendKeyDataMessage = messages.AuthenticationMD5Password = messages.ParameterStatusMessage = messages.ParameterDescriptionMessage = messages.RowDescriptionMessage = messages.Field = messages.CopyResponse = messages.CopyDataMessage = messages.DatabaseError = messages.copyDone = messages.emptyQuery = messages.replicationStart = messages.portalSuspended = messages.noData = messages.closeComplete = messages.bindComplete = messages.parseComplete = void 0;
messages.parseComplete = {
  name: "parseComplete",
  length: 5
};
messages.bindComplete = {
  name: "bindComplete",
  length: 5
};
messages.closeComplete = {
  name: "closeComplete",
  length: 5
};
messages.noData = {
  name: "noData",
  length: 5
};
messages.portalSuspended = {
  name: "portalSuspended",
  length: 5
};
messages.replicationStart = {
  name: "replicationStart",
  length: 4
};
messages.emptyQuery = {
  name: "emptyQuery",
  length: 4
};
messages.copyDone = {
  name: "copyDone",
  length: 4
};
class DatabaseError extends Error {
  constructor(message, length, name2) {
    super(message);
    this.length = length;
    this.name = name2;
  }
}
messages.DatabaseError = DatabaseError;
class CopyDataMessage {
  constructor(length, chunk) {
    this.length = length;
    this.chunk = chunk;
    this.name = "copyData";
  }
}
messages.CopyDataMessage = CopyDataMessage;
class CopyResponse {
  constructor(length, name2, binary, columnCount) {
    this.length = length;
    this.name = name2;
    this.binary = binary;
    this.columnTypes = new Array(columnCount);
  }
}
messages.CopyResponse = CopyResponse;
class Field {
  constructor(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
    this.name = name2;
    this.tableID = tableID;
    this.columnID = columnID;
    this.dataTypeID = dataTypeID;
    this.dataTypeSize = dataTypeSize;
    this.dataTypeModifier = dataTypeModifier;
    this.format = format;
  }
}
messages.Field = Field;
class RowDescriptionMessage {
  constructor(length, fieldCount) {
    this.length = length;
    this.fieldCount = fieldCount;
    this.name = "rowDescription";
    this.fields = new Array(this.fieldCount);
  }
}
messages.RowDescriptionMessage = RowDescriptionMessage;
class ParameterDescriptionMessage {
  constructor(length, parameterCount) {
    this.length = length;
    this.parameterCount = parameterCount;
    this.name = "parameterDescription";
    this.dataTypeIDs = new Array(this.parameterCount);
  }
}
messages.ParameterDescriptionMessage = ParameterDescriptionMessage;
class ParameterStatusMessage {
  constructor(length, parameterName, parameterValue) {
    this.length = length;
    this.parameterName = parameterName;
    this.parameterValue = parameterValue;
    this.name = "parameterStatus";
  }
}
messages.ParameterStatusMessage = ParameterStatusMessage;
class AuthenticationMD5Password {
  constructor(length, salt) {
    this.length = length;
    this.salt = salt;
    this.name = "authenticationMD5Password";
  }
}
messages.AuthenticationMD5Password = AuthenticationMD5Password;
class BackendKeyDataMessage {
  constructor(length, processID, secretKey) {
    this.length = length;
    this.processID = processID;
    this.secretKey = secretKey;
    this.name = "backendKeyData";
  }
}
messages.BackendKeyDataMessage = BackendKeyDataMessage;
class NotificationResponseMessage {
  constructor(length, processId, channel, payload) {
    this.length = length;
    this.processId = processId;
    this.channel = channel;
    this.payload = payload;
    this.name = "notification";
  }
}
messages.NotificationResponseMessage = NotificationResponseMessage;
class ReadyForQueryMessage {
  constructor(length, status) {
    this.length = length;
    this.status = status;
    this.name = "readyForQuery";
  }
}
messages.ReadyForQueryMessage = ReadyForQueryMessage;
class CommandCompleteMessage {
  constructor(length, text) {
    this.length = length;
    this.text = text;
    this.name = "commandComplete";
  }
}
messages.CommandCompleteMessage = CommandCompleteMessage;
class DataRowMessage {
  constructor(length, fields) {
    this.length = length;
    this.fields = fields;
    this.name = "dataRow";
    this.fieldCount = fields.length;
  }
}
messages.DataRowMessage = DataRowMessage;
class NoticeMessage {
  constructor(length, message) {
    this.length = length;
    this.message = message;
    this.name = "notice";
  }
}
messages.NoticeMessage = NoticeMessage;
var serializer = {};
var bufferWriter = {};
Object.defineProperty(bufferWriter, "__esModule", { value: true });
bufferWriter.Writer = void 0;
class Writer {
  constructor(size = 256) {
    this.size = size;
    this.offset = 5;
    this.headerPosition = 0;
    this.buffer = Buffer.allocUnsafe(size);
  }
  ensure(size) {
    var remaining = this.buffer.length - this.offset;
    if (remaining < size) {
      var oldBuffer = this.buffer;
      var newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
      this.buffer = Buffer.allocUnsafe(newSize);
      oldBuffer.copy(this.buffer);
    }
  }
  addInt32(num) {
    this.ensure(4);
    this.buffer[this.offset++] = num >>> 24 & 255;
    this.buffer[this.offset++] = num >>> 16 & 255;
    this.buffer[this.offset++] = num >>> 8 & 255;
    this.buffer[this.offset++] = num >>> 0 & 255;
    return this;
  }
  addInt16(num) {
    this.ensure(2);
    this.buffer[this.offset++] = num >>> 8 & 255;
    this.buffer[this.offset++] = num >>> 0 & 255;
    return this;
  }
  addCString(string) {
    if (!string) {
      this.ensure(1);
    } else {
      var len = Buffer.byteLength(string);
      this.ensure(len + 1);
      this.buffer.write(string, this.offset, "utf-8");
      this.offset += len;
    }
    this.buffer[this.offset++] = 0;
    return this;
  }
  addString(string = "") {
    var len = Buffer.byteLength(string);
    this.ensure(len);
    this.buffer.write(string, this.offset);
    this.offset += len;
    return this;
  }
  add(otherBuffer) {
    this.ensure(otherBuffer.length);
    otherBuffer.copy(this.buffer, this.offset);
    this.offset += otherBuffer.length;
    return this;
  }
  join(code) {
    if (code) {
      this.buffer[this.headerPosition] = code;
      const length = this.offset - (this.headerPosition + 1);
      this.buffer.writeInt32BE(length, this.headerPosition + 1);
    }
    return this.buffer.slice(code ? 0 : 5, this.offset);
  }
  flush(code) {
    var result2 = this.join(code);
    this.offset = 5;
    this.headerPosition = 0;
    this.buffer = Buffer.allocUnsafe(this.size);
    return result2;
  }
}
bufferWriter.Writer = Writer;
Object.defineProperty(serializer, "__esModule", { value: true });
serializer.serialize = void 0;
const buffer_writer_1 = bufferWriter;
const writer = new buffer_writer_1.Writer();
const startup = (opts) => {
  writer.addInt16(3).addInt16(0);
  for (const key of Object.keys(opts)) {
    writer.addCString(key).addCString(opts[key]);
  }
  writer.addCString("client_encoding").addCString("UTF8");
  var bodyBuffer = writer.addCString("").flush();
  var length = bodyBuffer.length + 4;
  return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
};
const requestSsl = () => {
  const response = Buffer.allocUnsafe(8);
  response.writeInt32BE(8, 0);
  response.writeInt32BE(80877103, 4);
  return response;
};
const password = (password2) => {
  return writer.addCString(password2).flush(
    112
    /* code.startup */
  );
};
const sendSASLInitialResponseMessage = function(mechanism, initialResponse) {
  writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
  return writer.flush(
    112
    /* code.startup */
  );
};
const sendSCRAMClientFinalMessage = function(additionalData) {
  return writer.addString(additionalData).flush(
    112
    /* code.startup */
  );
};
const query$3 = (text) => {
  return writer.addCString(text).flush(
    81
    /* code.query */
  );
};
const emptyArray = [];
const parse$1 = (query2) => {
  const name2 = query2.name || "";
  if (name2.length > 63) {
    console.error("Warning! Postgres only supports 63 characters for query names.");
    console.error("You supplied %s (%s)", name2, name2.length);
    console.error("This can cause conflicts and silent errors executing queries");
  }
  const types2 = query2.types || emptyArray;
  var len = types2.length;
  var buffer = writer.addCString(name2).addCString(query2.text).addInt16(len);
  for (var i = 0; i < len; i++) {
    buffer.addInt32(types2[i]);
  }
  return writer.flush(
    80
    /* code.parse */
  );
};
const paramWriter = new buffer_writer_1.Writer();
const writeValues = function(values, valueMapper) {
  for (let i = 0; i < values.length; i++) {
    const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
    if (mappedVal == null) {
      writer.addInt16(
        0
        /* ParamType.STRING */
      );
      paramWriter.addInt32(-1);
    } else if (mappedVal instanceof Buffer) {
      writer.addInt16(
        1
        /* ParamType.BINARY */
      );
      paramWriter.addInt32(mappedVal.length);
      paramWriter.add(mappedVal);
    } else {
      writer.addInt16(
        0
        /* ParamType.STRING */
      );
      paramWriter.addInt32(Buffer.byteLength(mappedVal));
      paramWriter.addString(mappedVal);
    }
  }
};
const bind = (config2 = {}) => {
  const portal = config2.portal || "";
  const statement = config2.statement || "";
  const binary = config2.binary || false;
  const values = config2.values || emptyArray;
  const len = values.length;
  writer.addCString(portal).addCString(statement);
  writer.addInt16(len);
  writeValues(values, config2.valueMapper);
  writer.addInt16(len);
  writer.add(paramWriter.flush());
  writer.addInt16(
    binary ? 1 : 0
    /* ParamType.STRING */
  );
  return writer.flush(
    66
    /* code.bind */
  );
};
const emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
const execute = (config2) => {
  if (!config2 || !config2.portal && !config2.rows) {
    return emptyExecute;
  }
  const portal = config2.portal || "";
  const rows = config2.rows || 0;
  const portalLength = Buffer.byteLength(portal);
  const len = 4 + portalLength + 1 + 4;
  const buff = Buffer.allocUnsafe(1 + len);
  buff[0] = 69;
  buff.writeInt32BE(len, 1);
  buff.write(portal, 5, "utf-8");
  buff[portalLength + 5] = 0;
  buff.writeUInt32BE(rows, buff.length - 4);
  return buff;
};
const cancel = (processID, secretKey) => {
  const buffer = Buffer.allocUnsafe(16);
  buffer.writeInt32BE(16, 0);
  buffer.writeInt16BE(1234, 4);
  buffer.writeInt16BE(5678, 6);
  buffer.writeInt32BE(processID, 8);
  buffer.writeInt32BE(secretKey, 12);
  return buffer;
};
const cstringMessage = (code, string) => {
  const stringLen = Buffer.byteLength(string);
  const len = 4 + stringLen + 1;
  const buffer = Buffer.allocUnsafe(1 + len);
  buffer[0] = code;
  buffer.writeInt32BE(len, 1);
  buffer.write(string, 5, "utf-8");
  buffer[len] = 0;
  return buffer;
};
const emptyDescribePortal = writer.addCString("P").flush(
  68
  /* code.describe */
);
const emptyDescribeStatement = writer.addCString("S").flush(
  68
  /* code.describe */
);
const describe = (msg) => {
  return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
};
const close = (msg) => {
  const text = `${msg.type}${msg.name || ""}`;
  return cstringMessage(67, text);
};
const copyData = (chunk) => {
  return writer.add(chunk).flush(
    100
    /* code.copyFromChunk */
  );
};
const copyFail = (message) => {
  return cstringMessage(102, message);
};
const codeOnlyBuffer = (code) => Buffer.from([code, 0, 0, 0, 4]);
const flushBuffer$1 = codeOnlyBuffer(
  72
  /* code.flush */
);
const syncBuffer$1 = codeOnlyBuffer(
  83
  /* code.sync */
);
const endBuffer$1 = codeOnlyBuffer(
  88
  /* code.end */
);
const copyDoneBuffer = codeOnlyBuffer(
  99
  /* code.copyDone */
);
const serialize$1 = {
  startup,
  password,
  requestSsl,
  sendSASLInitialResponseMessage,
  sendSCRAMClientFinalMessage,
  query: query$3,
  parse: parse$1,
  bind,
  execute,
  describe,
  close,
  flush: () => flushBuffer$1,
  sync: () => syncBuffer$1,
  end: () => endBuffer$1,
  copyData,
  copyDone: () => copyDoneBuffer,
  copyFail,
  cancel
};
serializer.serialize = serialize$1;
var parser = {};
var bufferReader = {};
Object.defineProperty(bufferReader, "__esModule", { value: true });
bufferReader.BufferReader = void 0;
const emptyBuffer$1 = Buffer.allocUnsafe(0);
class BufferReader {
  constructor(offset = 0) {
    this.offset = offset;
    this.buffer = emptyBuffer$1;
    this.encoding = "utf-8";
  }
  setBuffer(offset, buffer) {
    this.offset = offset;
    this.buffer = buffer;
  }
  int16() {
    const result2 = this.buffer.readInt16BE(this.offset);
    this.offset += 2;
    return result2;
  }
  byte() {
    const result2 = this.buffer[this.offset];
    this.offset++;
    return result2;
  }
  int32() {
    const result2 = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return result2;
  }
  string(length) {
    const result2 = this.buffer.toString(this.encoding, this.offset, this.offset + length);
    this.offset += length;
    return result2;
  }
  cstring() {
    const start = this.offset;
    let end = start;
    while (this.buffer[end++] !== 0) {
    }
    this.offset = end;
    return this.buffer.toString(this.encoding, start, end - 1);
  }
  bytes(length) {
    const result2 = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return result2;
  }
}
bufferReader.BufferReader = BufferReader;
Object.defineProperty(parser, "__esModule", { value: true });
parser.Parser = void 0;
const messages_1 = messages;
const buffer_reader_1 = bufferReader;
const CODE_LENGTH = 1;
const LEN_LENGTH = 4;
const HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
const emptyBuffer = Buffer.allocUnsafe(0);
class Parser {
  constructor(opts) {
    this.buffer = emptyBuffer;
    this.bufferLength = 0;
    this.bufferOffset = 0;
    this.reader = new buffer_reader_1.BufferReader();
    if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
      throw new Error("Binary mode not supported yet");
    }
    this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
  }
  parse(buffer, callback) {
    this.mergeBuffer(buffer);
    const bufferFullLength = this.bufferOffset + this.bufferLength;
    let offset = this.bufferOffset;
    while (offset + HEADER_LENGTH <= bufferFullLength) {
      const code = this.buffer[offset];
      const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
      const fullMessageLength = CODE_LENGTH + length;
      if (fullMessageLength + offset <= bufferFullLength) {
        const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
        callback(message);
        offset += fullMessageLength;
      } else {
        break;
      }
    }
    if (offset === bufferFullLength) {
      this.buffer = emptyBuffer;
      this.bufferLength = 0;
      this.bufferOffset = 0;
    } else {
      this.bufferLength = bufferFullLength - offset;
      this.bufferOffset = offset;
    }
  }
  mergeBuffer(buffer) {
    if (this.bufferLength > 0) {
      const newLength = this.bufferLength + buffer.byteLength;
      const newFullLength = newLength + this.bufferOffset;
      if (newFullLength > this.buffer.byteLength) {
        let newBuffer;
        if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
          newBuffer = this.buffer;
        } else {
          let newBufferLength = this.buffer.byteLength * 2;
          while (newLength >= newBufferLength) {
            newBufferLength *= 2;
          }
          newBuffer = Buffer.allocUnsafe(newBufferLength);
        }
        this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
        this.buffer = newBuffer;
        this.bufferOffset = 0;
      }
      buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
      this.bufferLength = newLength;
    } else {
      this.buffer = buffer;
      this.bufferOffset = 0;
      this.bufferLength = buffer.byteLength;
    }
  }
  handlePacket(offset, code, length, bytes) {
    switch (code) {
      case 50:
        return messages_1.bindComplete;
      case 49:
        return messages_1.parseComplete;
      case 51:
        return messages_1.closeComplete;
      case 110:
        return messages_1.noData;
      case 115:
        return messages_1.portalSuspended;
      case 99:
        return messages_1.copyDone;
      case 87:
        return messages_1.replicationStart;
      case 73:
        return messages_1.emptyQuery;
      case 68:
        return this.parseDataRowMessage(offset, length, bytes);
      case 67:
        return this.parseCommandCompleteMessage(offset, length, bytes);
      case 90:
        return this.parseReadyForQueryMessage(offset, length, bytes);
      case 65:
        return this.parseNotificationMessage(offset, length, bytes);
      case 82:
        return this.parseAuthenticationResponse(offset, length, bytes);
      case 83:
        return this.parseParameterStatusMessage(offset, length, bytes);
      case 75:
        return this.parseBackendKeyData(offset, length, bytes);
      case 69:
        return this.parseErrorMessage(offset, length, bytes, "error");
      case 78:
        return this.parseErrorMessage(offset, length, bytes, "notice");
      case 84:
        return this.parseRowDescriptionMessage(offset, length, bytes);
      case 116:
        return this.parseParameterDescriptionMessage(offset, length, bytes);
      case 71:
        return this.parseCopyInMessage(offset, length, bytes);
      case 72:
        return this.parseCopyOutMessage(offset, length, bytes);
      case 100:
        return this.parseCopyData(offset, length, bytes);
      default:
        return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
    }
  }
  parseReadyForQueryMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const status = this.reader.string(1);
    return new messages_1.ReadyForQueryMessage(length, status);
  }
  parseCommandCompleteMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const text = this.reader.cstring();
    return new messages_1.CommandCompleteMessage(length, text);
  }
  parseCopyData(offset, length, bytes) {
    const chunk = bytes.slice(offset, offset + (length - 4));
    return new messages_1.CopyDataMessage(length, chunk);
  }
  parseCopyInMessage(offset, length, bytes) {
    return this.parseCopyMessage(offset, length, bytes, "copyInResponse");
  }
  parseCopyOutMessage(offset, length, bytes) {
    return this.parseCopyMessage(offset, length, bytes, "copyOutResponse");
  }
  parseCopyMessage(offset, length, bytes, messageName) {
    this.reader.setBuffer(offset, bytes);
    const isBinary = this.reader.byte() !== 0;
    const columnCount = this.reader.int16();
    const message = new messages_1.CopyResponse(length, messageName, isBinary, columnCount);
    for (let i = 0; i < columnCount; i++) {
      message.columnTypes[i] = this.reader.int16();
    }
    return message;
  }
  parseNotificationMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const processId = this.reader.int32();
    const channel = this.reader.cstring();
    const payload = this.reader.cstring();
    return new messages_1.NotificationResponseMessage(length, processId, channel, payload);
  }
  parseRowDescriptionMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const fieldCount = this.reader.int16();
    const message = new messages_1.RowDescriptionMessage(length, fieldCount);
    for (let i = 0; i < fieldCount; i++) {
      message.fields[i] = this.parseField();
    }
    return message;
  }
  parseField() {
    const name2 = this.reader.cstring();
    const tableID = this.reader.int32();
    const columnID = this.reader.int16();
    const dataTypeID = this.reader.int32();
    const dataTypeSize = this.reader.int16();
    const dataTypeModifier = this.reader.int32();
    const mode = this.reader.int16() === 0 ? "text" : "binary";
    return new messages_1.Field(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
  }
  parseParameterDescriptionMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const parameterCount = this.reader.int16();
    const message = new messages_1.ParameterDescriptionMessage(length, parameterCount);
    for (let i = 0; i < parameterCount; i++) {
      message.dataTypeIDs[i] = this.reader.int32();
    }
    return message;
  }
  parseDataRowMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const fieldCount = this.reader.int16();
    const fields = new Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
      const len = this.reader.int32();
      fields[i] = len === -1 ? null : this.reader.string(len);
    }
    return new messages_1.DataRowMessage(length, fields);
  }
  parseParameterStatusMessage(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const name2 = this.reader.cstring();
    const value = this.reader.cstring();
    return new messages_1.ParameterStatusMessage(length, name2, value);
  }
  parseBackendKeyData(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const processID = this.reader.int32();
    const secretKey = this.reader.int32();
    return new messages_1.BackendKeyDataMessage(length, processID, secretKey);
  }
  parseAuthenticationResponse(offset, length, bytes) {
    this.reader.setBuffer(offset, bytes);
    const code = this.reader.int32();
    const message = {
      name: "authenticationOk",
      length
    };
    switch (code) {
      case 0:
        break;
      case 3:
        if (message.length === 8) {
          message.name = "authenticationCleartextPassword";
        }
        break;
      case 5:
        if (message.length === 12) {
          message.name = "authenticationMD5Password";
          const salt = this.reader.bytes(4);
          return new messages_1.AuthenticationMD5Password(length, salt);
        }
        break;
      case 10:
        message.name = "authenticationSASL";
        message.mechanisms = [];
        let mechanism;
        do {
          mechanism = this.reader.cstring();
          if (mechanism) {
            message.mechanisms.push(mechanism);
          }
        } while (mechanism);
        break;
      case 11:
        message.name = "authenticationSASLContinue";
        message.data = this.reader.string(length - 8);
        break;
      case 12:
        message.name = "authenticationSASLFinal";
        message.data = this.reader.string(length - 8);
        break;
      default:
        throw new Error("Unknown authenticationOk message type " + code);
    }
    return message;
  }
  parseErrorMessage(offset, length, bytes, name2) {
    this.reader.setBuffer(offset, bytes);
    const fields = {};
    let fieldType = this.reader.string(1);
    while (fieldType !== "\0") {
      fields[fieldType] = this.reader.cstring();
      fieldType = this.reader.string(1);
    }
    const messageValue = fields.M;
    const message = name2 === "notice" ? new messages_1.NoticeMessage(length, messageValue) : new messages_1.DatabaseError(messageValue, length, name2);
    message.severity = fields.S;
    message.code = fields.C;
    message.detail = fields.D;
    message.hint = fields.H;
    message.position = fields.P;
    message.internalPosition = fields.p;
    message.internalQuery = fields.q;
    message.where = fields.W;
    message.schema = fields.s;
    message.table = fields.t;
    message.column = fields.c;
    message.dataType = fields.d;
    message.constraint = fields.n;
    message.file = fields.F;
    message.line = fields.L;
    message.routine = fields.R;
    return message;
  }
}
parser.Parser = Parser;
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.DatabaseError = exports2.serialize = exports2.parse = void 0;
  const messages_12 = messages;
  Object.defineProperty(exports2, "DatabaseError", { enumerable: true, get: function() {
    return messages_12.DatabaseError;
  } });
  const serializer_1 = serializer;
  Object.defineProperty(exports2, "serialize", { enumerable: true, get: function() {
    return serializer_1.serialize;
  } });
  const parser_1 = parser;
  function parse2(stream2, callback) {
    const parser2 = new parser_1.Parser();
    stream2.on("data", (buffer) => parser2.parse(buffer, callback));
    return new Promise((resolve) => stream2.on("end", () => resolve()));
  }
  exports2.parse = parse2;
})(dist);
const empty = {};
const empty$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: empty
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(empty$1);
const { getStream: getStream$1, getSecureStream: getSecureStream$1 } = getStreamFuncs();
var stream$1 = {
  /**
   * Get a socket stream compatible with the current runtime environment.
   * @returns {Duplex}
   */
  getStream: getStream$1,
  /**
   * Get a TLS secured socket, compatible with the current environment,
   * using the socket and other settings given in `options`.
   * @returns {Duplex}
   */
  getSecureStream: getSecureStream$1
};
function getNodejsStreamFuncs() {
  function getStream2(ssl) {
    const net = require$$0$5;
    return new net.Socket();
  }
  function getSecureStream2(options) {
    var tls = require$$1;
    return tls.connect(options);
  }
  return {
    getStream: getStream2,
    getSecureStream: getSecureStream2
  };
}
function getCloudflareStreamFuncs() {
  function getStream2(ssl) {
    const { CloudflareSocket } = require$$2;
    return new CloudflareSocket(ssl);
  }
  function getSecureStream2(options) {
    options.socket.startTls(options);
    return options.socket;
  }
  return {
    getStream: getStream2,
    getSecureStream: getSecureStream2
  };
}
function isCloudflareRuntime() {
  if (typeof navigator === "object" && navigator !== null && typeof navigator.userAgent === "string") {
    return navigator.userAgent === "Cloudflare-Workers";
  }
  if (typeof Response === "function") {
    const resp = new Response(null, { cf: { thing: true } });
    if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
      return true;
    }
  }
  return false;
}
function getStreamFuncs() {
  if (isCloudflareRuntime()) {
    return getCloudflareStreamFuncs();
  }
  return getNodejsStreamFuncs();
}
var EventEmitter$1 = require$$0$4.EventEmitter;
const { parse, serialize } = dist;
const { getStream, getSecureStream } = stream$1;
const flushBuffer = serialize.flush();
const syncBuffer = serialize.sync();
const endBuffer = serialize.end();
let Connection$1 = class Connection extends EventEmitter$1 {
  constructor(config2) {
    super();
    config2 = config2 || {};
    this.stream = config2.stream || getStream(config2.ssl);
    if (typeof this.stream === "function") {
      this.stream = this.stream(config2);
    }
    this._keepAlive = config2.keepAlive;
    this._keepAliveInitialDelayMillis = config2.keepAliveInitialDelayMillis;
    this.lastBuffer = false;
    this.parsedStatements = {};
    this.ssl = config2.ssl || false;
    this._ending = false;
    this._emitMessage = false;
    var self2 = this;
    this.on("newListener", function(eventName) {
      if (eventName === "message") {
        self2._emitMessage = true;
      }
    });
  }
  connect(port, host) {
    var self2 = this;
    this._connecting = true;
    this.stream.setNoDelay(true);
    this.stream.connect(port, host);
    this.stream.once("connect", function() {
      if (self2._keepAlive) {
        self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
      }
      self2.emit("connect");
    });
    const reportStreamError = function(error) {
      if (self2._ending && (error.code === "ECONNRESET" || error.code === "EPIPE")) {
        return;
      }
      self2.emit("error", error);
    };
    this.stream.on("error", reportStreamError);
    this.stream.on("close", function() {
      self2.emit("end");
    });
    if (!this.ssl) {
      return this.attachListeners(this.stream);
    }
    this.stream.once("data", function(buffer) {
      var responseCode = buffer.toString("utf8");
      switch (responseCode) {
        case "S":
          break;
        case "N":
          self2.stream.end();
          return self2.emit("error", new Error("The server does not support SSL connections"));
        default:
          self2.stream.end();
          return self2.emit("error", new Error("There was an error establishing an SSL connection"));
      }
      const options = {
        socket: self2.stream
      };
      if (self2.ssl !== true) {
        Object.assign(options, self2.ssl);
        if ("key" in self2.ssl) {
          options.key = self2.ssl.key;
        }
      }
      var net = require$$0$5;
      if (net.isIP && net.isIP(host) === 0) {
        options.servername = host;
      }
      try {
        self2.stream = getSecureStream(options);
      } catch (err) {
        return self2.emit("error", err);
      }
      self2.attachListeners(self2.stream);
      self2.stream.on("error", reportStreamError);
      self2.emit("sslconnect");
    });
  }
  attachListeners(stream2) {
    parse(stream2, (msg) => {
      var eventName = msg.name === "error" ? "errorMessage" : msg.name;
      if (this._emitMessage) {
        this.emit("message", msg);
      }
      this.emit(eventName, msg);
    });
  }
  requestSsl() {
    this.stream.write(serialize.requestSsl());
  }
  startup(config2) {
    this.stream.write(serialize.startup(config2));
  }
  cancel(processID, secretKey) {
    this._send(serialize.cancel(processID, secretKey));
  }
  password(password2) {
    this._send(serialize.password(password2));
  }
  sendSASLInitialResponseMessage(mechanism, initialResponse) {
    this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
  }
  sendSCRAMClientFinalMessage(additionalData) {
    this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
  }
  _send(buffer) {
    if (!this.stream.writable) {
      return false;
    }
    return this.stream.write(buffer);
  }
  query(text) {
    this._send(serialize.query(text));
  }
  // send parse message
  parse(query2) {
    this._send(serialize.parse(query2));
  }
  // send bind message
  bind(config2) {
    this._send(serialize.bind(config2));
  }
  // send execute message
  execute(config2) {
    this._send(serialize.execute(config2));
  }
  flush() {
    if (this.stream.writable) {
      this.stream.write(flushBuffer);
    }
  }
  sync() {
    this._ending = true;
    this._send(syncBuffer);
  }
  ref() {
    this.stream.ref();
  }
  unref() {
    this.stream.unref();
  }
  end() {
    this._ending = true;
    if (!this._connecting || !this.stream.writable) {
      this.stream.end();
      return;
    }
    return this.stream.write(endBuffer, () => {
      this.stream.end();
    });
  }
  close(msg) {
    this._send(serialize.close(msg));
  }
  describe(msg) {
    this._send(serialize.describe(msg));
  }
  sendCopyFromChunk(chunk) {
    this._send(serialize.copyData(chunk));
  }
  endCopyFrom() {
    this._send(serialize.copyDone());
  }
  sendCopyFail(msg) {
    this._send(serialize.copyFail(msg));
  }
};
var connection$1 = Connection$1;
var lib$1 = { exports: {} };
var helper = { exports: {} };
var split2;
var hasRequiredSplit2;
function requireSplit2() {
  if (hasRequiredSplit2) return split2;
  hasRequiredSplit2 = 1;
  const { Transform } = require$$0$6;
  const { StringDecoder } = require$$1$1;
  const kLast = Symbol("last");
  const kDecoder = Symbol("decoder");
  function transform(chunk, enc, cb) {
    let list;
    if (this.overflow) {
      const buf = this[kDecoder].write(chunk);
      list = buf.split(this.matcher);
      if (list.length === 1) return cb();
      list.shift();
      this.overflow = false;
    } else {
      this[kLast] += this[kDecoder].write(chunk);
      list = this[kLast].split(this.matcher);
    }
    this[kLast] = list.pop();
    for (let i = 0; i < list.length; i++) {
      try {
        push(this, this.mapper(list[i]));
      } catch (error) {
        return cb(error);
      }
    }
    this.overflow = this[kLast].length > this.maxLength;
    if (this.overflow && !this.skipOverflow) {
      cb(new Error("maximum buffer reached"));
      return;
    }
    cb();
  }
  function flush(cb) {
    this[kLast] += this[kDecoder].end();
    if (this[kLast]) {
      try {
        push(this, this.mapper(this[kLast]));
      } catch (error) {
        return cb(error);
      }
    }
    cb();
  }
  function push(self2, val2) {
    if (val2 !== void 0) {
      self2.push(val2);
    }
  }
  function noop(incoming) {
    return incoming;
  }
  function split(matcher, mapper, options) {
    matcher = matcher || /\r?\n/;
    mapper = mapper || noop;
    options = options || {};
    switch (arguments.length) {
      case 1:
        if (typeof matcher === "function") {
          mapper = matcher;
          matcher = /\r?\n/;
        } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
          options = matcher;
          matcher = /\r?\n/;
        }
        break;
      case 2:
        if (typeof matcher === "function") {
          options = mapper;
          mapper = matcher;
          matcher = /\r?\n/;
        } else if (typeof mapper === "object") {
          options = mapper;
          mapper = noop;
        }
    }
    options = Object.assign({}, options);
    options.autoDestroy = true;
    options.transform = transform;
    options.flush = flush;
    options.readableObjectMode = true;
    const stream2 = new Transform(options);
    stream2[kLast] = "";
    stream2[kDecoder] = new StringDecoder("utf8");
    stream2.matcher = matcher;
    stream2.mapper = mapper;
    stream2.maxLength = options.maxLength;
    stream2.skipOverflow = options.skipOverflow || false;
    stream2.overflow = false;
    stream2._destroy = function(err, cb) {
      this._writableState.errorEmitted = false;
      cb(err);
    };
    return stream2;
  }
  split2 = split;
  return split2;
}
var hasRequiredHelper;
function requireHelper() {
  if (hasRequiredHelper) return helper.exports;
  hasRequiredHelper = 1;
  (function(module) {
    var path2 = require$$0$1, Stream = require$$0$6.Stream, split = requireSplit2(), util = require$$1$2, defaultPort = 5432, isWin = process.platform === "win32", warnStream = process.stderr;
    var S_IRWXG = 56, S_IRWXO = 7, S_IFMT = 61440, S_IFREG = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT) == S_IFREG;
    }
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    Object.defineProperty(module.exports, "isWin", {
      get: function() {
        return isWin;
      },
      set: function(val2) {
        isWin = val2;
      }
    });
    module.exports.warnTo = function(stream2) {
      var old = warnStream;
      warnStream = stream2;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env = rawEnv || process.env;
      var file = env.PGPASSFILE || (isWin ? path2.join(env.APPDATA || "./", "postgresql", "pgpass.conf") : path2.join(env.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG | S_IRWXO)) {
        warn('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream2, cb) {
      var pass;
      var lineStream = stream2.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      var onEnd = function() {
        stream2.destroy();
        cb(pass);
      };
      var onErr = function(err) {
        stream2.destroy();
        warn("WARNING: error on reading file: %s", err);
        cb(void 0);
      };
      stream2.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      };
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  })(helper);
  return helper.exports;
}
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1) return lib$1.exports;
  hasRequiredLib$1 = 1;
  var fs2 = require$$0, helper2 = requireHelper();
  lib$1.exports = function(connInfo, cb) {
    var file = helper2.getFileName();
    fs2.stat(file, function(err, stat) {
      if (err || !helper2.usePgPass(stat, file)) {
        return cb(void 0);
      }
      var st = fs2.createReadStream(file);
      helper2.getPassword(connInfo, st, cb);
    });
  };
  lib$1.exports.warnTo = helper2.warnTo;
  return lib$1.exports;
}
var EventEmitter = require$$0$4.EventEmitter;
var utils$2 = utils$5;
var sasl$1 = sasl$2;
var TypeOverrides = typeOverrides$1;
var ConnectionParameters2 = connectionParameters$1;
var Query2 = query$4;
var defaults$1 = defaultsExports;
var Connection2 = connection$1;
const crypto = utilsExports;
class Client extends EventEmitter {
  constructor(config2) {
    super();
    this.connectionParameters = new ConnectionParameters2(config2);
    this.user = this.connectionParameters.user;
    this.database = this.connectionParameters.database;
    this.port = this.connectionParameters.port;
    this.host = this.connectionParameters.host;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: this.connectionParameters.password
    });
    this.replication = this.connectionParameters.replication;
    var c = config2 || {};
    this._Promise = c.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides(c.types);
    this._ending = false;
    this._ended = false;
    this._connecting = false;
    this._connected = false;
    this._connectionError = false;
    this._queryable = true;
    this.connection = c.connection || new Connection2({
      stream: c.stream,
      ssl: this.connectionParameters.ssl,
      keepAlive: c.keepAlive || false,
      keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
      encoding: this.connectionParameters.client_encoding || "utf8"
    });
    this.queryQueue = [];
    this.binary = c.binary || defaults$1.binary;
    this.processID = null;
    this.secretKey = null;
    this.ssl = this.connectionParameters.ssl || false;
    if (this.ssl && this.ssl.key) {
      Object.defineProperty(this.ssl, "key", {
        enumerable: false
      });
    }
    this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
  }
  _errorAllQueries(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.handleError(err, this.connection);
      });
    };
    if (this.activeQuery) {
      enqueueError(this.activeQuery);
      this.activeQuery = null;
    }
    this.queryQueue.forEach(enqueueError);
    this.queryQueue.length = 0;
  }
  _connect(callback) {
    var self2 = this;
    var con = this.connection;
    this._connectionCallback = callback;
    if (this._connecting || this._connected) {
      const err = new Error("Client has already been connected. You cannot reuse a client.");
      process.nextTick(() => {
        callback(err);
      });
      return;
    }
    this._connecting = true;
    if (this._connectionTimeoutMillis > 0) {
      this.connectionTimeoutHandle = setTimeout(() => {
        con._ending = true;
        con.stream.destroy(new Error("timeout expired"));
      }, this._connectionTimeoutMillis);
    }
    if (this.host && this.host.indexOf("/") === 0) {
      con.connect(this.host + "/.s.PGSQL." + this.port);
    } else {
      con.connect(this.port, this.host);
    }
    con.on("connect", function() {
      if (self2.ssl) {
        con.requestSsl();
      } else {
        con.startup(self2.getStartupConf());
      }
    });
    con.on("sslconnect", function() {
      con.startup(self2.getStartupConf());
    });
    this._attachListeners(con);
    con.once("end", () => {
      const error = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
      clearTimeout(this.connectionTimeoutHandle);
      this._errorAllQueries(error);
      this._ended = true;
      if (!this._ending) {
        if (this._connecting && !this._connectionError) {
          if (this._connectionCallback) {
            this._connectionCallback(error);
          } else {
            this._handleErrorEvent(error);
          }
        } else if (!this._connectionError) {
          this._handleErrorEvent(error);
        }
      }
      process.nextTick(() => {
        this.emit("end");
      });
    });
  }
  connect(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  _attachListeners(con) {
    con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
    con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
    con.on("authenticationSASL", this._handleAuthSASL.bind(this));
    con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
    con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
    con.on("backendKeyData", this._handleBackendKeyData.bind(this));
    con.on("error", this._handleErrorEvent.bind(this));
    con.on("errorMessage", this._handleErrorMessage.bind(this));
    con.on("readyForQuery", this._handleReadyForQuery.bind(this));
    con.on("notice", this._handleNotice.bind(this));
    con.on("rowDescription", this._handleRowDescription.bind(this));
    con.on("dataRow", this._handleDataRow.bind(this));
    con.on("portalSuspended", this._handlePortalSuspended.bind(this));
    con.on("emptyQuery", this._handleEmptyQuery.bind(this));
    con.on("commandComplete", this._handleCommandComplete.bind(this));
    con.on("parseComplete", this._handleParseComplete.bind(this));
    con.on("copyInResponse", this._handleCopyInResponse.bind(this));
    con.on("copyData", this._handleCopyData.bind(this));
    con.on("notification", this._handleNotification.bind(this));
  }
  // TODO(bmc): deprecate pgpass "built in" integration since this.password can be a function
  // it can be supplied by the user if required - this is a breaking change!
  _checkPgPass(cb) {
    const con = this.connection;
    if (typeof this.password === "function") {
      this._Promise.resolve().then(() => this.password()).then((pass) => {
        if (pass !== void 0) {
          if (typeof pass !== "string") {
            con.emit("error", new TypeError("Password must be a string"));
            return;
          }
          this.connectionParameters.password = this.password = pass;
        } else {
          this.connectionParameters.password = this.password = null;
        }
        cb();
      }).catch((err) => {
        con.emit("error", err);
      });
    } else if (this.password !== null) {
      cb();
    } else {
      try {
        const pgPass = requireLib$1();
        pgPass(this.connectionParameters, (pass) => {
          if (void 0 !== pass) {
            this.connectionParameters.password = this.password = pass;
          }
          cb();
        });
      } catch (e) {
        this.emit("error", e);
      }
    }
  }
  _handleAuthCleartextPassword(msg) {
    this._checkPgPass(() => {
      this.connection.password(this.password);
    });
  }
  _handleAuthMD5Password(msg) {
    this._checkPgPass(async () => {
      try {
        const hashedPassword = await crypto.postgresMd5PasswordHash(this.user, this.password, msg.salt);
        this.connection.password(hashedPassword);
      } catch (e) {
        this.emit("error", e);
      }
    });
  }
  _handleAuthSASL(msg) {
    this._checkPgPass(() => {
      try {
        this.saslSession = sasl$1.startSession(msg.mechanisms);
        this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
      } catch (err) {
        this.connection.emit("error", err);
      }
    });
  }
  async _handleAuthSASLContinue(msg) {
    try {
      await sasl$1.continueSession(this.saslSession, this.password, msg.data);
      this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
    } catch (err) {
      this.connection.emit("error", err);
    }
  }
  _handleAuthSASLFinal(msg) {
    try {
      sasl$1.finalizeSession(this.saslSession, msg.data);
      this.saslSession = null;
    } catch (err) {
      this.connection.emit("error", err);
    }
  }
  _handleBackendKeyData(msg) {
    this.processID = msg.processID;
    this.secretKey = msg.secretKey;
  }
  _handleReadyForQuery(msg) {
    if (this._connecting) {
      this._connecting = false;
      this._connected = true;
      clearTimeout(this.connectionTimeoutHandle);
      if (this._connectionCallback) {
        this._connectionCallback(null, this);
        this._connectionCallback = null;
      }
      this.emit("connect");
    }
    const { activeQuery } = this;
    this.activeQuery = null;
    this.readyForQuery = true;
    if (activeQuery) {
      activeQuery.handleReadyForQuery(this.connection);
    }
    this._pulseQueryQueue();
  }
  // if we receieve an error event or error message
  // during the connection process we handle it here
  _handleErrorWhileConnecting(err) {
    if (this._connectionError) {
      return;
    }
    this._connectionError = true;
    clearTimeout(this.connectionTimeoutHandle);
    if (this._connectionCallback) {
      return this._connectionCallback(err);
    }
    this.emit("error", err);
  }
  // if we're connected and we receive an error event from the connection
  // this means the socket is dead - do a hard abort of all queries and emit
  // the socket error on the client as well
  _handleErrorEvent(err) {
    if (this._connecting) {
      return this._handleErrorWhileConnecting(err);
    }
    this._queryable = false;
    this._errorAllQueries(err);
    this.emit("error", err);
  }
  // handle error messages from the postgres backend
  _handleErrorMessage(msg) {
    if (this._connecting) {
      return this._handleErrorWhileConnecting(msg);
    }
    const activeQuery = this.activeQuery;
    if (!activeQuery) {
      this._handleErrorEvent(msg);
      return;
    }
    this.activeQuery = null;
    activeQuery.handleError(msg, this.connection);
  }
  _handleRowDescription(msg) {
    this.activeQuery.handleRowDescription(msg);
  }
  _handleDataRow(msg) {
    this.activeQuery.handleDataRow(msg);
  }
  _handlePortalSuspended(msg) {
    this.activeQuery.handlePortalSuspended(this.connection);
  }
  _handleEmptyQuery(msg) {
    this.activeQuery.handleEmptyQuery(this.connection);
  }
  _handleCommandComplete(msg) {
    if (this.activeQuery == null) {
      const error = new Error("Received unexpected commandComplete message from backend.");
      this._handleErrorEvent(error);
      return;
    }
    this.activeQuery.handleCommandComplete(msg, this.connection);
  }
  _handleParseComplete() {
    if (this.activeQuery == null) {
      const error = new Error("Received unexpected parseComplete message from backend.");
      this._handleErrorEvent(error);
      return;
    }
    if (this.activeQuery.name) {
      this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text;
    }
  }
  _handleCopyInResponse(msg) {
    this.activeQuery.handleCopyInResponse(this.connection);
  }
  _handleCopyData(msg) {
    this.activeQuery.handleCopyData(msg, this.connection);
  }
  _handleNotification(msg) {
    this.emit("notification", msg);
  }
  _handleNotice(msg) {
    this.emit("notice", msg);
  }
  getStartupConf() {
    var params = this.connectionParameters;
    var data = {
      user: params.user,
      database: params.database
    };
    var appName = params.application_name || params.fallback_application_name;
    if (appName) {
      data.application_name = appName;
    }
    if (params.replication) {
      data.replication = "" + params.replication;
    }
    if (params.statement_timeout) {
      data.statement_timeout = String(parseInt(params.statement_timeout, 10));
    }
    if (params.lock_timeout) {
      data.lock_timeout = String(parseInt(params.lock_timeout, 10));
    }
    if (params.idle_in_transaction_session_timeout) {
      data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
    }
    if (params.options) {
      data.options = params.options;
    }
    return data;
  }
  cancel(client2, query2) {
    if (client2.activeQuery === query2) {
      var con = this.connection;
      if (this.host && this.host.indexOf("/") === 0) {
        con.connect(this.host + "/.s.PGSQL." + this.port);
      } else {
        con.connect(this.port, this.host);
      }
      con.on("connect", function() {
        con.cancel(client2.processID, client2.secretKey);
      });
    } else if (client2.queryQueue.indexOf(query2) !== -1) {
      client2.queryQueue.splice(client2.queryQueue.indexOf(query2), 1);
    }
  }
  setTypeParser(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  }
  getTypeParser(oid, format) {
    return this._types.getTypeParser(oid, format);
  }
  // escapeIdentifier and escapeLiteral moved to utility functions & exported
  // on PG
  // re-exported here for backwards compatibility
  escapeIdentifier(str) {
    return utils$2.escapeIdentifier(str);
  }
  escapeLiteral(str) {
    return utils$2.escapeLiteral(str);
  }
  _pulseQueryQueue() {
    if (this.readyForQuery === true) {
      this.activeQuery = this.queryQueue.shift();
      if (this.activeQuery) {
        this.readyForQuery = false;
        this.hasExecuted = true;
        const queryError = this.activeQuery.submit(this.connection);
        if (queryError) {
          process.nextTick(() => {
            this.activeQuery.handleError(queryError, this.connection);
            this.readyForQuery = true;
            this._pulseQueryQueue();
          });
        }
      } else if (this.hasExecuted) {
        this.activeQuery = null;
        this.emit("drain");
      }
    }
  }
  query(config2, values, callback) {
    var query2;
    var result2;
    var readTimeout;
    var readTimeoutTimer;
    var queryCallback;
    if (config2 === null || config2 === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config2.submit === "function") {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config2;
      if (typeof values === "function") {
        query2.callback = query2.callback || values;
      }
    } else {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      query2 = new Query2(config2, values, callback);
      if (!query2.callback) {
        result2 = new this._Promise((resolve, reject) => {
          query2.callback = (err, res) => err ? reject(err) : resolve(res);
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback;
      readTimeoutTimer = setTimeout(() => {
        var error = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error, this.connection);
        });
        queryCallback(error);
        query2.callback = () => {
        };
        var index = this.queryQueue.indexOf(query2);
        if (index > -1) {
          this.queryQueue.splice(index, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (this.binary && !query2.binary) {
      query2.binary = true;
    }
    if (query2._result && !query2._result._types) {
      query2._result._types = this._types;
    }
    if (!this._queryable) {
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
      });
      return result2;
    }
    if (this._ending) {
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"), this.connection);
      });
      return result2;
    }
    this.queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  }
  ref() {
    this.connection.ref();
  }
  unref() {
    this.connection.unref();
  }
  end(cb) {
    this._ending = true;
    if (!this.connection._connecting || this._ended) {
      if (cb) {
        cb();
      } else {
        return this._Promise.resolve();
      }
    }
    if (this.activeQuery || !this._queryable) {
      this.connection.stream.destroy();
    } else {
      this.connection.end();
    }
    if (cb) {
      this.connection.once("end", cb);
    } else {
      return new this._Promise((resolve) => {
        this.connection.once("end", resolve);
      });
    }
  }
}
Client.Query = Query2;
var client$3 = Client;
var lib = { exports: {} };
var defaults = { exports: {} };
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults.exports;
  hasRequiredDefaults = 1;
  (function(module) {
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user: process.platform === "win32" ? process.env.USERNAME : process.env.USER,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes2 = requirePgTypes$1();
    var parseBigInteger = pgTypes2.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes2.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val2) {
      pgTypes2.setTypeParser(20, "text", val2 ? pgTypes2.getTypeParser(23, "text") : parseBigInteger);
      pgTypes2.setTypeParser(1016, "text", val2 ? pgTypes2.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  })(defaults);
  return defaults.exports;
}
var utils$1;
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  const defaults2 = requireDefaults();
  function escapeElement2(elementRepresentation) {
    var escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return '"' + escaped + '"';
  }
  function arrayString2(val2) {
    var result2 = "{";
    for (var i = 0; i < val2.length; i++) {
      if (i > 0) {
        result2 = result2 + ",";
      }
      if (val2[i] === null || typeof val2[i] === "undefined") {
        result2 = result2 + "NULL";
      } else if (Array.isArray(val2[i])) {
        result2 = result2 + arrayString2(val2[i]);
      } else if (ArrayBuffer.isView(val2[i])) {
        var item = val2[i];
        if (!(item instanceof Buffer)) {
          var buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
          if (buf.length === item.byteLength) {
            item = buf;
          } else {
            item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
          }
        }
        result2 += "\\\\x" + item.toString("hex");
      } else {
        result2 += escapeElement2(prepareValue2(val2[i]));
      }
    }
    result2 = result2 + "}";
    return result2;
  }
  var prepareValue2 = function(val2, seen) {
    if (val2 == null) {
      return null;
    }
    if (val2 instanceof Buffer) {
      return val2;
    }
    if (ArrayBuffer.isView(val2)) {
      var buf = Buffer.from(val2.buffer, val2.byteOffset, val2.byteLength);
      if (buf.length === val2.byteLength) {
        return buf;
      }
      return buf.slice(val2.byteOffset, val2.byteOffset + val2.byteLength);
    }
    if (val2 instanceof Date) {
      if (defaults2.parseInputDatesAsUTC) {
        return dateToStringUTC2(val2);
      } else {
        return dateToString2(val2);
      }
    }
    if (Array.isArray(val2)) {
      return arrayString2(val2);
    }
    if (typeof val2 === "object") {
      return prepareObject2(val2, seen);
    }
    return val2.toString();
  };
  function prepareObject2(val2, seen) {
    if (val2 && typeof val2.toPostgres === "function") {
      seen = seen || [];
      if (seen.indexOf(val2) !== -1) {
        throw new Error('circular reference detected while preparing "' + val2 + '" for query');
      }
      seen.push(val2);
      return prepareValue2(val2.toPostgres(prepareValue2), seen);
    }
    return JSON.stringify(val2);
  }
  function pad2(number, digits) {
    number = "" + number;
    while (number.length < digits) {
      number = "0" + number;
    }
    return number;
  }
  function dateToString2(date) {
    var offset = -date.getTimezoneOffset();
    var year = date.getFullYear();
    var isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1;
    var ret = pad2(year, 4) + "-" + pad2(date.getMonth() + 1, 2) + "-" + pad2(date.getDate(), 2) + "T" + pad2(date.getHours(), 2) + ":" + pad2(date.getMinutes(), 2) + ":" + pad2(date.getSeconds(), 2) + "." + pad2(date.getMilliseconds(), 3);
    if (offset < 0) {
      ret += "-";
      offset *= -1;
    } else {
      ret += "+";
    }
    ret += pad2(Math.floor(offset / 60), 2) + ":" + pad2(offset % 60, 2);
    if (isBCYear) ret += " BC";
    return ret;
  }
  function dateToStringUTC2(date) {
    var year = date.getUTCFullYear();
    var isBCYear = year < 1;
    if (isBCYear) year = Math.abs(year) + 1;
    var ret = pad2(year, 4) + "-" + pad2(date.getUTCMonth() + 1, 2) + "-" + pad2(date.getUTCDate(), 2) + "T" + pad2(date.getUTCHours(), 2) + ":" + pad2(date.getUTCMinutes(), 2) + ":" + pad2(date.getUTCSeconds(), 2) + "." + pad2(date.getUTCMilliseconds(), 3);
    ret += "+00:00";
    if (isBCYear) ret += " BC";
    return ret;
  }
  function normalizeQueryConfig2(config2, values, callback) {
    config2 = typeof config2 === "string" ? { text: config2 } : config2;
    if (values) {
      if (typeof values === "function") {
        config2.callback = values;
      } else {
        config2.values = values;
      }
    }
    if (callback) {
      config2.callback = callback;
    }
    return config2;
  }
  const escapeIdentifier2 = function(str) {
    return '"' + str.replace(/"/g, '""') + '"';
  };
  const escapeLiteral2 = function(str) {
    var hasBackslash = false;
    var escaped = "'";
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (c === "'") {
        escaped += c + c;
      } else if (c === "\\") {
        escaped += c + c;
        hasBackslash = true;
      } else {
        escaped += c;
      }
    }
    escaped += "'";
    if (hasBackslash === true) {
      escaped = " E" + escaped;
    }
    return escaped;
  };
  utils$1 = {
    prepareValue: function prepareValueWrapper2(value) {
      return prepareValue2(value);
    },
    normalizeQueryConfig: normalizeQueryConfig2,
    escapeIdentifier: escapeIdentifier2,
    escapeLiteral: escapeLiteral2
  };
  return utils$1;
}
var utils = { exports: {} };
var utilsLegacy;
var hasRequiredUtilsLegacy;
function requireUtilsLegacy() {
  if (hasRequiredUtilsLegacy) return utilsLegacy;
  hasRequiredUtilsLegacy = 1;
  const nodeCrypto = require$$0$2;
  function md5(string) {
    return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
  }
  function postgresMd5PasswordHash(user, password2, salt) {
    var inner = md5(password2 + user);
    var outer = md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  function sha256(text) {
    return nodeCrypto.createHash("sha256").update(text).digest();
  }
  function hmacSha256(key, msg) {
    return nodeCrypto.createHmac("sha256", key).update(msg).digest();
  }
  async function deriveKey(password2, salt, iterations) {
    return nodeCrypto.pbkdf2Sync(password2, salt, iterations, 32, "sha256");
  }
  utilsLegacy = {
    postgresMd5PasswordHash,
    randomBytes: nodeCrypto.randomBytes,
    deriveKey,
    sha256,
    hmacSha256,
    md5
  };
  return utilsLegacy;
}
var utilsWebcrypto;
var hasRequiredUtilsWebcrypto;
function requireUtilsWebcrypto() {
  if (hasRequiredUtilsWebcrypto) return utilsWebcrypto;
  hasRequiredUtilsWebcrypto = 1;
  const nodeCrypto = require$$0$2;
  utilsWebcrypto = {
    postgresMd5PasswordHash,
    randomBytes,
    deriveKey,
    sha256,
    hmacSha256,
    md5
  };
  const webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
  const subtleCrypto = webCrypto.subtle;
  const textEncoder = new TextEncoder();
  function randomBytes(length) {
    return webCrypto.getRandomValues(Buffer.alloc(length));
  }
  async function md5(string) {
    try {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    } catch (e) {
      const data = typeof string === "string" ? textEncoder.encode(string) : string;
      const hash = await subtleCrypto.digest("MD5", data);
      return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  }
  async function postgresMd5PasswordHash(user, password2, salt) {
    var inner = await md5(password2 + user);
    var outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
    return "md5" + outer;
  }
  async function sha256(text) {
    return await subtleCrypto.digest("SHA-256", text);
  }
  async function hmacSha256(keyBuffer, msg) {
    const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
  }
  async function deriveKey(password2, salt, iterations) {
    const key = await subtleCrypto.importKey("raw", textEncoder.encode(password2), "PBKDF2", false, ["deriveBits"]);
    const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
    return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
  }
  return utilsWebcrypto;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils.exports;
  hasRequiredUtils = 1;
  const useLegacyCrypto2 = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
  if (useLegacyCrypto2) {
    utils.exports = requireUtilsLegacy();
  } else {
    utils.exports = requireUtilsWebcrypto();
  }
  return utils.exports;
}
var sasl;
var hasRequiredSasl;
function requireSasl() {
  if (hasRequiredSasl) return sasl;
  hasRequiredSasl = 1;
  const crypto2 = requireUtils();
  function startSession2(mechanisms) {
    if (mechanisms.indexOf("SCRAM-SHA-256") === -1) {
      throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
    }
    const clientNonce = crypto2.randomBytes(18).toString("base64");
    return {
      mechanism: "SCRAM-SHA-256",
      clientNonce,
      response: "n,,n=*,r=" + clientNonce,
      message: "SASLInitialResponse"
    };
  }
  async function continueSession2(session, password2, serverData) {
    if (session.message !== "SASLInitialResponse") {
      throw new Error("SASL: Last message was not SASLInitialResponse");
    }
    if (typeof password2 !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
    }
    if (password2 === "") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
    }
    if (typeof serverData !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
    }
    const sv = parseServerFirstMessage2(serverData);
    if (!sv.nonce.startsWith(session.clientNonce)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
    } else if (sv.nonce.length === session.clientNonce.length) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
    }
    var clientFirstMessageBare = "n=*,r=" + session.clientNonce;
    var serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
    var clientFinalMessageWithoutProof = "c=biws,r=" + sv.nonce;
    var authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
    var saltBytes = Buffer.from(sv.salt, "base64");
    var saltedPassword = await crypto2.deriveKey(password2, saltBytes, sv.iteration);
    var clientKey = await crypto2.hmacSha256(saltedPassword, "Client Key");
    var storedKey = await crypto2.sha256(clientKey);
    var clientSignature = await crypto2.hmacSha256(storedKey, authMessage);
    var clientProof = xorBuffers2(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
    var serverKey = await crypto2.hmacSha256(saltedPassword, "Server Key");
    var serverSignatureBytes = await crypto2.hmacSha256(serverKey, authMessage);
    session.message = "SASLResponse";
    session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
    session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
  }
  function finalizeSession2(session, serverData) {
    if (session.message !== "SASLResponse") {
      throw new Error("SASL: Last message was not SASLResponse");
    }
    if (typeof serverData !== "string") {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
    }
    const { serverSignature } = parseServerFinalMessage2(serverData);
    if (serverSignature !== session.serverSignature) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
    }
  }
  function isPrintableChars2(text) {
    if (typeof text !== "string") {
      throw new TypeError("SASL: text must be a string");
    }
    return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
  }
  function isBase642(text) {
    return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
  }
  function parseAttributePairs2(text) {
    if (typeof text !== "string") {
      throw new TypeError("SASL: attribute pairs text must be a string");
    }
    return new Map(
      text.split(",").map((attrValue) => {
        if (!/^.=/.test(attrValue)) {
          throw new Error("SASL: Invalid attribute pair entry");
        }
        const name2 = attrValue[0];
        const value = attrValue.substring(2);
        return [name2, value];
      })
    );
  }
  function parseServerFirstMessage2(data) {
    const attrPairs = parseAttributePairs2(data);
    const nonce = attrPairs.get("r");
    if (!nonce) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
    } else if (!isPrintableChars2(nonce)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
    }
    const salt = attrPairs.get("s");
    if (!salt) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
    } else if (!isBase642(salt)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
    }
    const iterationText = attrPairs.get("i");
    if (!iterationText) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
    } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
      throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
    }
    const iteration = parseInt(iterationText, 10);
    return {
      nonce,
      salt,
      iteration
    };
  }
  function parseServerFinalMessage2(serverData) {
    const attrPairs = parseAttributePairs2(serverData);
    const serverSignature = attrPairs.get("v");
    if (!serverSignature) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
    } else if (!isBase642(serverSignature)) {
      throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
    }
    return {
      serverSignature
    };
  }
  function xorBuffers2(a, b) {
    if (!Buffer.isBuffer(a)) {
      throw new TypeError("first argument must be a Buffer");
    }
    if (!Buffer.isBuffer(b)) {
      throw new TypeError("second argument must be a Buffer");
    }
    if (a.length !== b.length) {
      throw new Error("Buffer lengths must match");
    }
    if (a.length === 0) {
      throw new Error("Buffers cannot be empty");
    }
    return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
  }
  sasl = {
    startSession: startSession2,
    continueSession: continueSession2,
    finalizeSession: finalizeSession2
  };
  return sasl;
}
var typeOverrides;
var hasRequiredTypeOverrides;
function requireTypeOverrides() {
  if (hasRequiredTypeOverrides) return typeOverrides;
  hasRequiredTypeOverrides = 1;
  var types2 = requirePgTypes$1();
  function TypeOverrides2(userTypes) {
    this._types = userTypes || types2;
    this.text = {};
    this.binary = {};
  }
  TypeOverrides2.prototype.getOverrides = function(format) {
    switch (format) {
      case "text":
        return this.text;
      case "binary":
        return this.binary;
      default:
        return {};
    }
  };
  TypeOverrides2.prototype.setTypeParser = function(oid, format, parseFn) {
    if (typeof format === "function") {
      parseFn = format;
      format = "text";
    }
    this.getOverrides(format)[oid] = parseFn;
  };
  TypeOverrides2.prototype.getTypeParser = function(oid, format) {
    format = format || "text";
    return this.getOverrides(format)[oid] || this._types.getTypeParser(oid, format);
  };
  typeOverrides = TypeOverrides2;
  return typeOverrides;
}
var connectionParameters;
var hasRequiredConnectionParameters;
function requireConnectionParameters() {
  if (hasRequiredConnectionParameters) return connectionParameters;
  hasRequiredConnectionParameters = 1;
  var dns2 = require$$0$3;
  var defaults2 = requireDefaults();
  var parse2 = pgConnectionString.parse;
  var val2 = function(key, config2, envVar) {
    if (envVar === void 0) {
      envVar = process.env["PG" + key.toUpperCase()];
    } else if (envVar === false) ;
    else {
      envVar = process.env[envVar];
    }
    return config2[key] || envVar || defaults2[key];
  };
  var readSSLConfigFromEnvironment2 = function() {
    switch (process.env.PGSSLMODE) {
      case "disable":
        return false;
      case "prefer":
      case "require":
      case "verify-ca":
      case "verify-full":
        return true;
      case "no-verify":
        return { rejectUnauthorized: false };
    }
    return defaults2.ssl;
  };
  var quoteParamValue2 = function(value) {
    return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
  };
  var add2 = function(params, config2, paramName) {
    var value = config2[paramName];
    if (value !== void 0 && value !== null) {
      params.push(paramName + "=" + quoteParamValue2(value));
    }
  };
  class ConnectionParameters3 {
    constructor(config2) {
      config2 = typeof config2 === "string" ? parse2(config2) : config2 || {};
      if (config2.connectionString) {
        config2 = Object.assign({}, config2, parse2(config2.connectionString));
      }
      this.user = val2("user", config2);
      this.database = val2("database", config2);
      if (this.database === void 0) {
        this.database = this.user;
      }
      this.port = parseInt(val2("port", config2), 10);
      this.host = val2("host", config2);
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: val2("password", config2)
      });
      this.binary = val2("binary", config2);
      this.options = val2("options", config2);
      this.ssl = typeof config2.ssl === "undefined" ? readSSLConfigFromEnvironment2() : config2.ssl;
      if (typeof this.ssl === "string") {
        if (this.ssl === "true") {
          this.ssl = true;
        }
      }
      if (this.ssl === "no-verify") {
        this.ssl = { rejectUnauthorized: false };
      }
      if (this.ssl && this.ssl.key) {
        Object.defineProperty(this.ssl, "key", {
          enumerable: false
        });
      }
      this.client_encoding = val2("client_encoding", config2);
      this.replication = val2("replication", config2);
      this.isDomainSocket = !(this.host || "").indexOf("/");
      this.application_name = val2("application_name", config2, "PGAPPNAME");
      this.fallback_application_name = val2("fallback_application_name", config2, false);
      this.statement_timeout = val2("statement_timeout", config2, false);
      this.lock_timeout = val2("lock_timeout", config2, false);
      this.idle_in_transaction_session_timeout = val2("idle_in_transaction_session_timeout", config2, false);
      this.query_timeout = val2("query_timeout", config2, false);
      if (config2.connectionTimeoutMillis === void 0) {
        this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
      } else {
        this.connect_timeout = Math.floor(config2.connectionTimeoutMillis / 1e3);
      }
      if (config2.keepAlive === false) {
        this.keepalives = 0;
      } else if (config2.keepAlive === true) {
        this.keepalives = 1;
      }
      if (typeof config2.keepAliveInitialDelayMillis === "number") {
        this.keepalives_idle = Math.floor(config2.keepAliveInitialDelayMillis / 1e3);
      }
    }
    getLibpqConnectionString(cb) {
      var params = [];
      add2(params, this, "user");
      add2(params, this, "password");
      add2(params, this, "port");
      add2(params, this, "application_name");
      add2(params, this, "fallback_application_name");
      add2(params, this, "connect_timeout");
      add2(params, this, "options");
      var ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
      add2(params, ssl, "sslmode");
      add2(params, ssl, "sslca");
      add2(params, ssl, "sslkey");
      add2(params, ssl, "sslcert");
      add2(params, ssl, "sslrootcert");
      if (this.database) {
        params.push("dbname=" + quoteParamValue2(this.database));
      }
      if (this.replication) {
        params.push("replication=" + quoteParamValue2(this.replication));
      }
      if (this.host) {
        params.push("host=" + quoteParamValue2(this.host));
      }
      if (this.isDomainSocket) {
        return cb(null, params.join(" "));
      }
      if (this.client_encoding) {
        params.push("client_encoding=" + quoteParamValue2(this.client_encoding));
      }
      dns2.lookup(this.host, function(err, address) {
        if (err) return cb(err, null);
        params.push("hostaddr=" + quoteParamValue2(address));
        return cb(null, params.join(" "));
      });
    }
  }
  connectionParameters = ConnectionParameters3;
  return connectionParameters;
}
var result;
var hasRequiredResult;
function requireResult() {
  if (hasRequiredResult) return result;
  hasRequiredResult = 1;
  var types2 = requirePgTypes$1();
  var matchRegexp2 = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
  class Result3 {
    constructor(rowMode, types3) {
      this.command = null;
      this.rowCount = null;
      this.oid = null;
      this.rows = [];
      this.fields = [];
      this._parsers = void 0;
      this._types = types3;
      this.RowCtor = null;
      this.rowAsArray = rowMode === "array";
      if (this.rowAsArray) {
        this.parseRow = this._parseRowAsArray;
      }
      this._prebuiltEmptyResultObject = null;
    }
    // adds a command complete message
    addCommandComplete(msg) {
      var match;
      if (msg.text) {
        match = matchRegexp2.exec(msg.text);
      } else {
        match = matchRegexp2.exec(msg.command);
      }
      if (match) {
        this.command = match[1];
        if (match[3]) {
          this.oid = parseInt(match[2], 10);
          this.rowCount = parseInt(match[3], 10);
        } else if (match[2]) {
          this.rowCount = parseInt(match[2], 10);
        }
      }
    }
    _parseRowAsArray(rowData) {
      var row = new Array(rowData.length);
      for (var i = 0, len = rowData.length; i < len; i++) {
        var rawValue = rowData[i];
        if (rawValue !== null) {
          row[i] = this._parsers[i](rawValue);
        } else {
          row[i] = null;
        }
      }
      return row;
    }
    parseRow(rowData) {
      var row = { ...this._prebuiltEmptyResultObject };
      for (var i = 0, len = rowData.length; i < len; i++) {
        var rawValue = rowData[i];
        var field = this.fields[i].name;
        if (rawValue !== null) {
          row[field] = this._parsers[i](rawValue);
        } else {
          row[field] = null;
        }
      }
      return row;
    }
    addRow(row) {
      this.rows.push(row);
    }
    addFields(fieldDescriptions) {
      this.fields = fieldDescriptions;
      if (this.fields.length) {
        this._parsers = new Array(fieldDescriptions.length);
      }
      var row = {};
      for (var i = 0; i < fieldDescriptions.length; i++) {
        var desc = fieldDescriptions[i];
        row[desc.name] = null;
        if (this._types) {
          this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
        } else {
          this._parsers[i] = types2.getTypeParser(desc.dataTypeID, desc.format || "text");
        }
      }
      this._prebuiltEmptyResultObject = { ...row };
    }
  }
  result = Result3;
  return result;
}
var query$2;
var hasRequiredQuery$2;
function requireQuery$2() {
  if (hasRequiredQuery$2) return query$2;
  hasRequiredQuery$2 = 1;
  const { EventEmitter: EventEmitter2 } = require$$0$4;
  const Result3 = requireResult();
  const utils2 = requireUtils$1();
  class Query3 extends EventEmitter2 {
    constructor(config2, values, callback) {
      super();
      config2 = utils2.normalizeQueryConfig(config2, values, callback);
      this.text = config2.text;
      this.values = config2.values;
      this.rows = config2.rows;
      this.types = config2.types;
      this.name = config2.name;
      this.queryMode = config2.queryMode;
      this.binary = config2.binary;
      this.portal = config2.portal || "";
      this.callback = config2.callback;
      this._rowMode = config2.rowMode;
      if (process.domain && config2.callback) {
        this.callback = process.domain.bind(config2.callback);
      }
      this._result = new Result3(this._rowMode, this.types);
      this._results = this._result;
      this._canceledDueToError = false;
    }
    requiresPreparation() {
      if (this.queryMode === "extended") {
        return true;
      }
      if (this.name) {
        return true;
      }
      if (this.rows) {
        return true;
      }
      if (!this.text) {
        return false;
      }
      if (!this.values) {
        return false;
      }
      return this.values.length > 0;
    }
    _checkForMultirow() {
      if (this._result.command) {
        if (!Array.isArray(this._results)) {
          this._results = [this._result];
        }
        this._result = new Result3(this._rowMode, this._result._types);
        this._results.push(this._result);
      }
    }
    // associates row metadata from the supplied
    // message with this query object
    // metadata used when parsing row results
    handleRowDescription(msg) {
      this._checkForMultirow();
      this._result.addFields(msg.fields);
      this._accumulateRows = this.callback || !this.listeners("row").length;
    }
    handleDataRow(msg) {
      let row;
      if (this._canceledDueToError) {
        return;
      }
      try {
        row = this._result.parseRow(msg.fields);
      } catch (err) {
        this._canceledDueToError = err;
        return;
      }
      this.emit("row", row, this._result);
      if (this._accumulateRows) {
        this._result.addRow(row);
      }
    }
    handleCommandComplete(msg, connection2) {
      this._checkForMultirow();
      this._result.addCommandComplete(msg);
      if (this.rows) {
        connection2.sync();
      }
    }
    // if a named prepared statement is created with empty query text
    // the backend will send an emptyQuery message but *not* a command complete message
    // since we pipeline sync immediately after execute we don't need to do anything here
    // unless we have rows specified, in which case we did not pipeline the intial sync call
    handleEmptyQuery(connection2) {
      if (this.rows) {
        connection2.sync();
      }
    }
    handleError(err, connection2) {
      if (this._canceledDueToError) {
        err = this._canceledDueToError;
        this._canceledDueToError = false;
      }
      if (this.callback) {
        return this.callback(err);
      }
      this.emit("error", err);
    }
    handleReadyForQuery(con) {
      if (this._canceledDueToError) {
        return this.handleError(this._canceledDueToError, con);
      }
      if (this.callback) {
        try {
          this.callback(null, this._results);
        } catch (err) {
          process.nextTick(() => {
            throw err;
          });
        }
      }
      this.emit("end", this._results);
    }
    submit(connection2) {
      if (typeof this.text !== "string" && typeof this.name !== "string") {
        return new Error("A query must have either text or a name. Supplying neither is unsupported.");
      }
      const previous = connection2.parsedStatements[this.name];
      if (this.text && previous && this.text !== previous) {
        return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
      }
      if (this.values && !Array.isArray(this.values)) {
        return new Error("Query values must be an array");
      }
      if (this.requiresPreparation()) {
        this.prepare(connection2);
      } else {
        connection2.query(this.text);
      }
      return null;
    }
    hasBeenParsed(connection2) {
      return this.name && connection2.parsedStatements[this.name];
    }
    handlePortalSuspended(connection2) {
      this._getRows(connection2, this.rows);
    }
    _getRows(connection2, rows) {
      connection2.execute({
        portal: this.portal,
        rows
      });
      if (!rows) {
        connection2.sync();
      } else {
        connection2.flush();
      }
    }
    // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
    prepare(connection2) {
      if (!this.hasBeenParsed(connection2)) {
        connection2.parse({
          text: this.text,
          name: this.name,
          types: this.types
        });
      }
      try {
        connection2.bind({
          portal: this.portal,
          statement: this.name,
          values: this.values,
          binary: this.binary,
          valueMapper: utils2.prepareValue
        });
      } catch (err) {
        this.handleError(err, connection2);
        return;
      }
      connection2.describe({
        type: "P",
        name: this.portal || ""
      });
      this._getRows(connection2, this.rows);
    }
    handleCopyInResponse(connection2) {
      connection2.sendCopyFail("No source stream defined");
    }
    // eslint-disable-next-line no-unused-vars
    handleCopyData(msg, connection2) {
    }
  }
  query$2 = Query3;
  return query$2;
}
var stream;
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream) return stream;
  hasRequiredStream = 1;
  const { getStream: getStream2, getSecureStream: getSecureStream2 } = getStreamFuncs2();
  stream = {
    /**
     * Get a socket stream compatible with the current runtime environment.
     * @returns {Duplex}
     */
    getStream: getStream2,
    /**
     * Get a TLS secured socket, compatible with the current environment,
     * using the socket and other settings given in `options`.
     * @returns {Duplex}
     */
    getSecureStream: getSecureStream2
  };
  function getNodejsStreamFuncs2() {
    function getStream3(ssl) {
      const net = require$$0$5;
      return new net.Socket();
    }
    function getSecureStream3(options) {
      var tls = require$$1;
      return tls.connect(options);
    }
    return {
      getStream: getStream3,
      getSecureStream: getSecureStream3
    };
  }
  function getCloudflareStreamFuncs2() {
    function getStream3(ssl) {
      const { CloudflareSocket } = require$$2;
      return new CloudflareSocket(ssl);
    }
    function getSecureStream3(options) {
      options.socket.startTls(options);
      return options.socket;
    }
    return {
      getStream: getStream3,
      getSecureStream: getSecureStream3
    };
  }
  function isCloudflareRuntime2() {
    if (typeof navigator === "object" && navigator !== null && typeof navigator.userAgent === "string") {
      return navigator.userAgent === "Cloudflare-Workers";
    }
    if (typeof Response === "function") {
      const resp = new Response(null, { cf: { thing: true } });
      if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
        return true;
      }
    }
    return false;
  }
  function getStreamFuncs2() {
    if (isCloudflareRuntime2()) {
      return getCloudflareStreamFuncs2();
    }
    return getNodejsStreamFuncs2();
  }
  return stream;
}
var connection;
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection) return connection;
  hasRequiredConnection = 1;
  var EventEmitter2 = require$$0$4.EventEmitter;
  const { parse: parse2, serialize: serialize2 } = dist;
  const { getStream: getStream2, getSecureStream: getSecureStream2 } = requireStream();
  const flushBuffer2 = serialize2.flush();
  const syncBuffer2 = serialize2.sync();
  const endBuffer2 = serialize2.end();
  class Connection3 extends EventEmitter2 {
    constructor(config2) {
      super();
      config2 = config2 || {};
      this.stream = config2.stream || getStream2(config2.ssl);
      if (typeof this.stream === "function") {
        this.stream = this.stream(config2);
      }
      this._keepAlive = config2.keepAlive;
      this._keepAliveInitialDelayMillis = config2.keepAliveInitialDelayMillis;
      this.lastBuffer = false;
      this.parsedStatements = {};
      this.ssl = config2.ssl || false;
      this._ending = false;
      this._emitMessage = false;
      var self2 = this;
      this.on("newListener", function(eventName) {
        if (eventName === "message") {
          self2._emitMessage = true;
        }
      });
    }
    connect(port, host) {
      var self2 = this;
      this._connecting = true;
      this.stream.setNoDelay(true);
      this.stream.connect(port, host);
      this.stream.once("connect", function() {
        if (self2._keepAlive) {
          self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
        }
        self2.emit("connect");
      });
      const reportStreamError = function(error) {
        if (self2._ending && (error.code === "ECONNRESET" || error.code === "EPIPE")) {
          return;
        }
        self2.emit("error", error);
      };
      this.stream.on("error", reportStreamError);
      this.stream.on("close", function() {
        self2.emit("end");
      });
      if (!this.ssl) {
        return this.attachListeners(this.stream);
      }
      this.stream.once("data", function(buffer) {
        var responseCode = buffer.toString("utf8");
        switch (responseCode) {
          case "S":
            break;
          case "N":
            self2.stream.end();
            return self2.emit("error", new Error("The server does not support SSL connections"));
          default:
            self2.stream.end();
            return self2.emit("error", new Error("There was an error establishing an SSL connection"));
        }
        const options = {
          socket: self2.stream
        };
        if (self2.ssl !== true) {
          Object.assign(options, self2.ssl);
          if ("key" in self2.ssl) {
            options.key = self2.ssl.key;
          }
        }
        var net = require$$0$5;
        if (net.isIP && net.isIP(host) === 0) {
          options.servername = host;
        }
        try {
          self2.stream = getSecureStream2(options);
        } catch (err) {
          return self2.emit("error", err);
        }
        self2.attachListeners(self2.stream);
        self2.stream.on("error", reportStreamError);
        self2.emit("sslconnect");
      });
    }
    attachListeners(stream2) {
      parse2(stream2, (msg) => {
        var eventName = msg.name === "error" ? "errorMessage" : msg.name;
        if (this._emitMessage) {
          this.emit("message", msg);
        }
        this.emit(eventName, msg);
      });
    }
    requestSsl() {
      this.stream.write(serialize2.requestSsl());
    }
    startup(config2) {
      this.stream.write(serialize2.startup(config2));
    }
    cancel(processID, secretKey) {
      this._send(serialize2.cancel(processID, secretKey));
    }
    password(password2) {
      this._send(serialize2.password(password2));
    }
    sendSASLInitialResponseMessage(mechanism, initialResponse) {
      this._send(serialize2.sendSASLInitialResponseMessage(mechanism, initialResponse));
    }
    sendSCRAMClientFinalMessage(additionalData) {
      this._send(serialize2.sendSCRAMClientFinalMessage(additionalData));
    }
    _send(buffer) {
      if (!this.stream.writable) {
        return false;
      }
      return this.stream.write(buffer);
    }
    query(text) {
      this._send(serialize2.query(text));
    }
    // send parse message
    parse(query2) {
      this._send(serialize2.parse(query2));
    }
    // send bind message
    bind(config2) {
      this._send(serialize2.bind(config2));
    }
    // send execute message
    execute(config2) {
      this._send(serialize2.execute(config2));
    }
    flush() {
      if (this.stream.writable) {
        this.stream.write(flushBuffer2);
      }
    }
    sync() {
      this._ending = true;
      this._send(syncBuffer2);
    }
    ref() {
      this.stream.ref();
    }
    unref() {
      this.stream.unref();
    }
    end() {
      this._ending = true;
      if (!this._connecting || !this.stream.writable) {
        this.stream.end();
        return;
      }
      return this.stream.write(endBuffer2, () => {
        this.stream.end();
      });
    }
    close(msg) {
      this._send(serialize2.close(msg));
    }
    describe(msg) {
      this._send(serialize2.describe(msg));
    }
    sendCopyFromChunk(chunk) {
      this._send(serialize2.copyData(chunk));
    }
    endCopyFrom() {
      this._send(serialize2.copyDone());
    }
    sendCopyFail(msg) {
      this._send(serialize2.copyFail(msg));
    }
  }
  connection = Connection3;
  return connection;
}
var client$2;
var hasRequiredClient$2;
function requireClient$2() {
  if (hasRequiredClient$2) return client$2;
  hasRequiredClient$2 = 1;
  var EventEmitter2 = require$$0$4.EventEmitter;
  var utils2 = requireUtils$1();
  var sasl2 = requireSasl();
  var TypeOverrides2 = requireTypeOverrides();
  var ConnectionParameters3 = requireConnectionParameters();
  var Query3 = requireQuery$2();
  var defaults2 = requireDefaults();
  var Connection3 = requireConnection();
  const crypto2 = requireUtils();
  class Client2 extends EventEmitter2 {
    constructor(config2) {
      super();
      this.connectionParameters = new ConnectionParameters3(config2);
      this.user = this.connectionParameters.user;
      this.database = this.connectionParameters.database;
      this.port = this.connectionParameters.port;
      this.host = this.connectionParameters.host;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: this.connectionParameters.password
      });
      this.replication = this.connectionParameters.replication;
      var c = config2 || {};
      this._Promise = c.Promise || commonjsGlobal.Promise;
      this._types = new TypeOverrides2(c.types);
      this._ending = false;
      this._ended = false;
      this._connecting = false;
      this._connected = false;
      this._connectionError = false;
      this._queryable = true;
      this.connection = c.connection || new Connection3({
        stream: c.stream,
        ssl: this.connectionParameters.ssl,
        keepAlive: c.keepAlive || false,
        keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
        encoding: this.connectionParameters.client_encoding || "utf8"
      });
      this.queryQueue = [];
      this.binary = c.binary || defaults2.binary;
      this.processID = null;
      this.secretKey = null;
      this.ssl = this.connectionParameters.ssl || false;
      if (this.ssl && this.ssl.key) {
        Object.defineProperty(this.ssl, "key", {
          enumerable: false
        });
      }
      this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
    }
    _errorAllQueries(err) {
      const enqueueError = (query2) => {
        process.nextTick(() => {
          query2.handleError(err, this.connection);
        });
      };
      if (this.activeQuery) {
        enqueueError(this.activeQuery);
        this.activeQuery = null;
      }
      this.queryQueue.forEach(enqueueError);
      this.queryQueue.length = 0;
    }
    _connect(callback) {
      var self2 = this;
      var con = this.connection;
      this._connectionCallback = callback;
      if (this._connecting || this._connected) {
        const err = new Error("Client has already been connected. You cannot reuse a client.");
        process.nextTick(() => {
          callback(err);
        });
        return;
      }
      this._connecting = true;
      if (this._connectionTimeoutMillis > 0) {
        this.connectionTimeoutHandle = setTimeout(() => {
          con._ending = true;
          con.stream.destroy(new Error("timeout expired"));
        }, this._connectionTimeoutMillis);
      }
      if (this.host && this.host.indexOf("/") === 0) {
        con.connect(this.host + "/.s.PGSQL." + this.port);
      } else {
        con.connect(this.port, this.host);
      }
      con.on("connect", function() {
        if (self2.ssl) {
          con.requestSsl();
        } else {
          con.startup(self2.getStartupConf());
        }
      });
      con.on("sslconnect", function() {
        con.startup(self2.getStartupConf());
      });
      this._attachListeners(con);
      con.once("end", () => {
        const error = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
        clearTimeout(this.connectionTimeoutHandle);
        this._errorAllQueries(error);
        this._ended = true;
        if (!this._ending) {
          if (this._connecting && !this._connectionError) {
            if (this._connectionCallback) {
              this._connectionCallback(error);
            } else {
              this._handleErrorEvent(error);
            }
          } else if (!this._connectionError) {
            this._handleErrorEvent(error);
          }
        }
        process.nextTick(() => {
          this.emit("end");
        });
      });
    }
    connect(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
    _attachListeners(con) {
      con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
      con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
      con.on("authenticationSASL", this._handleAuthSASL.bind(this));
      con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
      con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
      con.on("backendKeyData", this._handleBackendKeyData.bind(this));
      con.on("error", this._handleErrorEvent.bind(this));
      con.on("errorMessage", this._handleErrorMessage.bind(this));
      con.on("readyForQuery", this._handleReadyForQuery.bind(this));
      con.on("notice", this._handleNotice.bind(this));
      con.on("rowDescription", this._handleRowDescription.bind(this));
      con.on("dataRow", this._handleDataRow.bind(this));
      con.on("portalSuspended", this._handlePortalSuspended.bind(this));
      con.on("emptyQuery", this._handleEmptyQuery.bind(this));
      con.on("commandComplete", this._handleCommandComplete.bind(this));
      con.on("parseComplete", this._handleParseComplete.bind(this));
      con.on("copyInResponse", this._handleCopyInResponse.bind(this));
      con.on("copyData", this._handleCopyData.bind(this));
      con.on("notification", this._handleNotification.bind(this));
    }
    // TODO(bmc): deprecate pgpass "built in" integration since this.password can be a function
    // it can be supplied by the user if required - this is a breaking change!
    _checkPgPass(cb) {
      const con = this.connection;
      if (typeof this.password === "function") {
        this._Promise.resolve().then(() => this.password()).then((pass) => {
          if (pass !== void 0) {
            if (typeof pass !== "string") {
              con.emit("error", new TypeError("Password must be a string"));
              return;
            }
            this.connectionParameters.password = this.password = pass;
          } else {
            this.connectionParameters.password = this.password = null;
          }
          cb();
        }).catch((err) => {
          con.emit("error", err);
        });
      } else if (this.password !== null) {
        cb();
      } else {
        try {
          const pgPass = requireLib$1();
          pgPass(this.connectionParameters, (pass) => {
            if (void 0 !== pass) {
              this.connectionParameters.password = this.password = pass;
            }
            cb();
          });
        } catch (e) {
          this.emit("error", e);
        }
      }
    }
    _handleAuthCleartextPassword(msg) {
      this._checkPgPass(() => {
        this.connection.password(this.password);
      });
    }
    _handleAuthMD5Password(msg) {
      this._checkPgPass(async () => {
        try {
          const hashedPassword = await crypto2.postgresMd5PasswordHash(this.user, this.password, msg.salt);
          this.connection.password(hashedPassword);
        } catch (e) {
          this.emit("error", e);
        }
      });
    }
    _handleAuthSASL(msg) {
      this._checkPgPass(() => {
        try {
          this.saslSession = sasl2.startSession(msg.mechanisms);
          this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      });
    }
    async _handleAuthSASLContinue(msg) {
      try {
        await sasl2.continueSession(this.saslSession, this.password, msg.data);
        this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
      } catch (err) {
        this.connection.emit("error", err);
      }
    }
    _handleAuthSASLFinal(msg) {
      try {
        sasl2.finalizeSession(this.saslSession, msg.data);
        this.saslSession = null;
      } catch (err) {
        this.connection.emit("error", err);
      }
    }
    _handleBackendKeyData(msg) {
      this.processID = msg.processID;
      this.secretKey = msg.secretKey;
    }
    _handleReadyForQuery(msg) {
      if (this._connecting) {
        this._connecting = false;
        this._connected = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          this._connectionCallback(null, this);
          this._connectionCallback = null;
        }
        this.emit("connect");
      }
      const { activeQuery } = this;
      this.activeQuery = null;
      this.readyForQuery = true;
      if (activeQuery) {
        activeQuery.handleReadyForQuery(this.connection);
      }
      this._pulseQueryQueue();
    }
    // if we receieve an error event or error message
    // during the connection process we handle it here
    _handleErrorWhileConnecting(err) {
      if (this._connectionError) {
        return;
      }
      this._connectionError = true;
      clearTimeout(this.connectionTimeoutHandle);
      if (this._connectionCallback) {
        return this._connectionCallback(err);
      }
      this.emit("error", err);
    }
    // if we're connected and we receive an error event from the connection
    // this means the socket is dead - do a hard abort of all queries and emit
    // the socket error on the client as well
    _handleErrorEvent(err) {
      if (this._connecting) {
        return this._handleErrorWhileConnecting(err);
      }
      this._queryable = false;
      this._errorAllQueries(err);
      this.emit("error", err);
    }
    // handle error messages from the postgres backend
    _handleErrorMessage(msg) {
      if (this._connecting) {
        return this._handleErrorWhileConnecting(msg);
      }
      const activeQuery = this.activeQuery;
      if (!activeQuery) {
        this._handleErrorEvent(msg);
        return;
      }
      this.activeQuery = null;
      activeQuery.handleError(msg, this.connection);
    }
    _handleRowDescription(msg) {
      this.activeQuery.handleRowDescription(msg);
    }
    _handleDataRow(msg) {
      this.activeQuery.handleDataRow(msg);
    }
    _handlePortalSuspended(msg) {
      this.activeQuery.handlePortalSuspended(this.connection);
    }
    _handleEmptyQuery(msg) {
      this.activeQuery.handleEmptyQuery(this.connection);
    }
    _handleCommandComplete(msg) {
      if (this.activeQuery == null) {
        const error = new Error("Received unexpected commandComplete message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      this.activeQuery.handleCommandComplete(msg, this.connection);
    }
    _handleParseComplete() {
      if (this.activeQuery == null) {
        const error = new Error("Received unexpected parseComplete message from backend.");
        this._handleErrorEvent(error);
        return;
      }
      if (this.activeQuery.name) {
        this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text;
      }
    }
    _handleCopyInResponse(msg) {
      this.activeQuery.handleCopyInResponse(this.connection);
    }
    _handleCopyData(msg) {
      this.activeQuery.handleCopyData(msg, this.connection);
    }
    _handleNotification(msg) {
      this.emit("notification", msg);
    }
    _handleNotice(msg) {
      this.emit("notice", msg);
    }
    getStartupConf() {
      var params = this.connectionParameters;
      var data = {
        user: params.user,
        database: params.database
      };
      var appName = params.application_name || params.fallback_application_name;
      if (appName) {
        data.application_name = appName;
      }
      if (params.replication) {
        data.replication = "" + params.replication;
      }
      if (params.statement_timeout) {
        data.statement_timeout = String(parseInt(params.statement_timeout, 10));
      }
      if (params.lock_timeout) {
        data.lock_timeout = String(parseInt(params.lock_timeout, 10));
      }
      if (params.idle_in_transaction_session_timeout) {
        data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
      }
      if (params.options) {
        data.options = params.options;
      }
      return data;
    }
    cancel(client2, query2) {
      if (client2.activeQuery === query2) {
        var con = this.connection;
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          con.cancel(client2.processID, client2.secretKey);
        });
      } else if (client2.queryQueue.indexOf(query2) !== -1) {
        client2.queryQueue.splice(client2.queryQueue.indexOf(query2), 1);
      }
    }
    setTypeParser(oid, format, parseFn) {
      return this._types.setTypeParser(oid, format, parseFn);
    }
    getTypeParser(oid, format) {
      return this._types.getTypeParser(oid, format);
    }
    // escapeIdentifier and escapeLiteral moved to utility functions & exported
    // on PG
    // re-exported here for backwards compatibility
    escapeIdentifier(str) {
      return utils2.escapeIdentifier(str);
    }
    escapeLiteral(str) {
      return utils2.escapeLiteral(str);
    }
    _pulseQueryQueue() {
      if (this.readyForQuery === true) {
        this.activeQuery = this.queryQueue.shift();
        if (this.activeQuery) {
          this.readyForQuery = false;
          this.hasExecuted = true;
          const queryError = this.activeQuery.submit(this.connection);
          if (queryError) {
            process.nextTick(() => {
              this.activeQuery.handleError(queryError, this.connection);
              this.readyForQuery = true;
              this._pulseQueryQueue();
            });
          }
        } else if (this.hasExecuted) {
          this.activeQuery = null;
          this.emit("drain");
        }
      }
    }
    query(config2, values, callback) {
      var query2;
      var result2;
      var readTimeout;
      var readTimeoutTimer;
      var queryCallback;
      if (config2 === null || config2 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config2.submit === "function") {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        result2 = query2 = config2;
        if (typeof values === "function") {
          query2.callback = query2.callback || values;
        }
      } else {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        query2 = new Query3(config2, values, callback);
        if (!query2.callback) {
          result2 = new this._Promise((resolve, reject) => {
            query2.callback = (err, res) => err ? reject(err) : resolve(res);
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
        }
      }
      if (readTimeout) {
        queryCallback = query2.callback;
        readTimeoutTimer = setTimeout(() => {
          var error = new Error("Query read timeout");
          process.nextTick(() => {
            query2.handleError(error, this.connection);
          });
          queryCallback(error);
          query2.callback = () => {
          };
          var index = this.queryQueue.indexOf(query2);
          if (index > -1) {
            this.queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query2.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (this.binary && !query2.binary) {
        query2.binary = true;
      }
      if (query2._result && !query2._result._types) {
        query2._result._types = this._types;
      }
      if (!this._queryable) {
        process.nextTick(() => {
          query2.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
        });
        return result2;
      }
      if (this._ending) {
        process.nextTick(() => {
          query2.handleError(new Error("Client was closed and is not queryable"), this.connection);
        });
        return result2;
      }
      this.queryQueue.push(query2);
      this._pulseQueryQueue();
      return result2;
    }
    ref() {
      this.connection.ref();
    }
    unref() {
      this.connection.unref();
    }
    end(cb) {
      this._ending = true;
      if (!this.connection._connecting || this._ended) {
        if (cb) {
          cb();
        } else {
          return this._Promise.resolve();
        }
      }
      if (this.activeQuery || !this._queryable) {
        this.connection.stream.destroy();
      } else {
        this.connection.end();
      }
      if (cb) {
        this.connection.once("end", cb);
      } else {
        return new this._Promise((resolve) => {
          this.connection.once("end", resolve);
        });
      }
    }
  }
  Client2.Query = Query3;
  client$2 = Client2;
  return client$2;
}
var client$1 = { exports: {} };
var pgNative = { exports: {} };
var libpq = { exports: {} };
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bindings = { exports: {} };
var fileUriToPath_1;
var hasRequiredFileUriToPath;
function requireFileUriToPath() {
  if (hasRequiredFileUriToPath) return fileUriToPath_1;
  hasRequiredFileUriToPath = 1;
  var sep = require$$0$1.sep || "/";
  fileUriToPath_1 = fileUriToPath;
  function fileUriToPath(uri) {
    if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
      throw new TypeError("must pass in a file:// URI to convert to a file path");
    }
    var rest = decodeURI(uri.substring(7));
    var firstSlash = rest.indexOf("/");
    var host = rest.substring(0, firstSlash);
    var path2 = rest.substring(firstSlash + 1);
    if ("localhost" == host) host = "";
    if (host) {
      host = sep + sep + host;
    }
    path2 = path2.replace(/^(.+)\|/, "$1:");
    if (sep == "\\") {
      path2 = path2.replace(/\//g, "\\");
    }
    if (/^.+\:/.test(path2)) ;
    else {
      path2 = sep + path2;
    }
    return host + path2;
  }
  return fileUriToPath_1;
}
var hasRequiredBindings;
function requireBindings() {
  if (hasRequiredBindings) return bindings.exports;
  hasRequiredBindings = 1;
  (function(module, exports2) {
    var fs2 = require$$0, path2 = require$$0$1, fileURLToPath2 = requireFileUriToPath(), join = path2.join, dirname = path2.dirname, exists = fs2.accessSync && function(path22) {
      try {
        fs2.accessSync(path22);
      } catch (e) {
        return false;
      }
      return true;
    } || fs2.existsSync || path2.existsSync, defaults2 = {
      arrow: process.env.NODE_BINDINGS_ARROW || " → ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings2(opts) {
      if (typeof opts == "string") {
        opts = { bindings: opts };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults2).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults2[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports2.getRoot(exports2.getFileName());
      }
      if (path2.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : commonjsRequire;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join.apply(
          null,
          opts.try[i].map(function(p) {
            return opts[p] || p;
          })
        );
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error(
        "Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
          return opts.arrow + a;
        }).join("\n")
      );
      err.tries = tries;
      throw err;
    }
    module.exports = exports2 = bindings2;
    exports2.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath2(fileName);
      }
      return fileName;
    };
    exports2.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists(join(dir, "package.json")) || exists(join(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error(
            'Could not find module root given file: "' + file + '". Do you have a `package.json` file? '
          );
        }
        prev = dir;
        dir = join(dir, "..");
      }
    };
  })(bindings, bindings.exports);
  return bindings.exports;
}
var hasRequiredLibpq;
function requireLibpq() {
  if (hasRequiredLibpq) return libpq.exports;
  hasRequiredLibpq = 1;
  (function(module) {
    var PQ = module.exports = requireBindings()("addon.node").PQ;
    var assert = require$$1$3;
    if (!module.parent) {
      var path2 = require$$0$1;
      console.log(path2.normalize(__dirname + "/src"));
    }
    var EventEmitter2 = require$$0$4.EventEmitter;
    var assert = require$$1$3;
    for (var key in EventEmitter2.prototype) {
      PQ.prototype[key] = EventEmitter2.prototype[key];
    }
    PQ.prototype.connectSync = function(paramString) {
      this.connected = true;
      if (!paramString) {
        paramString = "";
      }
      var connected = this.$connectSync(paramString);
      if (!connected) {
        var err = new Error(this.errorMessage());
        this.finish();
        throw err;
      }
    };
    PQ.prototype.connect = function(paramString, cb) {
      this.connected = true;
      if (typeof paramString == "function") {
        cb = paramString;
        paramString = "";
      }
      if (!paramString) {
        paramString = "";
      }
      assert(cb, "Must provide a connection callback");
      if (process.domain) {
        cb = process.domain.bind(cb);
      }
      this.$connect(paramString, cb);
    };
    PQ.prototype.errorMessage = function() {
      return this.$getLastErrorMessage();
    };
    PQ.prototype.socket = function() {
      return this.$socket();
    };
    PQ.prototype.serverVersion = function() {
      return this.$serverVersion();
    };
    PQ.prototype.finish = function() {
      this.connected = false;
      this.$finish();
    };
    PQ.prototype.exec = function(commandText) {
      if (!commandText) {
        commandText = "";
      }
      this.$exec(commandText);
    };
    PQ.prototype.execParams = function(commandText, parameters) {
      if (!commandText) {
        commandText = "";
      }
      if (!parameters) {
        parameters = [];
      }
      assert(Array.isArray(parameters), "Parameters must be an array");
      this.$execParams(commandText, parameters);
    };
    PQ.prototype.prepare = function(statementName, commandText, nParams) {
      assert.equal(arguments.length, 3, "Must supply 3 arguments");
      if (!statementName) {
        statementName = "";
      }
      if (!commandText) {
        commandText = "";
      }
      nParams = Number(nParams) || 0;
      this.$prepare(statementName, commandText, nParams);
    };
    PQ.prototype.execPrepared = function(statementName, parameters) {
      if (!statementName) {
        statementName = "";
      }
      if (!parameters) {
        parameters = [];
      }
      assert(Array.isArray(parameters), "Parameters must be an array");
      this.$execPrepared(statementName, parameters);
    };
    PQ.prototype.sendQuery = function(commandText) {
      if (!commandText) {
        commandText = "";
      }
      return this.$sendQuery(commandText);
    };
    PQ.prototype.sendQueryParams = function(commandText, parameters) {
      if (!commandText) {
        commandText = "";
      }
      if (!parameters) {
        parameters = [];
      }
      assert(Array.isArray(parameters), "Parameters must be an array");
      return this.$sendQueryParams(commandText, parameters);
    };
    PQ.prototype.sendPrepare = function(statementName, commandText, nParams) {
      assert.equal(arguments.length, 3, "Must supply 3 arguments");
      if (!statementName) {
        statementName = "";
      }
      if (!commandText) {
        commandText = "";
      }
      nParams = Number(nParams) || 0;
      return this.$sendPrepare(statementName, commandText, nParams);
    };
    PQ.prototype.sendQueryPrepared = function(statementName, parameters) {
      if (!statementName) {
        statementName = "";
      }
      if (!parameters) {
        parameters = [];
      }
      assert(Array.isArray(parameters), "Parameters must be an array");
      return this.$sendQueryPrepared(statementName, parameters);
    };
    PQ.prototype.getResult = function() {
      return this.$getResult();
    };
    PQ.prototype.resultStatus = function() {
      return this.$resultStatus();
    };
    PQ.prototype.resultErrorMessage = function() {
      return this.$resultErrorMessage();
    };
    PQ.prototype.resultErrorFields = function() {
      return this.$resultErrorFields();
    };
    PQ.prototype.clear = function() {
      this.$clear();
    };
    PQ.prototype.ntuples = function() {
      return this.$ntuples();
    };
    PQ.prototype.nfields = function() {
      return this.$nfields();
    };
    PQ.prototype.fname = function(offset) {
      return this.$fname(offset);
    };
    PQ.prototype.ftype = function(offset) {
      return this.$ftype(offset);
    };
    PQ.prototype.getvalue = function(row, col) {
      return this.$getvalue(row, col);
    };
    PQ.prototype.getisnull = function(row, col) {
      return this.$getisnull(row, col);
    };
    PQ.prototype.cmdStatus = function() {
      return this.$cmdStatus();
    };
    PQ.prototype.cmdTuples = function() {
      return this.$cmdTuples();
    };
    PQ.prototype.startReader = function() {
      assert(this.connected, "Must be connected to start reader");
      this.$startRead();
    };
    PQ.prototype.stopReader = function() {
      this.$stopRead();
    };
    PQ.prototype.writable = function(cb) {
      assert(this.connected, "Must be connected to start writer");
      this.$startWrite();
      return this.once("writable", cb);
    };
    PQ.prototype.consumeInput = function() {
      return this.$consumeInput();
    };
    PQ.prototype.isBusy = function() {
      return this.$isBusy();
    };
    PQ.prototype.setNonBlocking = function(truthy) {
      return this.$setNonBlocking(truthy ? 1 : 0);
    };
    PQ.prototype.isNonBlocking = function() {
      return this.$isNonBlocking();
    };
    PQ.prototype.flush = function() {
      return this.$flush();
    };
    PQ.prototype.escapeLiteral = function(input) {
      if (!input) return input;
      return this.$escapeLiteral(input);
    };
    PQ.prototype.escapeIdentifier = function(input) {
      if (!input) return input;
      return this.$escapeIdentifier(input);
    };
    PQ.prototype.notifies = function() {
      return this.$notifies();
    };
    PQ.prototype.putCopyData = function(buffer) {
      assert(buffer instanceof Buffer);
      return this.$putCopyData(buffer);
    };
    PQ.prototype.putCopyEnd = function(errorMessage) {
      if (errorMessage) {
        return this.$putCopyEnd(errorMessage);
      }
      return this.$putCopyEnd();
    };
    PQ.prototype.getCopyData = function(async) {
      return this.$getCopyData(!!async);
    };
    PQ.prototype.cancel = function() {
      return this.$cancel();
    };
  })(libpq);
  return libpq.exports;
}
var pgTypes = {};
var postgresArray = {};
var hasRequiredPostgresArray;
function requirePostgresArray() {
  if (hasRequiredPostgresArray) return postgresArray;
  hasRequiredPostgresArray = 1;
  postgresArray.parse = function(source, transform) {
    return new ArrayParser(source, transform).parse();
  };
  function ArrayParser(source, transform) {
    this.source = source;
    this.transform = transform || identity;
    this.position = 0;
    this.entries = [];
    this.recorded = [];
    this.dimension = 0;
  }
  ArrayParser.prototype.isEof = function() {
    return this.position >= this.source.length;
  };
  ArrayParser.prototype.nextCharacter = function() {
    var character = this.source[this.position++];
    if (character === "\\") {
      return {
        value: this.source[this.position++],
        escaped: true
      };
    }
    return {
      value: character,
      escaped: false
    };
  };
  ArrayParser.prototype.record = function(character) {
    this.recorded.push(character);
  };
  ArrayParser.prototype.newEntry = function(includeEmpty) {
    var entry;
    if (this.recorded.length > 0 || includeEmpty) {
      entry = this.recorded.join("");
      if (entry === "NULL" && !includeEmpty) {
        entry = null;
      }
      if (entry !== null) entry = this.transform(entry);
      this.entries.push(entry);
      this.recorded = [];
    }
  };
  ArrayParser.prototype.parse = function(nested) {
    var character, parser2, quote;
    while (!this.isEof()) {
      character = this.nextCharacter();
      if (character.value === "{" && !quote) {
        this.dimension++;
        if (this.dimension > 1) {
          parser2 = new ArrayParser(this.source.substr(this.position - 1), this.transform);
          this.entries.push(parser2.parse(true));
          this.position += parser2.position - 2;
        }
      } else if (character.value === "}" && !quote) {
        this.dimension--;
        if (!this.dimension) {
          this.newEntry();
          if (nested) return this.entries;
        }
      } else if (character.value === '"' && !character.escaped) {
        if (quote) this.newEntry(true);
        quote = !quote;
      } else if (character.value === "," && !quote) {
        this.newEntry();
      } else {
        this.record(character.value);
      }
    }
    if (this.dimension !== 0) {
      throw new Error("array dimension not balanced");
    }
    return this.entries;
  };
  function identity(value) {
    return value;
  }
  return postgresArray;
}
var arrayParser;
var hasRequiredArrayParser;
function requireArrayParser() {
  if (hasRequiredArrayParser) return arrayParser;
  hasRequiredArrayParser = 1;
  var array = requirePostgresArray();
  arrayParser = {
    create: function(source, transform) {
      return {
        parse: function() {
          return array.parse(source, transform);
        }
      };
    }
  };
  return arrayParser;
}
var textParsers;
var hasRequiredTextParsers;
function requireTextParsers() {
  if (hasRequiredTextParsers) return textParsers;
  hasRequiredTextParsers = 1;
  var array = requirePostgresArray();
  var arrayParser2 = requireArrayParser();
  var parseDate = requirePostgresDate();
  var parseInterval = requirePostgresInterval();
  var parseByteA = requirePostgresBytea();
  function allowNull(fn) {
    return function nullAllowed(value) {
      if (value === null) return value;
      return fn(value);
    };
  }
  function parseBool(value) {
    if (value === null) return value;
    return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
  }
  function parseBoolArray(value) {
    if (!value) return null;
    return array.parse(value, parseBool);
  }
  function parseBaseTenInt(string) {
    return parseInt(string, 10);
  }
  function parseIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(parseBaseTenInt));
  }
  function parseBigIntegerArray(value) {
    if (!value) return null;
    return array.parse(value, allowNull(function(entry) {
      return parseBigInteger(entry).trim();
    }));
  }
  var parsePointArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parsePoint(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseFloatArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parseFloat(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseStringArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value);
    return p.parse();
  };
  var parseDateArray = function(value) {
    if (!value) {
      return null;
    }
    var p = arrayParser2.create(value, function(entry) {
      if (entry !== null) {
        entry = parseDate(entry);
      }
      return entry;
    });
    return p.parse();
  };
  var parseByteAArray = function(value) {
    if (!value) {
      return null;
    }
    return array.parse(value, allowNull(parseByteA));
  };
  var parseInteger = function(value) {
    return parseInt(value, 10);
  };
  var parseBigInteger = function(value) {
    var valStr = String(value);
    if (/^\d+$/.test(valStr)) {
      return valStr;
    }
    return value;
  };
  var parseJsonArray = function(value) {
    var arr = parseStringArray(value);
    if (!arr) {
      return arr;
    }
    return arr.map(function(el) {
      return JSON.parse(el);
    });
  };
  var parsePoint = function(value) {
    if (value[0] !== "(") {
      return null;
    }
    value = value.substring(1, value.length - 1).split(",");
    return {
      x: parseFloat(value[0]),
      y: parseFloat(value[1])
    };
  };
  var parseCircle = function(value) {
    if (value[0] !== "<" && value[1] !== "(") {
      return null;
    }
    var point = "(";
    var radius = "";
    var pointParsed = false;
    for (var i = 2; i < value.length - 1; i++) {
      if (!pointParsed) {
        point += value[i];
      }
      if (value[i] === ")") {
        pointParsed = true;
        continue;
      } else if (!pointParsed) {
        continue;
      }
      if (value[i] === ",") {
        continue;
      }
      radius += value[i];
    }
    var result2 = parsePoint(point);
    result2.radius = parseFloat(radius);
    return result2;
  };
  var init = function(register) {
    register(20, parseBigInteger);
    register(21, parseInteger);
    register(23, parseInteger);
    register(26, parseInteger);
    register(700, parseFloat);
    register(701, parseFloat);
    register(16, parseBool);
    register(1082, parseDate);
    register(1114, parseDate);
    register(1184, parseDate);
    register(600, parsePoint);
    register(651, parseStringArray);
    register(718, parseCircle);
    register(1e3, parseBoolArray);
    register(1001, parseByteAArray);
    register(1005, parseIntegerArray);
    register(1007, parseIntegerArray);
    register(1028, parseIntegerArray);
    register(1016, parseBigIntegerArray);
    register(1017, parsePointArray);
    register(1021, parseFloatArray);
    register(1022, parseFloatArray);
    register(1231, parseFloatArray);
    register(1014, parseStringArray);
    register(1015, parseStringArray);
    register(1008, parseStringArray);
    register(1009, parseStringArray);
    register(1040, parseStringArray);
    register(1041, parseStringArray);
    register(1115, parseDateArray);
    register(1182, parseDateArray);
    register(1185, parseDateArray);
    register(1186, parseInterval);
    register(17, parseByteA);
    register(114, JSON.parse.bind(JSON));
    register(3802, JSON.parse.bind(JSON));
    register(199, parseJsonArray);
    register(3807, parseJsonArray);
    register(3907, parseStringArray);
    register(2951, parseStringArray);
    register(791, parseStringArray);
    register(1183, parseStringArray);
    register(1270, parseStringArray);
  };
  textParsers = {
    init
  };
  return textParsers;
}
var binaryParsers;
var hasRequiredBinaryParsers;
function requireBinaryParsers() {
  if (hasRequiredBinaryParsers) return binaryParsers;
  hasRequiredBinaryParsers = 1;
  var parseInt64 = requirePgInt8();
  var parseBits = function(data, bits, offset, invert, callback) {
    offset = offset || 0;
    invert = invert || false;
    callback = callback || function(lastValue, newValue, bits2) {
      return lastValue * Math.pow(2, bits2) + newValue;
    };
    var offsetBytes = offset >> 3;
    var inv = function(value) {
      if (invert) {
        return ~value & 255;
      }
      return value;
    };
    var mask = 255;
    var firstBits = 8 - offset % 8;
    if (bits < firstBits) {
      mask = 255 << 8 - bits & 255;
      firstBits = bits;
    }
    if (offset) {
      mask = mask >> offset % 8;
    }
    var result2 = 0;
    if (offset % 8 + bits >= 8) {
      result2 = callback(0, inv(data[offsetBytes]) & mask, firstBits);
    }
    var bytes = bits + offset >> 3;
    for (var i = offsetBytes + 1; i < bytes; i++) {
      result2 = callback(result2, inv(data[i]), 8);
    }
    var lastBits = (bits + offset) % 8;
    if (lastBits > 0) {
      result2 = callback(result2, inv(data[bytes]) >> 8 - lastBits, lastBits);
    }
    return result2;
  };
  var parseFloatFromBits = function(data, precisionBits, exponentBits) {
    var bias = Math.pow(2, exponentBits - 1) - 1;
    var sign = parseBits(data, 1);
    var exponent = parseBits(data, exponentBits, 1);
    if (exponent === 0) {
      return 0;
    }
    var precisionBitsCounter = 1;
    var parsePrecisionBits = function(lastValue, newValue, bits) {
      if (lastValue === 0) {
        lastValue = 1;
      }
      for (var i = 1; i <= bits; i++) {
        precisionBitsCounter /= 2;
        if ((newValue & 1 << bits - i) > 0) {
          lastValue += precisionBitsCounter;
        }
      }
      return lastValue;
    };
    var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
    if (exponent == Math.pow(2, exponentBits + 1) - 1) {
      if (mantissa === 0) {
        return sign === 0 ? Infinity : -Infinity;
      }
      return NaN;
    }
    return (sign === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
  };
  var parseInt16 = function(value) {
    if (parseBits(value, 1) == 1) {
      return -1 * (parseBits(value, 15, 1, true) + 1);
    }
    return parseBits(value, 15, 1);
  };
  var parseInt32 = function(value) {
    if (parseBits(value, 1) == 1) {
      return -1 * (parseBits(value, 31, 1, true) + 1);
    }
    return parseBits(value, 31, 1);
  };
  var parseFloat32 = function(value) {
    return parseFloatFromBits(value, 23, 8);
  };
  var parseFloat64 = function(value) {
    return parseFloatFromBits(value, 52, 11);
  };
  var parseNumeric = function(value) {
    var sign = parseBits(value, 16, 32);
    if (sign == 49152) {
      return NaN;
    }
    var weight = Math.pow(1e4, parseBits(value, 16, 16));
    var result2 = 0;
    var ndigits = parseBits(value, 16);
    for (var i = 0; i < ndigits; i++) {
      result2 += parseBits(value, 16, 64 + 16 * i) * weight;
      weight /= 1e4;
    }
    var scale = Math.pow(10, parseBits(value, 16, 48));
    return (sign === 0 ? 1 : -1) * Math.round(result2 * scale) / scale;
  };
  var parseDate = function(isUTC, value) {
    var sign = parseBits(value, 1);
    var rawValue = parseBits(value, 63, 1);
    var result2 = new Date((sign === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
    if (!isUTC) {
      result2.setTime(result2.getTime() + result2.getTimezoneOffset() * 6e4);
    }
    result2.usec = rawValue % 1e3;
    result2.getMicroSeconds = function() {
      return this.usec;
    };
    result2.setMicroSeconds = function(value2) {
      this.usec = value2;
    };
    result2.getUTCMicroSeconds = function() {
      return this.usec;
    };
    return result2;
  };
  var parseArray = function(value) {
    var dim = parseBits(value, 32);
    parseBits(value, 32, 32);
    var elementType = parseBits(value, 32, 64);
    var offset = 96;
    var dims = [];
    for (var i = 0; i < dim; i++) {
      dims[i] = parseBits(value, 32, offset);
      offset += 32;
      offset += 32;
    }
    var parseElement = function(elementType2) {
      var length = parseBits(value, 32, offset);
      offset += 32;
      if (length == 4294967295) {
        return null;
      }
      var result2;
      if (elementType2 == 23 || elementType2 == 20) {
        result2 = parseBits(value, length * 8, offset);
        offset += length * 8;
        return result2;
      } else if (elementType2 == 25) {
        result2 = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
        return result2;
      } else {
        console.log("ERROR: ElementType not implemented: " + elementType2);
      }
    };
    var parse2 = function(dimension, elementType2) {
      var array = [];
      var i2;
      if (dimension.length > 1) {
        var count = dimension.shift();
        for (i2 = 0; i2 < count; i2++) {
          array[i2] = parse2(dimension, elementType2);
        }
        dimension.unshift(count);
      } else {
        for (i2 = 0; i2 < dimension[0]; i2++) {
          array[i2] = parseElement(elementType2);
        }
      }
      return array;
    };
    return parse2(dims, elementType);
  };
  var parseText = function(value) {
    return value.toString("utf8");
  };
  var parseBool = function(value) {
    if (value === null) return null;
    return parseBits(value, 8) > 0;
  };
  var init = function(register) {
    register(20, parseInt64);
    register(21, parseInt16);
    register(23, parseInt32);
    register(26, parseInt32);
    register(1700, parseNumeric);
    register(700, parseFloat32);
    register(701, parseFloat64);
    register(16, parseBool);
    register(1114, parseDate.bind(null, false));
    register(1184, parseDate.bind(null, true));
    register(1e3, parseArray);
    register(1007, parseArray);
    register(1016, parseArray);
    register(1008, parseArray);
    register(1009, parseArray);
    register(25, parseText);
  };
  binaryParsers = {
    init
  };
  return binaryParsers;
}
var hasRequiredPgTypes;
function requirePgTypes() {
  if (hasRequiredPgTypes) return pgTypes;
  hasRequiredPgTypes = 1;
  var textParsers2 = requireTextParsers();
  var binaryParsers2 = requireBinaryParsers();
  var arrayParser2 = requireArrayParser();
  pgTypes.getTypeParser = getTypeParser;
  pgTypes.setTypeParser = setTypeParser;
  pgTypes.arrayParser = arrayParser2;
  var typeParsers = {
    text: {},
    binary: {}
  };
  function noParse(val2) {
    return String(val2);
  }
  function getTypeParser(oid, format) {
    format = format || "text";
    if (!typeParsers[format]) {
      return noParse;
    }
    return typeParsers[format][oid] || noParse;
  }
  function setTypeParser(oid, format, parseFn) {
    if (typeof format == "function") {
      parseFn = format;
      format = "text";
    }
    typeParsers[format][oid] = parseFn;
  }
  textParsers2.init(function(oid, converter) {
    typeParsers.text[oid] = converter;
  });
  binaryParsers2.init(function(oid, converter) {
    typeParsers.binary[oid] = converter;
  });
  return pgTypes;
}
var buildResult_1;
var hasRequiredBuildResult;
function requireBuildResult() {
  if (hasRequiredBuildResult) return buildResult_1;
  hasRequiredBuildResult = 1;
  class Result3 {
    constructor(types2, arrayMode) {
      this._types = types2;
      this._arrayMode = arrayMode;
      this.command = void 0;
      this.rowCount = void 0;
      this.fields = [];
      this.rows = [];
    }
    consumeCommand(pq) {
      this.command = pq.cmdStatus().split(" ")[0];
      this.rowCount = parseInt(pq.cmdTuples(), 10);
    }
    consumeFields(pq) {
      const nfields = pq.nfields();
      for (var x = 0; x < nfields; x++) {
        this.fields.push({
          name: pq.fname(x),
          dataTypeID: pq.ftype(x)
        });
      }
    }
    consumeRows(pq) {
      const tupleCount = pq.ntuples();
      for (var i = 0; i < tupleCount; i++) {
        const row = this._arrayMode ? this.consumeRowAsArray(pq, i) : this.consumeRowAsObject(pq, i);
        this.rows.push(row);
      }
    }
    consumeRowAsObject(pq, rowIndex) {
      const row = {};
      for (var j = 0; j < this.fields.length; j++) {
        const value = this.readValue(pq, rowIndex, j);
        row[this.fields[j].name] = value;
      }
      return row;
    }
    consumeRowAsArray(pq, rowIndex) {
      const row = [];
      for (var j = 0; j < this.fields.length; j++) {
        const value = this.readValue(pq, rowIndex, j);
        row.push(value);
      }
      return row;
    }
    readValue(pq, rowIndex, colIndex) {
      var rawValue = pq.getvalue(rowIndex, colIndex);
      if (rawValue === "") {
        if (pq.getisnull(rowIndex, colIndex)) {
          return null;
        }
      }
      const dataTypeId = this.fields[colIndex].dataTypeID;
      return this._types.getTypeParser(dataTypeId)(rawValue);
    }
  }
  function buildResult(pq, types2, arrayMode) {
    const result2 = new Result3(types2, arrayMode);
    result2.consumeCommand(pq);
    result2.consumeFields(pq);
    result2.consumeRows(pq);
    return result2;
  }
  buildResult_1 = buildResult;
  return buildResult_1;
}
var copyStream = { exports: {} };
var hasRequiredCopyStream;
function requireCopyStream() {
  if (hasRequiredCopyStream) return copyStream.exports;
  hasRequiredCopyStream = 1;
  var Duplex = require$$0$6.Duplex;
  var Writable = require$$0$6.Writable;
  var util = require$$1$2;
  var CopyStream = copyStream.exports = function(pq, options) {
    Duplex.call(this, options);
    this.pq = pq;
    this._reading = false;
  };
  util.inherits(CopyStream, Duplex);
  CopyStream.prototype._write = function(chunk, encoding, cb) {
    var result2 = this.pq.putCopyData(chunk);
    if (result2 === 1) return cb();
    if (result2 === -1) return cb(new Error(this.pq.errorMessage()));
    var self2 = this;
    this.pq.writable(function() {
      self2._write(chunk, encoding, cb);
    });
  };
  CopyStream.prototype.end = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var self2 = this;
    var callback = args.pop();
    if (args.length) {
      this.write(args[0]);
    }
    var result2 = this.pq.putCopyEnd();
    if (result2 === 1) {
      return consumeResults(this.pq, function(err2, res) {
        Writable.prototype.end.call(self2);
        if (callback) {
          callback(err2);
        }
      });
    }
    if (result2 === -1) {
      var err = new Error(this.pq.errorMessage());
      return this.emit("error", err);
    }
    return this.pq.writable(function() {
      return self2.end.apply(self2, callback);
    });
  };
  CopyStream.prototype._consumeBuffer = function(cb) {
    var result2 = this.pq.getCopyData(true);
    if (result2 instanceof Buffer) {
      return setImmediate(function() {
        cb(null, result2);
      });
    }
    if (result2 === -1) {
      return cb(null, null);
    }
    if (result2 === 0) {
      var self2 = this;
      this.pq.once("readable", function() {
        self2.pq.stopReader();
        self2.pq.consumeInput();
        self2._consumeBuffer(cb);
      });
      return this.pq.startReader();
    }
    cb(new Error("Unrecognized read status: " + result2));
  };
  CopyStream.prototype._read = function(size) {
    if (this._reading) return;
    this._reading = true;
    var self2 = this;
    this._consumeBuffer(function(err, buffer) {
      self2._reading = false;
      if (err) {
        return self2.emit("error", err);
      }
      if (buffer === false) {
        return;
      }
      self2.push(buffer);
    });
  };
  var consumeResults = function(pq, cb) {
    var cleanup = function() {
      pq.removeListener("readable", onReadable);
      pq.stopReader();
    };
    var readError = function(message) {
      cleanup();
      return cb(new Error(message || pq.errorMessage()));
    };
    var onReadable = function() {
      if (!pq.consumeInput()) {
        return readError();
      }
      if (pq.isBusy()) {
        return;
      }
      pq.getResult();
      if (pq.getResult() && pq.resultStatus() !== "PGRES_COPY_OUT") {
        return readError("Only one result at a time is accepted");
      }
      if (pq.resultStatus() === "PGRES_FATAL_ERROR") {
        return readError();
      }
      cleanup();
      return cb(null);
    };
    pq.on("readable", onReadable);
    pq.startReader();
  };
  return copyStream.exports;
}
const name = "pg-native";
const version = "3.2.0";
const description = "A slightly nicer interface to Postgres over node-libpq";
const main = "index.js";
const scripts = {
  test: "mocha"
};
const repository = {
  type: "git",
  url: "git://github.com/brianc/node-pg-native.git"
};
const keywords = [
  "postgres",
  "pg",
  "libpq"
];
const author = "Brian M. Carlson";
const license = "MIT";
const bugs = {
  url: "https://github.com/brianc/node-pg-native/issues"
};
const homepage = "https://github.com/brianc/node-pg-native";
const dependencies = {
  libpq: "1.8.13",
  "pg-types": "^1.12.1"
};
const devDependencies = {
  async: "^0.9.0",
  "concat-stream": "^1.4.6",
  "generic-pool": "^2.1.1",
  lodash: "^2.4.1",
  mocha: "10.5.2",
  "node-gyp": ">=10.x",
  okay: "^0.3.0",
  semver: "^4.1.0"
};
const gitHead = "92cb640fd316972e323ced6256b2acd89b1b58e0";
const require$$7 = {
  name,
  version,
  description,
  main,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  dependencies,
  devDependencies,
  gitHead
};
var hasRequiredPgNative;
function requirePgNative() {
  if (hasRequiredPgNative) return pgNative.exports;
  hasRequiredPgNative = 1;
  var Libpq = requireLibpq();
  var EventEmitter2 = require$$0$4.EventEmitter;
  var util = require$$1$2;
  var assert = require$$1$3;
  var types2 = requirePgTypes();
  var buildResult = requireBuildResult();
  var CopyStream = requireCopyStream();
  var Client2 = pgNative.exports = function(config2) {
    if (!(this instanceof Client2)) {
      return new Client2(config2);
    }
    config2 = config2 || {};
    EventEmitter2.call(this);
    this.pq = new Libpq();
    this._reading = false;
    this._read = this._read.bind(this);
    this._types = config2.types || types2;
    this.arrayMode = config2.arrayMode || false;
    this._resultCount = 0;
    this._rows = void 0;
    this._results = void 0;
    this.on("newListener", (event) => {
      if (event !== "notification") return;
      this._startReading();
    });
    this.on("result", this._onResult.bind(this));
    this.on("readyForQuery", this._onReadyForQuery.bind(this));
  };
  util.inherits(Client2, EventEmitter2);
  Client2.prototype.connect = function(params, cb) {
    this.pq.connect(params, cb);
  };
  Client2.prototype.connectSync = function(params) {
    this.pq.connectSync(params);
  };
  Client2.prototype.query = function(text, values, cb) {
    var queryFn;
    if (typeof values === "function") {
      cb = values;
    }
    if (Array.isArray(values)) {
      queryFn = function() {
        return self2.pq.sendQueryParams(text, values);
      };
    } else {
      queryFn = function() {
        return self2.pq.sendQuery(text);
      };
    }
    var self2 = this;
    self2._dispatchQuery(self2.pq, queryFn, function(err) {
      if (err) return cb(err);
      self2._awaitResult(cb);
    });
  };
  Client2.prototype.prepare = function(statementName, text, nParams, cb) {
    var self2 = this;
    var fn = function() {
      return self2.pq.sendPrepare(statementName, text, nParams);
    };
    self2._dispatchQuery(self2.pq, fn, function(err) {
      if (err) return cb(err);
      self2._awaitResult(cb);
    });
  };
  Client2.prototype.execute = function(statementName, parameters, cb) {
    var self2 = this;
    var fn = function() {
      return self2.pq.sendQueryPrepared(statementName, parameters);
    };
    self2._dispatchQuery(self2.pq, fn, function(err, rows) {
      if (err) return cb(err);
      self2._awaitResult(cb);
    });
  };
  Client2.prototype.getCopyStream = function() {
    this.pq.setNonBlocking(true);
    this._stopReading();
    return new CopyStream(this.pq);
  };
  Client2.prototype.cancel = function(cb) {
    assert(cb, "Callback is required");
    var result2 = this.pq.cancel();
    return setImmediate(function() {
      cb(result2 === true ? void 0 : new Error(result2));
    });
  };
  Client2.prototype.querySync = function(text, values) {
    if (values) {
      this.pq.execParams(text, values);
    } else {
      this.pq.exec(text);
    }
    throwIfError(this.pq);
    const result2 = buildResult(this.pq, this._types, this.arrayMode);
    return result2.rows;
  };
  Client2.prototype.prepareSync = function(statementName, text, nParams) {
    this.pq.prepare(statementName, text, nParams);
    throwIfError(this.pq);
  };
  Client2.prototype.executeSync = function(statementName, parameters) {
    this.pq.execPrepared(statementName, parameters);
    throwIfError(this.pq);
    return buildResult(this.pq, this._types, this.arrayMode).rows;
  };
  Client2.prototype.escapeLiteral = function(value) {
    return this.pq.escapeLiteral(value);
  };
  Client2.prototype.escapeIdentifier = function(value) {
    return this.pq.escapeIdentifier(value);
  };
  pgNative.exports.version = require$$7.version;
  Client2.prototype.end = function(cb) {
    this._stopReading();
    this.pq.finish();
    if (cb) setImmediate(cb);
  };
  Client2.prototype._readError = function(message) {
    var err = new Error(message || this.pq.errorMessage());
    this.emit("error", err);
  };
  Client2.prototype._stopReading = function() {
    if (!this._reading) return;
    this._reading = false;
    this.pq.stopReader();
    this.pq.removeListener("readable", this._read);
  };
  Client2.prototype._consumeQueryResults = function(pq) {
    return buildResult(pq, this._types, this.arrayMode);
  };
  Client2.prototype._emitResult = function(pq) {
    var status = pq.resultStatus();
    switch (status) {
      case "PGRES_FATAL_ERROR":
        this._queryError = new Error(this.pq.resultErrorMessage());
        break;
      case "PGRES_TUPLES_OK":
      case "PGRES_COMMAND_OK":
      case "PGRES_EMPTY_QUERY":
        const result2 = this._consumeQueryResults(this.pq);
        this.emit("result", result2);
        break;
      case "PGRES_COPY_OUT":
      case "PGRES_COPY_BOTH": {
        break;
      }
      default:
        this._readError("unrecognized command status: " + status);
        break;
    }
    return status;
  };
  Client2.prototype._read = function() {
    var pq = this.pq;
    if (!pq.consumeInput()) {
      return this._readError();
    }
    if (pq.isBusy()) {
      return;
    }
    while (pq.getResult()) {
      const resultStatus = this._emitResult(this.pq);
      if (resultStatus === "PGRES_COPY_BOTH" || resultStatus === "PGRES_COPY_OUT") {
        break;
      }
      if (pq.isBusy()) {
        return;
      }
    }
    this.emit("readyForQuery");
    var notice = this.pq.notifies();
    while (notice) {
      this.emit("notification", notice);
      notice = this.pq.notifies();
    }
  };
  Client2.prototype._startReading = function() {
    if (this._reading) return;
    this._reading = true;
    this.pq.on("readable", this._read);
    this.pq.startReader();
  };
  var throwIfError = function(pq) {
    var err = pq.resultErrorMessage() || pq.errorMessage();
    if (err) {
      throw new Error(err);
    }
  };
  Client2.prototype._awaitResult = function(cb) {
    this._queryCallback = cb;
    return this._startReading();
  };
  Client2.prototype._waitForDrain = function(pq, cb) {
    var res = pq.flush();
    if (res === 0) return cb();
    if (res === -1) return cb(pq.errorMessage());
    var self2 = this;
    return pq.writable(function() {
      self2._waitForDrain(pq, cb);
    });
  };
  Client2.prototype._dispatchQuery = function(pq, fn, cb) {
    this._stopReading();
    var success = pq.setNonBlocking(true);
    if (!success) return cb(new Error("Unable to set non-blocking to true"));
    var sent = fn();
    if (!sent) return cb(new Error(pq.errorMessage() || "Something went wrong dispatching the query"));
    this._waitForDrain(pq, cb);
  };
  Client2.prototype._onResult = function(result2) {
    if (this._resultCount === 0) {
      this._results = result2;
      this._rows = result2.rows;
    } else if (this._resultCount === 1) {
      this._results = [this._results, result2];
      this._rows = [this._rows, result2.rows];
    } else {
      this._results.push(result2);
      this._rows.push(result2.rows);
    }
    this._resultCount++;
  };
  Client2.prototype._onReadyForQuery = function() {
    const cb = this._queryCallback;
    this._queryCallback = void 0;
    const err = this._queryError;
    this._queryError = void 0;
    const rows = this._rows;
    this._rows = void 0;
    const results = this._results;
    this._results = void 0;
    this._resultCount = 0;
    if (cb) {
      cb(err, rows || [], results);
    }
  };
  return pgNative.exports;
}
var query$1 = { exports: {} };
var hasRequiredQuery$1;
function requireQuery$1() {
  if (hasRequiredQuery$1) return query$1.exports;
  hasRequiredQuery$1 = 1;
  var EventEmitter2 = require$$0$4.EventEmitter;
  var util = require$$1$2;
  var utils2 = requireUtils$1();
  var NativeQuery = query$1.exports = function(config2, values, callback) {
    EventEmitter2.call(this);
    config2 = utils2.normalizeQueryConfig(config2, values, callback);
    this.text = config2.text;
    this.values = config2.values;
    this.name = config2.name;
    this.queryMode = config2.queryMode;
    this.callback = config2.callback;
    this.state = "new";
    this._arrayMode = config2.rowMode === "array";
    this._emitRowEvents = false;
    this.on(
      "newListener",
      (function(event) {
        if (event === "row") this._emitRowEvents = true;
      }).bind(this)
    );
  };
  util.inherits(NativeQuery, EventEmitter2);
  var errorFieldMap = {
    /* eslint-disable quote-props */
    sqlState: "code",
    statementPosition: "position",
    messagePrimary: "message",
    context: "where",
    schemaName: "schema",
    tableName: "table",
    columnName: "column",
    dataTypeName: "dataType",
    constraintName: "constraint",
    sourceFile: "file",
    sourceLine: "line",
    sourceFunction: "routine"
  };
  NativeQuery.prototype.handleError = function(err) {
    var fields = this.native.pq.resultErrorFields();
    if (fields) {
      for (var key in fields) {
        var normalizedFieldName = errorFieldMap[key] || key;
        err[normalizedFieldName] = fields[key];
      }
    }
    if (this.callback) {
      this.callback(err);
    } else {
      this.emit("error", err);
    }
    this.state = "error";
  };
  NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
  };
  NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
  };
  NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise(
      (function(resolve, reject) {
        this._once("end", resolve);
        this._once("error", reject);
      }).bind(this)
    );
    return this._promise;
  };
  NativeQuery.prototype.submit = function(client2) {
    this.state = "running";
    var self2 = this;
    this.native = client2.native;
    client2.native.arrayMode = this._arrayMode;
    var after = function(err, rows, results) {
      client2.native.arrayMode = false;
      setImmediate(function() {
        self2.emit("_done");
      });
      if (err) {
        return self2.handleError(err);
      }
      if (self2._emitRowEvents) {
        if (results.length > 1) {
          rows.forEach((rowOfRows, i) => {
            rowOfRows.forEach((row) => {
              self2.emit("row", row, results[i]);
            });
          });
        } else {
          rows.forEach(function(row) {
            self2.emit("row", row, results);
          });
        }
      }
      self2.state = "end";
      self2.emit("end", results);
      if (self2.callback) {
        self2.callback(null, results);
      }
    };
    if (process.domain) {
      after = process.domain.bind(after);
    }
    if (this.name) {
      if (this.name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", this.name, this.name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      var values = (this.values || []).map(utils2.prepareValue);
      if (client2.namedQueries[this.name]) {
        if (this.text && client2.namedQueries[this.name] !== this.text) {
          const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return after(err);
        }
        return client2.native.execute(this.name, values, after);
      }
      return client2.native.prepare(this.name, this.text, values.length, function(err) {
        if (err) return after(err);
        client2.namedQueries[self2.name] = self2.text;
        return self2.native.execute(self2.name, values, after);
      });
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        const err = new Error("Query values must be an array");
        return after(err);
      }
      var vals = this.values.map(utils2.prepareValue);
      client2.native.query(this.text, vals, after);
    } else if (this.queryMode === "extended") {
      client2.native.query(this.text, [], after);
    } else {
      client2.native.query(this.text, after);
    }
  };
  return query$1.exports;
}
var hasRequiredClient$1;
function requireClient$1() {
  if (hasRequiredClient$1) return client$1.exports;
  hasRequiredClient$1 = 1;
  var Native;
  try {
    Native = requirePgNative();
  } catch (e) {
    throw e;
  }
  var TypeOverrides2 = requireTypeOverrides();
  var EventEmitter2 = require$$0$4.EventEmitter;
  var util = require$$1$2;
  var ConnectionParameters3 = requireConnectionParameters();
  var NativeQuery = requireQuery$1();
  var Client2 = client$1.exports = function(config2) {
    EventEmitter2.call(this);
    config2 = config2 || {};
    this._Promise = config2.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides2(config2.types);
    this.native = new Native({
      types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    var cp = this.connectionParameters = new ConnectionParameters3(config2);
    if (config2.nativeConnectionString) cp.nativeConnectionString = config2.nativeConnectionString;
    this.user = cp.user;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    this.namedQueries = {};
  };
  Client2.Query = NativeQuery;
  util.inherits(Client2, EventEmitter2);
  Client2.prototype._errorAllQueries = function(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.native = this.native;
        query2.handleError(err);
      });
    };
    if (this._hasActiveQuery()) {
      enqueueError(this._activeQuery);
      this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
  };
  Client2.prototype._connect = function(cb) {
    var self2 = this;
    if (this._connecting) {
      process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
      if (self2.connectionParameters.nativeConnectionString) conString = self2.connectionParameters.nativeConnectionString;
      if (err) return cb(err);
      self2.native.connect(conString, function(err2) {
        if (err2) {
          self2.native.end();
          return cb(err2);
        }
        self2._connected = true;
        self2.native.on("error", function(err3) {
          self2._queryable = false;
          self2._errorAllQueries(err3);
          self2.emit("error", err3);
        });
        self2.native.on("notification", function(msg) {
          self2.emit("notification", {
            channel: msg.relname,
            payload: msg.extra
          });
        });
        self2.emit("connect");
        self2._pulseQueryQueue(true);
        cb();
      });
    });
  };
  Client2.prototype.connect = function(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  Client2.prototype.query = function(config2, values, callback) {
    var query2;
    var result2;
    var readTimeout;
    var readTimeoutTimer;
    var queryCallback;
    if (config2 === null || config2 === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config2.submit === "function") {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config2;
      if (typeof values === "function") {
        config2.callback = values;
      }
    } else {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      query2 = new NativeQuery(config2, values, callback);
      if (!query2.callback) {
        let resolveOut, rejectOut;
        result2 = new this._Promise((resolve, reject) => {
          resolveOut = resolve;
          rejectOut = reject;
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
        query2.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback;
      readTimeoutTimer = setTimeout(() => {
        var error = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error, this.connection);
        });
        queryCallback(error);
        query2.callback = () => {
        };
        var index = this._queryQueue.indexOf(query2);
        if (index > -1) {
          this._queryQueue.splice(index, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (!this._queryable) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"));
      });
      return result2;
    }
    if (this._ending) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"));
      });
      return result2;
    }
    this._queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  };
  Client2.prototype.end = function(cb) {
    var self2 = this;
    this._ending = true;
    if (!this._connected) {
      this.once("connect", this.end.bind(this, cb));
    }
    var result2;
    if (!cb) {
      result2 = new this._Promise(function(resolve, reject) {
        cb = (err) => err ? reject(err) : resolve();
      });
    }
    this.native.end(function() {
      self2._errorAllQueries(new Error("Connection terminated"));
      process.nextTick(() => {
        self2.emit("end");
        if (cb) cb();
      });
    });
    return result2;
  };
  Client2.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  Client2.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
      return;
    }
    if (this._hasActiveQuery()) {
      return;
    }
    var query2 = this._queryQueue.shift();
    if (!query2) {
      if (!initialConnection) {
        this.emit("drain");
      }
      return;
    }
    this._activeQuery = query2;
    query2.submit(this);
    var self2 = this;
    query2.once("_done", function() {
      self2._pulseQueryQueue();
    });
  };
  Client2.prototype.cancel = function(query2) {
    if (this._activeQuery === query2) {
      this.native.cancel(function() {
      });
    } else if (this._queryQueue.indexOf(query2) !== -1) {
      this._queryQueue.splice(this._queryQueue.indexOf(query2), 1);
    }
  };
  Client2.prototype.ref = function() {
  };
  Client2.prototype.unref = function() {
  };
  Client2.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  };
  Client2.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
  };
  return client$1.exports;
}
var native$1;
var hasRequiredNative$1;
function requireNative$1() {
  if (hasRequiredNative$1) return native$1;
  hasRequiredNative$1 = 1;
  native$1 = requireClient$1();
  return native$1;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib.exports;
  hasRequiredLib = 1;
  (function(module) {
    var Client2 = requireClient$2();
    var defaults2 = requireDefaults();
    var Connection3 = requireConnection();
    var Pool = requirePgPool();
    const { DatabaseError: DatabaseError2 } = dist;
    const { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = requireUtils$1();
    const poolFactory = (Client22) => {
      return class BoundPool extends Pool {
        constructor(options) {
          super(options, Client22);
        }
      };
    };
    var PG = function(clientConstructor) {
      this.defaults = defaults2;
      this.Client = clientConstructor;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection3;
      this.types = requirePgTypes$1();
      this.DatabaseError = DatabaseError2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
    };
    if (typeof process.env.NODE_PG_FORCE_NATIVE !== "undefined") {
      module.exports = new PG(requireNative$1());
    } else {
      module.exports = new PG(Client2);
      Object.defineProperty(module.exports, "native", {
        configurable: true,
        enumerable: false,
        get() {
          var native2 = null;
          try {
            native2 = new PG(requireNative$1());
          } catch (err) {
            if (err.code !== "MODULE_NOT_FOUND") {
              throw err;
            }
          }
          Object.defineProperty(module.exports, "native", {
            value: native2
          });
          return native2;
        }
      });
    }
  })(lib);
  return lib.exports;
}
var pgPool;
var hasRequiredPgPool;
function requirePgPool() {
  if (hasRequiredPgPool) return pgPool;
  hasRequiredPgPool = 1;
  const EventEmitter2 = require$$0$4.EventEmitter;
  const NOOP = function() {
  };
  const removeWhere = (list, predicate) => {
    const i = list.findIndex(predicate);
    return i === -1 ? void 0 : list.splice(i, 1)[0];
  };
  class IdleItem {
    constructor(client2, idleListener, timeoutId) {
      this.client = client2;
      this.idleListener = idleListener;
      this.timeoutId = timeoutId;
    }
  }
  class PendingItem {
    constructor(callback) {
      this.callback = callback;
    }
  }
  function throwOnDoubleRelease() {
    throw new Error("Release called on client which has already been released to the pool.");
  }
  function promisify(Promise2, callback) {
    if (callback) {
      return { callback, result: void 0 };
    }
    let rej;
    let res;
    const cb = function(err, client2) {
      err ? rej(err) : res(client2);
    };
    const result2 = new Promise2(function(resolve, reject) {
      res = resolve;
      rej = reject;
    }).catch((err) => {
      Error.captureStackTrace(err);
      throw err;
    });
    return { callback: cb, result: result2 };
  }
  function makeIdleListener(pool, client2) {
    return function idleListener(err) {
      err.client = client2;
      client2.removeListener("error", idleListener);
      client2.on("error", () => {
        pool.log("additional client error after disconnection due to error", err);
      });
      pool._remove(client2);
      pool.emit("error", err, client2);
    };
  }
  class Pool extends EventEmitter2 {
    constructor(options, Client2) {
      super();
      this.options = Object.assign({}, options);
      if (options != null && "password" in options) {
        Object.defineProperty(this.options, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: options.password
        });
      }
      if (options != null && options.ssl && options.ssl.key) {
        Object.defineProperty(this.options.ssl, "key", {
          enumerable: false
        });
      }
      this.options.max = this.options.max || this.options.poolSize || 10;
      this.options.maxUses = this.options.maxUses || Infinity;
      this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
      this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
      this.log = this.options.log || function() {
      };
      this.Client = this.options.Client || Client2 || requireLib().Client;
      this.Promise = this.options.Promise || commonjsGlobal.Promise;
      if (typeof this.options.idleTimeoutMillis === "undefined") {
        this.options.idleTimeoutMillis = 1e4;
      }
      this._clients = [];
      this._idle = [];
      this._expired = /* @__PURE__ */ new WeakSet();
      this._pendingQueue = [];
      this._endCallback = void 0;
      this.ending = false;
      this.ended = false;
    }
    _isFull() {
      return this._clients.length >= this.options.max;
    }
    _pulseQueue() {
      this.log("pulse queue");
      if (this.ended) {
        this.log("pulse queue ended");
        return;
      }
      if (this.ending) {
        this.log("pulse queue on ending");
        if (this._idle.length) {
          this._idle.slice().map((item) => {
            this._remove(item.client);
          });
        }
        if (!this._clients.length) {
          this.ended = true;
          this._endCallback();
        }
        return;
      }
      if (!this._pendingQueue.length) {
        this.log("no queued requests");
        return;
      }
      if (!this._idle.length && this._isFull()) {
        return;
      }
      const pendingItem = this._pendingQueue.shift();
      if (this._idle.length) {
        const idleItem = this._idle.pop();
        clearTimeout(idleItem.timeoutId);
        const client2 = idleItem.client;
        client2.ref && client2.ref();
        const idleListener = idleItem.idleListener;
        return this._acquireClient(client2, pendingItem, idleListener, false);
      }
      if (!this._isFull()) {
        return this.newClient(pendingItem);
      }
      throw new Error("unexpected condition");
    }
    _remove(client2) {
      const removed = removeWhere(this._idle, (item) => item.client === client2);
      if (removed !== void 0) {
        clearTimeout(removed.timeoutId);
      }
      this._clients = this._clients.filter((c) => c !== client2);
      client2.end();
      this.emit("remove", client2);
    }
    connect(cb) {
      if (this.ending) {
        const err = new Error("Cannot use a pool after calling end on the pool");
        return cb ? cb(err) : this.Promise.reject(err);
      }
      const response = promisify(this.Promise, cb);
      const result2 = response.result;
      if (this._isFull() || this._idle.length) {
        if (this._idle.length) {
          process.nextTick(() => this._pulseQueue());
        }
        if (!this.options.connectionTimeoutMillis) {
          this._pendingQueue.push(new PendingItem(response.callback));
          return result2;
        }
        const queueCallback = (err, res, done) => {
          clearTimeout(tid);
          response.callback(err, res, done);
        };
        const pendingItem = new PendingItem(queueCallback);
        const tid = setTimeout(() => {
          removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
          pendingItem.timedOut = true;
          response.callback(new Error("timeout exceeded when trying to connect"));
        }, this.options.connectionTimeoutMillis);
        this._pendingQueue.push(pendingItem);
        return result2;
      }
      this.newClient(new PendingItem(response.callback));
      return result2;
    }
    newClient(pendingItem) {
      const client2 = new this.Client(this.options);
      this._clients.push(client2);
      const idleListener = makeIdleListener(this, client2);
      this.log("checking client timeout");
      let tid;
      let timeoutHit = false;
      if (this.options.connectionTimeoutMillis) {
        tid = setTimeout(() => {
          this.log("ending client due to timeout");
          timeoutHit = true;
          client2.connection ? client2.connection.stream.destroy() : client2.end();
        }, this.options.connectionTimeoutMillis);
      }
      this.log("connecting new client");
      client2.connect((err) => {
        if (tid) {
          clearTimeout(tid);
        }
        client2.on("error", idleListener);
        if (err) {
          this.log("client failed to connect", err);
          this._clients = this._clients.filter((c) => c !== client2);
          if (timeoutHit) {
            err.message = "Connection terminated due to connection timeout";
          }
          this._pulseQueue();
          if (!pendingItem.timedOut) {
            pendingItem.callback(err, void 0, NOOP);
          }
        } else {
          this.log("new client connected");
          if (this.options.maxLifetimeSeconds !== 0) {
            const maxLifetimeTimeout = setTimeout(() => {
              this.log("ending client due to expired lifetime");
              this._expired.add(client2);
              const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client2);
              if (idleIndex !== -1) {
                this._acquireClient(
                  client2,
                  new PendingItem((err2, client3, clientRelease) => clientRelease()),
                  idleListener,
                  false
                );
              }
            }, this.options.maxLifetimeSeconds * 1e3);
            maxLifetimeTimeout.unref();
            client2.once("end", () => clearTimeout(maxLifetimeTimeout));
          }
          return this._acquireClient(client2, pendingItem, idleListener, true);
        }
      });
    }
    // acquire a client for a pending work item
    _acquireClient(client2, pendingItem, idleListener, isNew) {
      if (isNew) {
        this.emit("connect", client2);
      }
      this.emit("acquire", client2);
      client2.release = this._releaseOnce(client2, idleListener);
      client2.removeListener("error", idleListener);
      if (!pendingItem.timedOut) {
        if (isNew && this.options.verify) {
          this.options.verify(client2, (err) => {
            if (err) {
              client2.release(err);
              return pendingItem.callback(err, void 0, NOOP);
            }
            pendingItem.callback(void 0, client2, client2.release);
          });
        } else {
          pendingItem.callback(void 0, client2, client2.release);
        }
      } else {
        if (isNew && this.options.verify) {
          this.options.verify(client2, client2.release);
        } else {
          client2.release();
        }
      }
    }
    // returns a function that wraps _release and throws if called more than once
    _releaseOnce(client2, idleListener) {
      let released = false;
      return (err) => {
        if (released) {
          throwOnDoubleRelease();
        }
        released = true;
        this._release(client2, idleListener, err);
      };
    }
    // release a client back to the poll, include an error
    // to remove it from the pool
    _release(client2, idleListener, err) {
      client2.on("error", idleListener);
      client2._poolUseCount = (client2._poolUseCount || 0) + 1;
      this.emit("release", err, client2);
      if (err || this.ending || !client2._queryable || client2._ending || client2._poolUseCount >= this.options.maxUses) {
        if (client2._poolUseCount >= this.options.maxUses) {
          this.log("remove expended client");
        }
        this._remove(client2);
        this._pulseQueue();
        return;
      }
      const isExpired = this._expired.has(client2);
      if (isExpired) {
        this.log("remove expired client");
        this._expired.delete(client2);
        this._remove(client2);
        this._pulseQueue();
        return;
      }
      let tid;
      if (this.options.idleTimeoutMillis) {
        tid = setTimeout(() => {
          this.log("remove idle client");
          this._remove(client2);
        }, this.options.idleTimeoutMillis);
        if (this.options.allowExitOnIdle) {
          tid.unref();
        }
      }
      if (this.options.allowExitOnIdle) {
        client2.unref();
      }
      this._idle.push(new IdleItem(client2, idleListener, tid));
      this._pulseQueue();
    }
    query(text, values, cb) {
      if (typeof text === "function") {
        const response2 = promisify(this.Promise, text);
        setImmediate(function() {
          return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
        });
        return response2.result;
      }
      if (typeof values === "function") {
        cb = values;
        values = void 0;
      }
      const response = promisify(this.Promise, cb);
      cb = response.callback;
      this.connect((err, client2) => {
        if (err) {
          return cb(err);
        }
        let clientReleased = false;
        const onError = (err2) => {
          if (clientReleased) {
            return;
          }
          clientReleased = true;
          client2.release(err2);
          cb(err2);
        };
        client2.once("error", onError);
        this.log("dispatching query");
        try {
          client2.query(text, values, (err2, res) => {
            this.log("query dispatched");
            client2.removeListener("error", onError);
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client2.release(err2);
            if (err2) {
              return cb(err2);
            }
            return cb(void 0, res);
          });
        } catch (err2) {
          client2.release(err2);
          return cb(err2);
        }
      });
      return response.result;
    }
    end(cb) {
      this.log("ending");
      if (this.ending) {
        const err = new Error("Called end on pool more than once");
        return cb ? cb(err) : this.Promise.reject(err);
      }
      this.ending = true;
      const promised = promisify(this.Promise, cb);
      this._endCallback = promised.callback;
      this._pulseQueue();
      return promised.result;
    }
    get waitingCount() {
      return this._pendingQueue.length;
    }
    get idleCount() {
      return this._idle.length;
    }
    get expiredCount() {
      return this._clients.reduce((acc, client2) => acc + (this._expired.has(client2) ? 1 : 0), 0);
    }
    get totalCount() {
      return this._clients.length;
    }
  }
  pgPool = Pool;
  return pgPool;
}
var client = { exports: {} };
var query = { exports: {} };
var hasRequiredQuery;
function requireQuery() {
  if (hasRequiredQuery) return query.exports;
  hasRequiredQuery = 1;
  var EventEmitter2 = require$$0$4.EventEmitter;
  var util = require$$1$2;
  var utils2 = utils$5;
  var NativeQuery = query.exports = function(config2, values, callback) {
    EventEmitter2.call(this);
    config2 = utils2.normalizeQueryConfig(config2, values, callback);
    this.text = config2.text;
    this.values = config2.values;
    this.name = config2.name;
    this.queryMode = config2.queryMode;
    this.callback = config2.callback;
    this.state = "new";
    this._arrayMode = config2.rowMode === "array";
    this._emitRowEvents = false;
    this.on(
      "newListener",
      (function(event) {
        if (event === "row") this._emitRowEvents = true;
      }).bind(this)
    );
  };
  util.inherits(NativeQuery, EventEmitter2);
  var errorFieldMap = {
    /* eslint-disable quote-props */
    sqlState: "code",
    statementPosition: "position",
    messagePrimary: "message",
    context: "where",
    schemaName: "schema",
    tableName: "table",
    columnName: "column",
    dataTypeName: "dataType",
    constraintName: "constraint",
    sourceFile: "file",
    sourceLine: "line",
    sourceFunction: "routine"
  };
  NativeQuery.prototype.handleError = function(err) {
    var fields = this.native.pq.resultErrorFields();
    if (fields) {
      for (var key in fields) {
        var normalizedFieldName = errorFieldMap[key] || key;
        err[normalizedFieldName] = fields[key];
      }
    }
    if (this.callback) {
      this.callback(err);
    } else {
      this.emit("error", err);
    }
    this.state = "error";
  };
  NativeQuery.prototype.then = function(onSuccess, onFailure) {
    return this._getPromise().then(onSuccess, onFailure);
  };
  NativeQuery.prototype.catch = function(callback) {
    return this._getPromise().catch(callback);
  };
  NativeQuery.prototype._getPromise = function() {
    if (this._promise) return this._promise;
    this._promise = new Promise(
      (function(resolve, reject) {
        this._once("end", resolve);
        this._once("error", reject);
      }).bind(this)
    );
    return this._promise;
  };
  NativeQuery.prototype.submit = function(client2) {
    this.state = "running";
    var self2 = this;
    this.native = client2.native;
    client2.native.arrayMode = this._arrayMode;
    var after = function(err, rows, results) {
      client2.native.arrayMode = false;
      setImmediate(function() {
        self2.emit("_done");
      });
      if (err) {
        return self2.handleError(err);
      }
      if (self2._emitRowEvents) {
        if (results.length > 1) {
          rows.forEach((rowOfRows, i) => {
            rowOfRows.forEach((row) => {
              self2.emit("row", row, results[i]);
            });
          });
        } else {
          rows.forEach(function(row) {
            self2.emit("row", row, results);
          });
        }
      }
      self2.state = "end";
      self2.emit("end", results);
      if (self2.callback) {
        self2.callback(null, results);
      }
    };
    if (process.domain) {
      after = process.domain.bind(after);
    }
    if (this.name) {
      if (this.name.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", this.name, this.name.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      var values = (this.values || []).map(utils2.prepareValue);
      if (client2.namedQueries[this.name]) {
        if (this.text && client2.namedQueries[this.name] !== this.text) {
          const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          return after(err);
        }
        return client2.native.execute(this.name, values, after);
      }
      return client2.native.prepare(this.name, this.text, values.length, function(err) {
        if (err) return after(err);
        client2.namedQueries[self2.name] = self2.text;
        return self2.native.execute(self2.name, values, after);
      });
    } else if (this.values) {
      if (!Array.isArray(this.values)) {
        const err = new Error("Query values must be an array");
        return after(err);
      }
      var vals = this.values.map(utils2.prepareValue);
      client2.native.query(this.text, vals, after);
    } else if (this.queryMode === "extended") {
      client2.native.query(this.text, [], after);
    } else {
      client2.native.query(this.text, after);
    }
  };
  return query.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client.exports;
  hasRequiredClient = 1;
  var Native;
  try {
    Native = requirePgNative();
  } catch (e) {
    throw e;
  }
  var TypeOverrides2 = typeOverrides$1;
  var EventEmitter2 = require$$0$4.EventEmitter;
  var util = require$$1$2;
  var ConnectionParameters3 = connectionParameters$1;
  var NativeQuery = requireQuery();
  var Client2 = client.exports = function(config2) {
    EventEmitter2.call(this);
    config2 = config2 || {};
    this._Promise = config2.Promise || commonjsGlobal.Promise;
    this._types = new TypeOverrides2(config2.types);
    this.native = new Native({
      types: this._types
    });
    this._queryQueue = [];
    this._ending = false;
    this._connecting = false;
    this._connected = false;
    this._queryable = true;
    var cp = this.connectionParameters = new ConnectionParameters3(config2);
    if (config2.nativeConnectionString) cp.nativeConnectionString = config2.nativeConnectionString;
    this.user = cp.user;
    Object.defineProperty(this, "password", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: cp.password
    });
    this.database = cp.database;
    this.host = cp.host;
    this.port = cp.port;
    this.namedQueries = {};
  };
  Client2.Query = NativeQuery;
  util.inherits(Client2, EventEmitter2);
  Client2.prototype._errorAllQueries = function(err) {
    const enqueueError = (query2) => {
      process.nextTick(() => {
        query2.native = this.native;
        query2.handleError(err);
      });
    };
    if (this._hasActiveQuery()) {
      enqueueError(this._activeQuery);
      this._activeQuery = null;
    }
    this._queryQueue.forEach(enqueueError);
    this._queryQueue.length = 0;
  };
  Client2.prototype._connect = function(cb) {
    var self2 = this;
    if (this._connecting) {
      process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
      return;
    }
    this._connecting = true;
    this.connectionParameters.getLibpqConnectionString(function(err, conString) {
      if (self2.connectionParameters.nativeConnectionString) conString = self2.connectionParameters.nativeConnectionString;
      if (err) return cb(err);
      self2.native.connect(conString, function(err2) {
        if (err2) {
          self2.native.end();
          return cb(err2);
        }
        self2._connected = true;
        self2.native.on("error", function(err3) {
          self2._queryable = false;
          self2._errorAllQueries(err3);
          self2.emit("error", err3);
        });
        self2.native.on("notification", function(msg) {
          self2.emit("notification", {
            channel: msg.relname,
            payload: msg.extra
          });
        });
        self2.emit("connect");
        self2._pulseQueryQueue(true);
        cb();
      });
    });
  };
  Client2.prototype.connect = function(callback) {
    if (callback) {
      this._connect(callback);
      return;
    }
    return new this._Promise((resolve, reject) => {
      this._connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  Client2.prototype.query = function(config2, values, callback) {
    var query2;
    var result2;
    var readTimeout;
    var readTimeoutTimer;
    var queryCallback;
    if (config2 === null || config2 === void 0) {
      throw new TypeError("Client was passed a null or undefined query");
    } else if (typeof config2.submit === "function") {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      result2 = query2 = config2;
      if (typeof values === "function") {
        config2.callback = values;
      }
    } else {
      readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
      query2 = new NativeQuery(config2, values, callback);
      if (!query2.callback) {
        let resolveOut, rejectOut;
        result2 = new this._Promise((resolve, reject) => {
          resolveOut = resolve;
          rejectOut = reject;
        }).catch((err) => {
          Error.captureStackTrace(err);
          throw err;
        });
        query2.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
      }
    }
    if (readTimeout) {
      queryCallback = query2.callback;
      readTimeoutTimer = setTimeout(() => {
        var error = new Error("Query read timeout");
        process.nextTick(() => {
          query2.handleError(error, this.connection);
        });
        queryCallback(error);
        query2.callback = () => {
        };
        var index = this._queryQueue.indexOf(query2);
        if (index > -1) {
          this._queryQueue.splice(index, 1);
        }
        this._pulseQueryQueue();
      }, readTimeout);
      query2.callback = (err, res) => {
        clearTimeout(readTimeoutTimer);
        queryCallback(err, res);
      };
    }
    if (!this._queryable) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client has encountered a connection error and is not queryable"));
      });
      return result2;
    }
    if (this._ending) {
      query2.native = this.native;
      process.nextTick(() => {
        query2.handleError(new Error("Client was closed and is not queryable"));
      });
      return result2;
    }
    this._queryQueue.push(query2);
    this._pulseQueryQueue();
    return result2;
  };
  Client2.prototype.end = function(cb) {
    var self2 = this;
    this._ending = true;
    if (!this._connected) {
      this.once("connect", this.end.bind(this, cb));
    }
    var result2;
    if (!cb) {
      result2 = new this._Promise(function(resolve, reject) {
        cb = (err) => err ? reject(err) : resolve();
      });
    }
    this.native.end(function() {
      self2._errorAllQueries(new Error("Connection terminated"));
      process.nextTick(() => {
        self2.emit("end");
        if (cb) cb();
      });
    });
    return result2;
  };
  Client2.prototype._hasActiveQuery = function() {
    return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
  };
  Client2.prototype._pulseQueryQueue = function(initialConnection) {
    if (!this._connected) {
      return;
    }
    if (this._hasActiveQuery()) {
      return;
    }
    var query2 = this._queryQueue.shift();
    if (!query2) {
      if (!initialConnection) {
        this.emit("drain");
      }
      return;
    }
    this._activeQuery = query2;
    query2.submit(this);
    var self2 = this;
    query2.once("_done", function() {
      self2._pulseQueryQueue();
    });
  };
  Client2.prototype.cancel = function(query2) {
    if (this._activeQuery === query2) {
      this.native.cancel(function() {
      });
    } else if (this._queryQueue.indexOf(query2) !== -1) {
      this._queryQueue.splice(this._queryQueue.indexOf(query2), 1);
    }
  };
  Client2.prototype.ref = function() {
  };
  Client2.prototype.unref = function() {
  };
  Client2.prototype.setTypeParser = function(oid, format, parseFn) {
    return this._types.setTypeParser(oid, format, parseFn);
  };
  Client2.prototype.getTypeParser = function(oid, format) {
    return this._types.getTypeParser(oid, format);
  };
  return client.exports;
}
var native;
var hasRequiredNative;
function requireNative() {
  if (hasRequiredNative) return native;
  hasRequiredNative = 1;
  native = requireClient();
  return native;
}
(function(module) {
  var Client2 = client$3;
  var defaults2 = defaultsExports;
  var Connection3 = connection$1;
  var Pool = requirePgPool();
  const { DatabaseError: DatabaseError2 } = dist;
  const { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = utils$5;
  const poolFactory = (Client22) => {
    return class BoundPool extends Pool {
      constructor(options) {
        super(options, Client22);
      }
    };
  };
  var PG = function(clientConstructor) {
    this.defaults = defaults2;
    this.Client = clientConstructor;
    this.Query = this.Client.Query;
    this.Pool = poolFactory(this.Client);
    this._pools = [];
    this.Connection = Connection3;
    this.types = requirePgTypes$1();
    this.DatabaseError = DatabaseError2;
    this.escapeIdentifier = escapeIdentifier2;
    this.escapeLiteral = escapeLiteral2;
  };
  if (typeof process.env.NODE_PG_FORCE_NATIVE !== "undefined") {
    module.exports = new PG(requireNative());
  } else {
    module.exports = new PG(Client2);
    Object.defineProperty(module.exports, "native", {
      configurable: true,
      enumerable: false,
      get() {
        var native2 = null;
        try {
          native2 = new PG(requireNative());
        } catch (err) {
          if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
          }
        }
        Object.defineProperty(module.exports, "native", {
          value: native2
        });
        return native2;
      }
    });
  }
})(lib$2);
var libExports = lib$2.exports;
async function initDB() {
  try {
    const pgVersionPath = path$1.join(ConfigProvider.configs.DATA_PATH, "PG_VERSION");
    if (!fs$1.existsSync(pgVersionPath)) {
      LOG.info("Database not initialized. Initializing now...");
      execSync(`${ConfigProvider.configs.POSTGRES_PATH}/bin/initdb -D ${ConfigProvider.configs.DATA_PATH} --locale=en_US.UTF-8`);
      LOG.info("Database initialized.");
    } else {
      LOG.info("Database already initialized.");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error(`Error initializing database: ${message}`);
    throw err;
  }
}
async function startDB() {
  try {
    const startCommand = `${ConfigProvider.configs.POSTGRES_PATH}/bin/pg_ctl -D ${ConfigProvider.configs.DATA_PATH} -l logfile start`;
    execSync(startCommand);
    LOG.info("PostgreSQL started");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error(`Error starting PostgreSQL: ${message}`);
    throw err;
  }
}
async function stopDB() {
  try {
    const dataPath = ConfigProvider.configs.DATA_PATH;
    const stopCommand = `${ConfigProvider.configs.POSTGRES_PATH}/bin/pg_ctl -D ${dataPath} stop`;
    execSync(stopCommand);
    LOG.info("PostgreSQL stopped");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error(`Error stopping PostgreSQL: ${message}`);
  }
}
async function createDatabaseIfNeeded() {
  const client2 = new libExports.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "",
    // Без пароля
    database: "postgres"
    // Используем базу данных по умолчанию
  });
  try {
    LOG.info('Connecting to PostgreSQL server to check for database "mydb"...');
    await client2.connect();
    LOG.info("Successfully connected to PostgreSQL server");
    const res = await client2.query("SELECT 1 FROM pg_database WHERE datname = $1", ["mydb"]);
    if (res.rowCount === 0) {
      LOG.info('Creating database "mydb"...');
      await client2.query("CREATE DATABASE mydb");
      LOG.info('Database "mydb" created.');
    } else {
      LOG.info('Database "mydb" already exists.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error(`Error in createDatabaseIfNeeded: ${message}`);
    throw err;
  } finally {
    try {
      await client2.end();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      LOG.error(`Error closing connection: ${message}`);
    }
  }
}
async function applyMigrations() {
  try {
    await createDatabaseIfNeeded();
    const client2 = new libExports.Client({
      host: "localhost",
      port: 5432,
      user: "",
      password: "",
      // без пароля
      database: "mydb"
      // имя базы данных
    });
    LOG.info('Applying migrations to "mydb"...');
    await client2.connect();
    LOG.info('Connected to "mydb" for migrations');
    const migrations = [
      `CREATE TABLE IF NOT EXISTS models (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        avatar TEXT,
        url TEXT,
        download_url TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        model_id INTEGER REFERENCES models(id)
      );`,
      `CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER REFERENCES chats(id),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    ];
    for (const migration of migrations) {
      await client2.query(migration);
    }
    LOG.info("Migrations applied successfully");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error(`Error applying migrations: ${message}`);
    throw err;
  }
}
dotenv.config();
const __dirname$1 = path$1.dirname(fileURLToPath(import.meta.url));
console.log("process env: 1");
{
  ConfigProvider.initConfigs(__dirname$1);
  console.log("process env: 2");
  WindowProvider.init(__dirname$1);
  LOG.init(WindowProvider.getWin);
  WinContentProvider.init(WindowProvider.getWin);
  RouterProvider.init();
}
const onWindowAllClosed = () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
};
const onBeforeQuit = () => {
  stopLLM();
  stopDB();
};
const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    WindowProvider.createWindow();
  }
};
const onWhenReady = async () => {
  try {
    WindowProvider.createWindow();
    runLLM();
    await initDB();
    await startDB();
    await applyMigrations();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    LOG.error("Error during initialization: " + message);
  }
};
app.on("window-all-closed", onWindowAllClosed);
app.on("before-quit", onBeforeQuit);
app.on("activate", onActivate);
app.whenReady().then(onWhenReady);
