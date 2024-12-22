import { LogProvider } from '../providers/LogProvider';
import { ServerProvider } from '../providers/ServerProvider';

export class ServerService {
  /** Launch the server */
  public static async launch() {
    try {
      await ServerProvider.launch();
      await ServerProvider.waitForReady();
      LogProvider.log('Server started');
    } catch (err) {
      LogProvider.error('Failed to launch server', err);
    }
  }
}
