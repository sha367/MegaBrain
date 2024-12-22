import { LoadingProvider } from "./providers/LoadingProvider";
import { LogProvider } from "./providers/LogProvider";
import { PostgresService } from "./services/PostgresService";
import { RendererService } from "./services/RendererService";
import { ServerService } from "./services/ServerService";

export const startElectron = async () => {
  try {
    LoadingProvider.value = true;

    RendererService.launch();

    ServerService.launch();
    PostgresService.launch();

    Promise.all([
      ServerService.waitForReady(),
      PostgresService.waitForReady(),
    ]).then(() => {
      LoadingProvider.value = false;
    });
  } catch (error) {
    LogProvider.error(error);
  }
};
