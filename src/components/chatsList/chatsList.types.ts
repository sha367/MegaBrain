import { TModel } from "../models/models.types";

export type TChat = {
  id: string;
  modelId: string;
  model: TModel
  lastMessage: string;
};
