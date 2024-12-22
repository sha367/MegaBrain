import { startServer } from "./../../server";

export class ServerService {
  /** Launch the server */
  public static launch() {
    startServer();
  }

  /** Wait for the server to be ready */
  public static async waitForReady() {}
}
