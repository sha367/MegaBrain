import { LLMProvider } from "../providers/LLMProvider";

export class LLMService {
  /** Launch LLM. */
  public static async launch() {
    try {
      await LLMProvider.runLLM();
      await LLMProvider.waitForLLMServer();
    } catch {
      console.error('Failed to launch LLM');
    }
  }
}
