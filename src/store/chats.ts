import { defineStore } from "pinia";

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [],
  }),
  actions: {
    async getChats() {

    },
    async updateChat(params: { id: string, message: string }) {

    },
    async createNewChat(params: { message: string, modelId: string }) {

    },
    async deleteChat(params: { id: string }) {

    },
  },
});
