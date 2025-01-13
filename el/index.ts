import { ConfigProvider } from "./providers/ConfigProvider";
import { LoadingProvider } from "./providers/LoadingProvider";
import { LogProvider } from "./providers/LogProvider";
import { LLMService } from "./services/LLMService";
// import { PostgresService } from "./services/PostgresService";
import { MainService } from "./services/MainService";
import { ServerService } from "./services/ServerService";
import { startElRouter } from "./router";
// import { SqliteService } from "./services/SqliteService";

ConfigProvider.touchProvider();

export const startElectron = async () => {
  startElRouter();

  try {
    LoadingProvider.value = true;

    MainService.launch();

    Promise.all([
      ServerService.launch(),
      // PostgresService.launch(),
      // SqliteService.launch(),
      LLMService.launch(),
    ]).finally(() => {
      LoadingProvider.value = false;
    });
  } catch (error) {
    LogProvider.error(error);
  }
};
