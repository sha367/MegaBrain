import { proxy } from "valtio";
import { GET_MODELS, IModel } from "@/api/v1/models";

interface DownloadedModelsState {
  models: string[];
  modelsDetails: IModel[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const state = proxy<DownloadedModelsState>({
  models: [],
  isLoading: false,
  error: null,
  lastFetched: null,
  modelsDetails: [],
});

export const downloadedModelsActions = {
  fetchDownloadedModels: async () => {
    try {
      state.isLoading = true;
      state.error = null;
      const response  = await GET_MODELS({});
      console.log("response",response);
      state.models = response.data.models.map(model => model.name);
      state.modelsDetails = response.data.models;
      console.log("state.models",state.models);
      state.lastFetched = Date.now();
    } catch (error) {
      state.error = error instanceof Error ? error.message : "Failed to fetch downloaded models";
      console.error("Error fetching downloaded models:", error);
    } finally {
      state.isLoading = false;
    }
  },

  addModel: (modelName: string) => {
    if (!state.models.includes(modelName)) {
      state.models.push(modelName);
    }
  },

  removeModel: (modelName: string) => {
    state.models = state.models.filter(name => name !== modelName);
  },
};

export const downloadedModelsStore = {
  state,
  actions: downloadedModelsActions,
}; 