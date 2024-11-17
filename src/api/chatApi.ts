import { ipcRequest } from "@/plugins/ipc/ipcRequest";

const getChats = async () => {
  return ipcRequest('chats:get');
}

const getChat = async (params: { id: string }) => {
  return ipcRequest('chat:get', params);
}

const updateChat = async (params: { id: string, message: string }) => {
  return ipcRequest('chat:update', params);
}

const createNewChat = async (params: { message: string, modelId: string }) => {
  return ipcRequest('chat:create', params);
}

const deleteChat = async (params: { id: string }) => {
  return ipcRequest('chat:delete', params);
}

export const chatApi = {
  getChats,
  getChat,
  updateChat,
  createNewChat,
  deleteChat
};
