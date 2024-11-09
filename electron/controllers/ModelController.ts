// import { IpcMainInvokeEvent } from "electron";

export class ModelController {
  static async getModels() {
    return 'getModels';
  }

  static async downloadModel() {
    return 'downloadModel';
  }

  static async deleteModel() {
    return 'deleteModel';
  }
};
