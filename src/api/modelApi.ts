import { ipcRequest } from "@/plugins/ipc/ipcRequest";

const getModels = async () => {
  return ipcRequest('models:get');
}

const downloadModel = async (params: { id: string }) => {
  return ipcRequest('model:download', params);
}

const deleteModel = async (params: { id: string }) => {
  return ipcRequest('model:delete', params);
}

export const modelApi = {
  getModels,
  downloadModel,
  deleteModel
};
