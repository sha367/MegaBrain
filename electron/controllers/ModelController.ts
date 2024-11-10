import { IpcMainInvokeEvent } from "electron";
import { ConfigProvider } from "./../providers/configProvider";
import path from 'node:path';

export class ModelController {
  static async getModels(
    _: IpcMainInvokeEvent,
  ) {
    return {
      data: [
        {
          id: "1",
          name: "Model 1",
          description: "Model 1 description",
          avatar: path.join(ConfigProvider.configs.VITE_PUBLIC, "images", "ollama-avatar.svg"),
          url: "https://www.google.com",
          downloadUrl: "https://www.google.com",
        },
        {
          id: "2",
          name: "Model 2",
          description: "Model 2 description",
          avatar: path.join(ConfigProvider.configs.VITE_PUBLIC, "images", "ollama-avatar.svg"),
          url: "https://www.google.com",
          downloadUrl: "https://www.google.com",
        },
        {
          id: "3",
          name: "Model 3",
          description: "Model 3 description",
          avatar: path.join(ConfigProvider.configs.VITE_PUBLIC, "images", "ollama-avatar.svg"),
          url: "https://www.google.com",
          downloadUrl: "https://www.google.com",
        },
      ],
    };
  }

  static async getModel(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    return {
      data: {
        id: params.id,
        name: "Model 1",
        description: "Model 1 description",
        avatar: path.join(ConfigProvider.configs.VITE_PUBLIC, "images", "ollama-avatar.svg"),
        url: "https://www.google.com",
        downloadUrl: "https://www.google.com",
      },
    };
  }

  static async downloadModel(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    return {
      data: {
        id: params.id,
      },
    };
  }

  static async deleteModel(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    return {
      data: {
        id: params.id,
      },
    };
  }
};
