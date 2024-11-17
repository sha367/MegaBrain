import { ipcRequest } from "@/plugins/ipc/ipcRequest";

const getMessages = async (params: { chatId: string }) => {
  return ipcRequest('messages:get', params);
}

export const messagesApi = {
  getMessages,
};
