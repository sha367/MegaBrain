import { proxy, subscribe } from "valtio";
import { OllamaLibraryService } from "@/services/ollamaLibrary";

interface OllamaModelsState {
  models: Awaited<ReturnType<typeof OllamaLibraryService.getAvailableModels>>;
  lastFetched: number | null;
  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEY = "ollamaModelsState";
const REFRESH_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Load initial state from localStorage
const loadPersistedState = (): Partial<OllamaModelsState> => {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      // Only return the state if it's not too old
      if (parsed.lastFetched && Date.now() - parsed.lastFetched < REFRESH_THRESHOLD) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error loading persisted state:", error);
  }
  return {};
};

const state = proxy<OllamaModelsState>({
  models: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  ...loadPersistedState(), // Load persisted state on initialization
});

// Subscribe to state changes and persist to localStorage
subscribe(state, () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      models: state.models,
      lastFetched: state.lastFetched,
      // Don't persist loading and error states
    }));
  } catch (error) {
    console.error("Error persisting state:", error);
  }
});

export const ollamaModelsActions = {
  fetchModels: async (force = false) => {
    // Skip if models were fetched recently and force is false
    if (
      !force &&
      state.lastFetched &&
      Date.now() - state.lastFetched < REFRESH_THRESHOLD &&
      state.models.length > 0
    ) {
      return;
    }

    try {
      state.isLoading = true;
      state.error = null;
      const models = await OllamaLibraryService.getAvailableModels();
      state.models = models;
      state.lastFetched = Date.now();
    } catch (error) {
      state.error = error instanceof Error ? error.message : "Failed to fetch models";
      console.error("Error fetching models:", error);
    } finally {
      state.isLoading = false;
    }
  },

  clearModels: () => {
    state.models = [];
    state.lastFetched = null;
    state.error = null;
    // Also clear from localStorage
    localStorage.removeItem(STORAGE_KEY);
  },
};

export const ollamaModelsStore = {
  state,
  actions: ollamaModelsActions,
}; 