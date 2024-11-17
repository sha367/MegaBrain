import { IpcMainInvokeEvent } from "electron";
import { getMockModels } from "./../mock";

export class ModelController {
  static async getModels(
    _: IpcMainInvokeEvent,
    params?: { ids?: string[] }
  ) {
    const models = (await getMockModels()).filter(params?.ids ? (model) => params?.ids?.includes(model.id) : () => Boolean);

    return {
      data: [
        ...models,
      ]
    };
  }

  static async getModel(
    _: IpcMainInvokeEvent,
    params: { id: string }
  ) {
    const model = (await getMockModels()).find((model) => model.id === params.id);

    return {
      data: {
        ...model
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
