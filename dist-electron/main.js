import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { exec } from "node:child_process";
import "node:http";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userHome = process.env.HOME || process.env.USERPROFILE;
const ollamaModelsPath = `${userHome}/ollama_models`;
process.env.OLLAMA_MODELS = ollamaModelsPath;
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
const RESOURCES_PATH = VITE_DEV_SERVER_URL ? path.join(__dirname, "../resources") : process.resourcesPath;
let win = null;
const llmPath = path.join(RESOURCES_PATH, "ollama/llm");
const modelFilePath = path.join(ollamaModelsPath, "Modelfile");
const winSendMessage = (message) => {
  win == null ? void 0 : win.webContents.send("main-process-message", message);
};
const winSendError = (message) => {
  win == null ? void 0 : win.webContents.send("main-process-error", message);
};
function createModelfileIfNeeded() {
  if (fs.existsSync(modelFilePath)) return;
  const files = fs.readdirSync(ollamaModelsPath);
  const ggufFile = files.find((file) => file.endsWith(".gguf"));
  if (!ggufFile) {
    throw new Error("No .gguf model file found in ollama_models directory.");
  }
  const modelfileContent = `FROM ${path.join(ollamaModelsPath, ggufFile)}`;
  fs.writeFileSync(modelFilePath, modelfileContent);
  console.log(`Created Modelfile: ${modelfileContent}`);
}
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.openDevTools();
  win.webContents.on("did-finish-load", async () => {
    try {
      console.log("Trying to run LLM...");
      winSendMessage("Trying to run LLM...");
      createModelfileIfNeeded();
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
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
function stopLLM() {
  exec(`pkill -f ${llmPath}`, (error) => {
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
