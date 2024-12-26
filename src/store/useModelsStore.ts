import { GET_MODELS, GET_RECOMMENDED_MODELS, IModel } from '@/api/v1/models';
import { create } from 'zustand';

interface IModelsStore {
  models: IModel[];
  recommendedModels: IModel[];
  refetchModels: () => void;
}

export const useModelsStore = create<IModelsStore>((set) => ({
  models: [],
  recommendedModels: [],

  refetchModels: async () => {
    try {
      const response = await GET_MODELS({});

      if (!response?.data?.models) {
        throw new Error('No data');
      }

      const models = response.data.models || [];

      set(() => ({ models }));

      const recommended = await GET_RECOMMENDED_MODELS({});

      if (!recommended?.data?.models) {
        throw new Error('No data');
      }

      const recommendedModels = (recommended.data.models || []).filter(model => !models.find(m => m.name === model.name));

      set(() => ({ recommendedModels }));
    } catch (error) {
      console.error('Error fetching models', error);
    }
  }
}));
