import { apiClient } from "@/lib/utils/apiClient";
import { BASE_URL } from "@/lib/utils/apiClient";
import { errorStore } from "@/store/errorStore";

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
  insecure?: boolean;
  stream?: boolean;
}

export interface IProgress {
  status: string;
  digest?: string;
  total?: number;
  completed?: number;
  message?: string;
}

export const PULL_MODEL = async (
  params: IPullModelParams,
  onProgress: (progress: IProgress) => void
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/model/pull`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...params, stream: true }),
  });
  if (!response.body) {
    throw new Error("No response body from server");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    if (value) {
      const chunk = decoder.decode(value, { stream: !done });
      try {
        const progress = JSON.parse(chunk);
        onProgress(progress);
      } catch (error) {
        errorStore.actions.showError(`Error in model pull: ${error}`);
        console.error("Error parsing chunk2:", chunk);
      }
    }
  }
};