import { IpcMainInvokeEvent } from "electron";
import { ModelController } from "./ModelController";
import { getMockChats } from "./../mock";

export class ChatController {
  static async getChats(_: IpcMainInvokeEvent) {
    const chats = await getMockChats();
    const modelIds = chats.map((chat) => chat.modelId);
    const models = await ModelController.getModels(_, { ids: modelIds });

    const chatsWithModels = chats.map((chat) => {
      const model = models.data.find((model) => model.id === chat.modelId);

      return {
        ...chat,
        model,
      };
    });

    return {
      data: [
        ...chatsWithModels,
      ],
    };
  }

  static async getChat(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    const modelId = "llama1";
    const model = await ModelController.getModel(_, { id: modelId });
    const chat = (await getMockChats()).find((chat) => chat.id === params.id);

    const chatWithModel = {
      ...chat,
      model,
    };

    return {
      data: {
        ...chatWithModel,
      },
    };
  }

  static async updateChat(
    _: IpcMainInvokeEvent,
    params: { id: string, message: string }
  ) {
    const chat = await ChatController.getChat(_, { id: params.id });
    const modelId = chat.data.modelId;

    if (!modelId) {
      return {
        error: {
          message: "Model not found",
        },
      };
    }
    const model = await ModelController.getModel(_, { id: modelId });

    const chatWithModel = {
      ...chat.data,
      model,
    };

    return {
      data: {
        ...chatWithModel,
      },
    };
  }

  static async createNewChat(
    _: IpcMainInvokeEvent,
    params: { modelId: string, message: string },
  ) {
    const { modelId, message } = params;
    const model = await ModelController.getModel(_, { id: modelId });

    const newChat = {
      id: 'somenewid',
      modelId,
      lastMessage: message,
    };

    // mockChats.push(newChat);

    const newChatWithModel = {
      ...newChat,
      model,
    };

    return {
      data: {
        ...newChatWithModel,
      },
    };
  }

  static async deleteChat(
    _: IpcMainInvokeEvent,
    params: { id: string },
  ) {
    const chat = await ChatController.getChat(_, { id: params.id });
    const modelId = chat.data.modelId;

    if (!modelId) {
      return {
        error: {
          message: "Chat not found",
        },
      };
    }

    const model = await ModelController.getModel(_, { id: modelId });

    const newChatWithModel = {
      ...chat,
      model,
    };

    return {
      data: {
        ...newChatWithModel,
      },
    };
  }
};
