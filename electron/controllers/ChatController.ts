import { IpcMainInvokeEvent } from "electron";
import { ModelController } from "./ModelController";

export class ChatController {
  static async getChats(_: IpcMainInvokeEvent) {
    const modelId = "llama1";
    const model = await ModelController.getModel(_, { id: modelId });

    return {
      data: [
        {
          id: "1",
          name: "Chat 1",
          modelId,
          model,
          description: "Chat 1 description",
          lastMessage: "Chat 1 last message",
        },
        {
          id: "2",
          name: "Chat 1",
          modelId,
          model,
          description: "Chat 1 description",
          lastMessage: "Chat 1 last message",
        },
      ],
    };
  }

  static async getChat(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    const modelId = "llama1";
    const model = await ModelController.getModel(_, { id: modelId });

    return {
      data: {
        id: params.id,
        name: "Chat 1",
        modelId,
        model,
        description: "Chat 1 description",
        lastMessage: "Chat 1 last message",
      },
    };
  }

  static async updateChat(
    _: IpcMainInvokeEvent,
    params: { id: string, message: string }
  ) {
    const modelId = "llama1";
    const model = await ModelController.getModel(_, { id: modelId });

    return {
      data: {
        id: params.id,
        name: "Chat 1",
        modelId,
        model,
        description: "Chat 1 description",
        lastMessage: params.message,
      },
    };
  }

  static async createNewChat(
    _: IpcMainInvokeEvent,
    params: { modelId: string, message: string },
  ) {
    const { modelId, message } = params;
    const model = await ModelController.getModel(_, { id: modelId });

    return {
      data: {
        id: 'somenewid',
        name: "Chat 1",
        modelId,
        model,
        description: "Chat 1 description",
        lastMessage: message,
      },
    };
  }

  static async deleteChat(
    _: IpcMainInvokeEvent,
    params: { id: string },
  ) {
    const chat = ChatController.getChat(_, { id: params.id });

    return {
      data: {
        ...chat,
      },
    };
  }
};
