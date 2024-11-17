import { IpcMainInvokeEvent } from "electron";
import { getMockMessages } from "./../mock";

export class MessagesController {
  static async getChatMessages(_: IpcMainInvokeEvent, params: { chatId: string }) {
    const messages = (await getMockMessages()).filter((message) => message.chatId === params.chatId);

    return {
      data: [
        ...messages,
      ],
    };
  }
};
