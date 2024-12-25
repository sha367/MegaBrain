import { apiClient } from "@/lib/utils/apiClient";
import { IUser } from "./users";

export interface IMessage {
  id: string;
  content: string;
  role: IUser['role'];
  chat_id: string;
  created_at: string;
  updated_at: string;
}
export interface IGetMessagesParams {
  limit?: number;
  offset?: number;
  chat_id: string;
}
/** Get messages from chat */
export const GET_MESSAGES = async (params: IGetMessagesParams) => {
  return apiClient.get<{ items: IMessage[], total: number }>('/api/messages', { params });
};

export interface IPostMessageParams {
  chat_id: number;
  content: string;
}
/** Post message to a chat */
export const POST_MESSAGE = async (params: IPostMessageParams) => {
  return apiClient.post<IMessage>('/api/message', params);
};
