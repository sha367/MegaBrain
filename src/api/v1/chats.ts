import { apiClient } from "@/lib/utils/apiClient";

/** Chat entity */
export interface IChat {
  id: string;
  name: string;
  model: string;
  created_at: string;
  updated_at: string | null;
}

export interface IGetChatsParams {
  limit?: number;
  offset?: number;
}
/** Get chats */
export const GET_CHATS = async (params: IGetChatsParams) => {
  return apiClient.get<{ items: IChat[], total: number }>('/api/chats', { params });
};

export interface IPostChatParams {
  name: string;
  model: string;
}
/** Create chat */
export const CREATE_CHAT = async (params: IPostChatParams) => {
  return apiClient.post<IChat>('/api/chat', params);
};

export interface IDeleteChatParams {
  id: string;
}
/** Delete chat */
export const DELETE_CHAT = async (params: IDeleteChatParams) => {
  return apiClient.delete('/api/chat', { params });
};
