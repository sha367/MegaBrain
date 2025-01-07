import { DELETE_CHAT, GET_CHATS, IChat } from '@/api/v1';
import { create } from 'zustand';

interface AppState {
  chats: IChat[];
  refetchChats: () => void;
  deleteChat: (chat: IChat) => void;
}

export const useChatsStore = create<AppState>((set) => ({
  chats: [],

  refetchChats: async () => {
    try {
      console.log('Fetching chats');
      const response = await GET_CHATS({ limit: 1000 });

      const data = response?.data

      if (!data?.items) {
        throw new Error('No chats found');
      }

      set(() => ({ chats: data.items || [] }));
    } catch (error) {
      console.error('Error fetching chats', error);
    }
  },

  deleteChat: async (chat: IChat) => {
    try {
      const response = await DELETE_CHAT({ id: chat.id });

      if (!response?.data) {
        throw new Error('Error deleting chat');
      }

      set((state) => ({
        chats: state.chats.filter((c) => c.id !== chat.id),
      }));
    } catch (error) {
      console.error('Error deleting chat', error);
    }
  }
}));
