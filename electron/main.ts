import { app, BrowserWindow } from 'electron';

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { spawn, exec } from 'node:child_process';
import http from 'node:http';

import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 
 * Whether to run LLM binary or not.
 */
const needRunLLM = process.env.RUN_LLM === '1';

const userHome = process.env.HOME || process.env.USERPROFILE;
const ollamaModelsPath = `${userHome}/ollama_models`;
process.env.OLLAMA_MODELS = ollamaModelsPath;

process.env.APP_ROOT = path.join(__dirname, '..');
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
// const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

const RESOURCES_PATH = VITE_DEV_SERVER_URL ? path.join(__dirname, '../resources') : process.resourcesPath;
let win: BrowserWindow | null = null;

const llmPath = path.join(RESOURCES_PATH, 'ollama/llm');

// Путь к файлу Modelfile в папке ollama_models
const modelFilePath = path.join(ollamaModelsPath, 'Modelfile');

const winSendMessage = (message: string) => {
  win?.webContents.send('main-process-message', message)
}
const winSendError = (message: string) => {
  win?.webContents.send('main-process-error', message)
}
const winSendWarn = (message: string) => {
  win?.webContents.send('main-process-warn', message)
}

// Создание Modelfile, если его нет
function createModelfileIfNeeded() {
  if (fs.existsSync(modelFilePath)) return;

  // Поиск первого .gguf файла в ollamaModelsPath
  const files = fs.readdirSync(ollamaModelsPath);
  const ggufFile = files.find(file => file.endsWith('.gguf'));

  if (!ggufFile) {
    throw new Error('No .gguf model file found in ollama_models directory.');
  }

  // Запись пути к gguf модели в Modelfile
  const modelfileContent = `FROM ${path.join(ollamaModelsPath, ggufFile)}`;
  fs.writeFileSync(modelFilePath, modelfileContent);
  console.log(`Created Modelfile: ${modelfileContent}`);
}

// Создание окна приложения
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  win.webContents.openDevTools();

  win.webContents.on('did-finish-load', async () => {
    try {
      console.log('Trying to run LLM...');
      winSendMessage('Trying to run LLM...');
      createModelfileIfNeeded(); // Проверка и создание Modelfile
      await runLLM();
      console.log('LLM started successfully');
      winSendMessage('LLM started successfully');
    } catch (error) {
      console.error('Failed to run LLM:', error);
      winSendError(`Failed to run LLM: ${error}`);
    }
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Запуск LLM по шагам
async function runLLM() {
  if (!needRunLLM) return;

  if (!fs.existsSync(llmPath)) {
    winSendError(`LLM executable not found at path: ${llmPath}`);
    throw new Error(`LLM executable not found at ${llmPath}`);
  }

  await runCommand(`${llmPath}`, ['serve'], true);
  console.log('LLM serve started.');
  winSendMessage('LLM serve started.');

  await waitForServer();

  const modelExists = await checkModelExists('defaultModel');
  if (!modelExists) {
    console.log('Creating model...');
    winSendMessage('Creating model...');
    await runCommand(`${llmPath}`, ['create', 'defaultModel', '-f', modelFilePath]);
  } else {
    console.warn('Model already exists. Skipping creation.');
    winSendWarn('Model already exists. Skipping creation.');
  }
}

// Проверка наличия модели
async function checkModelExists(modelName: string) {
  return new Promise((resolve, reject) => {
    exec(`${llmPath} list`, (error, stdout) => {
      if (error) {
        console.error('Error checking model list:', error);
        winSendError(`Error checking model list: ${error}`);
        reject(error);
      } else {
        const modelExists = stdout.includes(`${modelName}:latest`);
        if (modelExists) {
          winSendMessage(`Models: \n${stdout}`);
        }
        resolve(modelExists);
      }
    });
  });
}

// Функция для выполнения команд
function runCommand(command: string, args: string[], detached = false) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { detached, stdio: 'inherit' });

    if (!detached) {
      process.on('close', (code) => {
        if (code === 0) resolve(true);
        else reject(new Error(`Command failed with exit code ${code}`));
      });
    } else {
      resolve(true);
    }
  });
}

// Ожидание запуска сервера
function waitForServer() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      http.get('http://127.0.0.1:11434', (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve(true);
        }
      }).on('error', () => {});
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('LLM server failed to start in time.'));
    }, 15000);
  });
}

// Прерывание процесса LLM при закрытии приложения
function stopLLM() {
  exec(`pkill -f ${llmPath}`, (error) => {
    if (!needRunLLM) return; // Skip logs if RUN_LLM is not set, but try to kill a process anyway
    if (error) console.error('Failed to terminate LLM process:', error);
    else console.log('LLM process terminated.');
  });
}

// Обработка завершения работы приложения
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopLLM();
    app.quit();
  }
});

app.on('before-quit', stopLLM);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
