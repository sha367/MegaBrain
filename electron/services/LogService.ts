import { WindowContentService } from "./WindowContentService";

/**
 * Log messages and send to the renderer console.
 */
export class LogService {
  /**
   * Log a message.
   */
  public static log(...args: unknown[]) {
    console.log(...args);
    WindowContentService.sendToAllWindows('log-channel', ...args);
  }

  /**
   * Log a warning.
   */
  public static warn(...args: unknown[]) {
    console.warn(...args);
    WindowContentService.sendToAllWindows('warn-channel', ...args);
  }

  /**
   * Log an error.
   */
  public static error(...args: unknown[]) {
    console.error(...args);
    WindowContentService.sendToAllWindows('error-channel', ...args);
  }
}
