import { PostgresQueriesService } from './../services/PostgresService';

export class MessagesController {
  public static async getMessages() {
    return await PostgresQueriesService.getAllRecords('messages');
  }

  public static async createMessage(_: Electron.IpcMainInvokeEvent, chatId: number, messageText: string) {
    await PostgresQueriesService.addRecord('messages', { chat_id: chatId, message_text: messageText });
  }

  public static async updateMessage(_: Electron.IpcMainInvokeEvent, id: number, fields: Record<string, unknown>) {
    await PostgresQueriesService.updateRecordById('messages', id, fields);
  }

  public static async deleteMessage(_: Electron.IpcMainInvokeEvent, id: number) {
    await PostgresQueriesService.deleteRecordById('messages', id);
  }
}
