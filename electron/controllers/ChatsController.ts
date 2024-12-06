import { PostgresQueriesService } from './../services/PostgresService';

export class ChatsController {
  public static async getChats() {
    return await PostgresQueriesService.getAllRecords('chats');
  }

  public static async createChat(_: Electron.IpcMainInvokeEvent, { title, model_id }: { title: string, model_id: number }) {
    await PostgresQueriesService.addRecord('chats', { title, model_id: model_id });
  }

  public static async updateChat(_: Electron.IpcMainInvokeEvent, id: number, fields: Record<string, unknown>) {
    await PostgresQueriesService.updateRecordById('chats', id, fields);
  }

  public static async deleteChat(_: Electron.IpcMainInvokeEvent, id: number) {
    await PostgresQueriesService.deleteRecordById('chats', id);
  }
}
