import { apiClient } from "@/lib/utils/apiClient";
import { IMessage } from "./messages";

/** Chat entity */
export interface IChat {
  id: number;
  name?: string;
  lastMessage?: IMessage;
  model?: string;
  created_at: string;
  updated_at: string;
}

export interface IGetChatsParams {
  limit?: number;
  offset?: number;
}
/** Get chats */
export const GET_CHATS = async (params: IGetChatsParams) => {
  return apiClient.get<IChat[]>('/api/chats', { params });
};

export interface IPostChatParams {
  name?: string;
  model?: string;
}
/** Create chat */
export const CREATE_CHAT = async (params: IPostChatParams) => {
  return apiClient.post<IChat>('/api/chat', params);
};

export interface IDeleteChatParams {
  id: number;
}
/** Delete chat */
export const DELETE_CHAT = async (params: IDeleteChatParams) => {
  return apiClient.delete('/api/chat', { params });
};
