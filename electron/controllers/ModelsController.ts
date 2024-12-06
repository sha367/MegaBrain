import { PostgresQueriesService } from './../services/PostgresService';

export class ModelsController {
  public static async getModels() {
    return await PostgresQueriesService.getAllRecords('models');
  }

  public static async createModel(_: Electron.IpcMainInvokeEvent, name: string, url: string) {
    await PostgresQueriesService.addRecord('models', { name, url });
  }

  public static async updateModel(_: Electron.IpcMainInvokeEvent, id: number, fields: Record<string, unknown>) {
    await PostgresQueriesService.updateRecordById('models', id, fields);
  }

  public static async deleteModel(_: Electron.IpcMainInvokeEvent, id: number) {
    await PostgresQueriesService.deleteRecordById('models', id);
  }
}
