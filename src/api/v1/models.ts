import { apiClient } from "@/lib/utils/apiClient";

export interface IModel {
  name: string;
  modified_at?: string;
  size?: number;
  digest?: string;
  details?: {
    format: string;
    family: string;
  }
}

export interface IGetModelsParams {
  limit?: number;
  offset?: number;
}
/** Get models */
export const GET_MODELS = async (params: IGetModelsParams) => {
  return apiClient.get<{ models: IModel[] }>('/api/models', { params });
};
export const GET_RECOMMENDED_MODELS = async (params: IGetModelsParams) => {
  return apiClient.get<{ models: IModel[] }>('/api/models/recommended', { params });
}

export interface IPullModelParams {
  name: string;
}
/** Pull model */
export const PULL_MODEL = async (params: IPullModelParams) => {
  return apiClient.post<IModel[]>('/api/model/pull', params);
};
