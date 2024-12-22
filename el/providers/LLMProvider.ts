import { exec } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import { promisify } from 'node:util';

import { ConfigProvider } from './ConfigProvider';
import { LogProvider } from './LogProvider';

import { runCommand } from './../lib/utils/runCommand';

const execAsync = promisify(exec);

export class LLMProvider {
  /** Initialize the LLMProvider */
  public static init() {}

  /** Check if Ollama is running. */
  private static async isOllamaRunning(): Promise<boolean> {
    return new Promise((resolve) => {
      http
        .get(ConfigProvider.$props.LLM_LOCAL_ADDRESS, (res) => {
          if (res.statusCode === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .on('error', () => resolve(false))
        .end();
    });
  }

  /** Run the LLM server. */
  public static async runLLM() {
    // Проверяем, работает ли Ollama
    const isOllamaRunning = await this.isOllamaRunning();
    if (isOllamaRunning) {
      LogProvider.log('Ollama server is already running.');
      return;
    }

    const llmFile = ConfigProvider.$props.LLM_EXEC_PATH;

    // Check if the LLM executable exists
    if (!fs.existsSync(llmFile)) {
      throw new Error(`LLM executable not found at ${llmFile}`);
    }

    // Run LLM serve command.
    await runCommand(`${llmFile}`, ['serve'], true);
    LogProvider.log('LLM serve started.');
  }

  /** Wait for the LLM server to start. */
  public static waitForLLMServer() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const isOllamaRunning = await LLMProvider.isOllamaRunning();
        if (isOllamaRunning) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('LLM server failed to start in time.'));
      }, 15000);
    });
  }

  /** Stop LLM. */
  public static async stopLLM() {
    const llmPath = ConfigProvider.$props.LLM_EXEC_PATH;
    const { stderr } = await execAsync(`pkill -f ${llmPath}`);

    if (stderr) {
      throw new Error(stderr);
    }

    LogProvider.log('LLM process terminated.');
  }
}

LLMProvider.init();
