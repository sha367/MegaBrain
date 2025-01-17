import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { ollamaModelsStore } from "@/store/ollamaModelsStore";

export const useOllamaLibrary = (autoFetch = true) => {
  const { models, isLoading, error, lastFetched } = useSnapshot(ollamaModelsStore.state);

  useEffect(() => {
    if (autoFetch) {
      ollamaModelsStore.actions.fetchModels();
    }
  }, [autoFetch]);

  return {
    models,
    loading: isLoading,
    error,
    lastFetched,
    refetch: () => ollamaModelsStore.actions.fetchModels(true),
  };
}; 