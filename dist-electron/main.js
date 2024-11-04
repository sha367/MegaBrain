import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import fs$1 from "node:fs";
import { exec, spawn } from "node:child_process";
import http from "node:http";
import require$$0 from "fs";
import require$$1 from "path";
import require$$2 from "os";
import require$$3 from "crypto";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var main$1 = { exports: {} };
const name = "dotenv";
const version$1 = "16.4.5";
const description = "Loads environment variables from .env file";
const main = "lib/main.js";
const types = "lib/main.d.ts";
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
const scripts = {
  "dts-check": "tsc --project tests/types/tsconfig.json",
  lint: "standard",
  "lint-readme": "standard-markdown",
  pretest: "npm run lint && npm run dts-check",
  test: "tap tests/*.js --100 -Rspec",
  "test:coverage": "tap --coverage-report=lcov",
  prerelease: "npm test",
  release: "standard-version"
};
const repository = {
  type: "git",
  url: "git://github.com/motdotla/dotenv.git"
};
const funding = "https://dotenvx.com";
const keywords = [
  "dotenv",
  "env",
  ".env",
  "environment",
  "variables",
  "config",
  "settings"
];
const readmeFilename = "README.md";
const license = "BSD-2-Clause";
const devDependencies = {
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
  name,
  version: version$1,
  description,
  main,
  types,
  exports,
  scripts,
  repository,
  funding,
  keywords,
  readmeFilename,
  license,
  devDependencies,
  engines,
  browser
};
const fs = require$$0;
const path = require$$1;
const os = require$$2;
const crypto = require$$3;
const packageJson = require$$4;
const version = packageJson.version;
const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function parse(src) {
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
  const result = DotenvModule.configDotenv({ path: vaultPath });
  if (!result.parsed) {
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
      const attrs = _instructions(result, key);
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
  console.log(`[dotenv@${version}][INFO] ${message}`);
}
function _warn(message) {
  console.log(`[dotenv@${version}][WARN] ${message}`);
}
function _debug(message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`);
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
function _instructions(result, dotenvKey) {
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
  const ciphertext = result.parsed[environmentKey];
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
    const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
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
  parse,
  populate
};
main$1.exports.configDotenv = DotenvModule.configDotenv;
main$1.exports._configVault = DotenvModule._configVault;
main$1.exports._parseVault = DotenvModule._parseVault;
main$1.exports.config = DotenvModule.config;
main$1.exports.decrypt = DotenvModule.decrypt;
main$1.exports.parse = DotenvModule.parse;
main$1.exports.populate = DotenvModule.populate;
main$1.exports = DotenvModule;
var mainExports = main$1.exports;
const dotenv = /* @__PURE__ */ getDefaultExportFromCjs(mainExports);
dotenv.config();
createRequire(import.meta.url);
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
const needRunLLM = process.env.RUN_LLM === "1";
const userHome = process.env.HOME || process.env.USERPROFILE;
const ollamaModelsPath = `${userHome}/ollama_models`;
process.env.OLLAMA_MODELS = ollamaModelsPath;
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
const RESOURCES_PATH = VITE_DEV_SERVER_URL ? path$1.join(__dirname, "../resources") : process.resourcesPath;
let win = null;
const llmPath = path$1.join(RESOURCES_PATH, "ollama/llm");
const modelFilePath = path$1.join(ollamaModelsPath, "Modelfile");
const winSendMessage = (message) => {
  win == null ? void 0 : win.webContents.send("main-process-message", message);
};
const winSendError = (message) => {
  win == null ? void 0 : win.webContents.send("main-process-error", message);
};
const winSendWarn = (message) => {
  win == null ? void 0 : win.webContents.send("main-process-warn", message);
};
function createModelfileIfNeeded() {
  if (fs$1.existsSync(modelFilePath)) return;
  const files = fs$1.readdirSync(ollamaModelsPath);
  const ggufFile = files.find((file) => file.endsWith(".gguf"));
  if (!ggufFile) {
    throw new Error("No .gguf model file found in ollama_models directory.");
  }
  const modelfileContent = `FROM ${path$1.join(ollamaModelsPath, ggufFile)}`;
  fs$1.writeFileSync(modelFilePath, modelfileContent);
  console.log(`Created Modelfile: ${modelfileContent}`);
}
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.openDevTools();
  win.webContents.on("did-finish-load", async () => {
    try {
      console.log("Trying to run LLM...");
      winSendMessage("Trying to run LLM...");
      createModelfileIfNeeded();
      await runLLM();
      console.log("LLM started successfully");
      winSendMessage("LLM started successfully");
    } catch (error) {
      console.error("Failed to run LLM:", error);
      winSendError(`Failed to run LLM: ${error}`);
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
}
async function runLLM() {
  if (!needRunLLM) return;
  if (!fs$1.existsSync(llmPath)) {
    winSendError(`LLM executable not found at path: ${llmPath}`);
    throw new Error(`LLM executable not found at ${llmPath}`);
  }
  await runCommand(`${llmPath}`, ["serve"], true);
  console.log("LLM serve started.");
  winSendMessage("LLM serve started.");
  await waitForServer();
  const modelExists = await checkModelExists("defaultModel");
  if (!modelExists) {
    console.log("Creating model...");
    winSendMessage("Creating model...");
    await runCommand(`${llmPath}`, [
      "create",
      "defaultModel",
      "-f",
      modelFilePath
    ]);
  } else {
    console.warn("Model already exists. Skipping creation.");
    winSendWarn("Model already exists. Skipping creation.");
  }
}
async function checkModelExists(modelName) {
  return new Promise((resolve, reject) => {
    exec(`${llmPath} list`, (error, stdout) => {
      if (error) {
        console.error("Error checking model list:", error);
        winSendError(`Error checking model list: ${error}`);
        reject(error);
      } else {
        const modelExists = stdout.includes(`${modelName}:latest`);
        if (modelExists) {
          winSendMessage(`Models: 
${stdout}`);
        }
        resolve(modelExists);
      }
    });
  });
}
function runCommand(command, args, detached = false) {
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
}
function waitForServer() {
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
function stopLLM() {
  exec(`pkill -f ${llmPath}`, (error) => {
    if (!needRunLLM) return;
    if (error) console.error("Failed to terminate LLM process:", error);
    else console.log("LLM process terminated.");
  });
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    stopLLM();
    app.quit();
  }
});
app.on("before-quit", stopLLM);
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
