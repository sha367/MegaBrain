import { ConfigProvider as CP } from "./../providers/configProvider";
import { LOG } from "./../providers/logProvider";

import path from 'node:path';
import http from 'node:http';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { runCommand } from "./childProcessService";

// Создание Modelfile, если его нет
function createModelfileIfNeeded() {
  if (fs.existsSync(CP.configs.MODEL_FILE_PATH)) return;

  // Поиск первого .gguf файла в ollamaModelsPath
  const files = fs.readdirSync(CP.configs.OLLAMA_MODELS);
  const ggufFile = files.find((file) => file.endsWith('.gguf'));

  if (!ggufFile) {
    throw new Error('No .gguf model file found in ollama_models directory.');
  }

  // Запись пути к gguf модели в Modelfile
  const modelfileContent = `FROM ${path.join(CP.configs.OLLAMA_MODELS, ggufFile)}`;
  fs.writeFileSync(CP.configs.MODEL_FILE_PATH, modelfileContent);
  console.log(`Created Modelfile: ${modelfileContent}`);
}

export async function runLLM() {
  try {
    await _runLLM();
  } catch (error) {
    LOG.error(`Failed to run LLM: ${error}`);
  }
}

// Запуск LLM по шагам
async function _runLLM() {
  if (!CP.configs.RUN_LLM) return;

  LOG.info('Trying to run LLM...');

  await createModelfileIfNeeded();

  if (!fs.existsSync(CP.configs.LLM_PATH)) {
    LOG.error(`LLM executable not found at path: ${CP.configs.LLM_PATH}`);
    throw new Error(`LLM executable not found at ${CP.configs.LLM_PATH}`);
  }

  await runCommand(`${CP.configs.LLM_PATH}`, ['serve'], true);
  LOG.info('LLM serve started.');

  await waitForLLMServer();

  const modelExists = await checkModelExists('defaultModel');
  if (!modelExists) {
    LOG.info('Creating model...');
    await runCommand(`${CP.configs.LLM_PATH}`, [
      'create',
      'defaultModel',
      '-f',
      CP.configs.MODEL_FILE_PATH,
    ]);
  } else {
    LOG.warn('Model already exists. Skipping creation.');
  }

  // LOG.info('LLM started successfully');
}

// Прерывание процесса LLM при закрытии приложения
export async function stopLLM() {
  exec(`pkill -f ${CP.configs.LLM_PATH}`, (error) => {
    if (!CP.configs.RUN_LLM) return; // Skip logs if RUN_LLM is not set, but try to kill a process anyway
    if (error) console.error('Failed to terminate LLM process:', error);
    else console.log('LLM process terminated.');
  });
}

// Проверка наличия модели
export async function checkModelExists(modelName: string) {
  return new Promise((resolve, reject) => {
    exec(`${CP.configs.LLM_PATH} list`, (error, stdout) => {
      if (error) {
        LOG.error(`Error checking model list: ${error}`);
        reject(error);
      } else {
        const modelExists = stdout.includes(`${modelName}:latest`);
        if (modelExists) {
          LOG.info(`Models: \n${stdout}`);
        }
        resolve(modelExists);
      }
    });
  });
}

/**
 * Wait for LLM server to start. Usually it works on port 11434.
 * TODO: make port configurable
 */
export function waitForLLMServer() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      http
        .get('http://127.0.0.1:11434', (res) => {
          if (res.statusCode === 200) {
            clearInterval(interval);
            resolve(true);
          }
        })
        .on('error', () => {});
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('LLM server failed to start in time.'));
    }, 15000);
  });
}
