import { WindowProvider } from "./WindowProvider";

export class LogProvider {
  /** Log a message */
  public static log(...messages: unknown[]) {
    console.log(...messages);
    WindowProvider.sendMainProcessMessage('main-process-log', ...messages);
  }

  /** Log a warning */
  public static warn(...messages: unknown[]) {
    console.warn(messages);
    WindowProvider.sendMainProcessMessage('main-process-warn', ...messages);
  }

  /** Log an error */
  public static error(...messages: unknown[]) {
    console.error(messages);
    WindowProvider.sendMainProcessMessage('main-process-error', ...messages);
  }
}
