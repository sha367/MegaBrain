import { chatApi } from "@/api/chatApi";
import { TChat } from "@/components/chatsList/chatsList.types";
import { defineStore } from "pinia";

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [] as TChat[],
  }),
  actions: {
    async getChats() {
      this.chats = await chatApi.getChats();
    },
    async updateChat(params: { id: string, message: string }) {
      await chatApi.updateChat(params);
    },
    async createNewChat(params: { message: string, modelId: string }) {
      await chatApi.createNewChat(params);

    },
    async deleteChat(params: { id: string }) {
      await chatApi.deleteChat(params);
    },
  },
});
