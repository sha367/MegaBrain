import { ConfigProvider } from "./providers/ConfigProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import { LogProvider } from "./providers/LogProvider";
import { LLMService } from "./services/LLMService";
import { PostgresService } from "./services/PostgresService";
import { MainService } from "./services/MainService";
import { ServerService } from "./services/ServerService";

ConfigProvider.touchProvider();

export const startElectron = async () => {
  try {
    LoadingProvider.value = true;

    MainService.launch();

    Promise.all([
      ServerService.launch(),
      PostgresService.launch(),
      LLMService.launch(),
    ]).then(() => {
      LoadingProvider.value = false;
    });
  } catch (error) {
    LogProvider.error(error);
  }
};
