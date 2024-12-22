import { LogProvider } from "../providers/LogProvider";
import { LLMProvider } from "../providers/LLMProvider";

export class LLMService {
  /** Launch LLM. */
  public static async launch() {
    try {
      await LLMProvider.runLLM();
      await LLMProvider.waitForLLMServer();
      LogProvider.log("LLM started");
    } catch (err) {
      LogProvider.error("Failed to launch LLM server", err);
    }
  }
}
