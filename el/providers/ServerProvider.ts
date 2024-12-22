import http from 'node:http';
import { startServer } from './../../server';

export class ServerProvider {
  /** Initialize the LLMProvider */
  public static init() {}

  /** Launch the server. */
  public static async launch() {
    return startServer();
  }

  /** Wait for the server to be ready. */
  public static async waitForReady() {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        http
          .get('http://localhost:3000', (res) => {
            if (res.statusCode === 200) {
              clearInterval(interval);
              resolve();
            }
          })
          .on('error', () => {});
      });

      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, 15000);
    });
  }
}

ServerProvider.init();
