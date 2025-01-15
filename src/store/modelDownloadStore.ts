import { proxy, subscribe } from "valtio";
import { PULL_MODEL, IPullModelParams, IModel } from "@/api/v1/models";

export interface DownloadTask {
  modelName: string;
  progress: number;
  status: "queued" | "downloading" | "processing" | "completed" | "error";
  error?: string;
}

interface DownloadState {
  downloads: Record<string, DownloadTask>;
  queue: string[];
  activeDownloads: number;
  maxConcurrent: number;
}

// Create the state
const state = proxy<DownloadState>({
  downloads: {},
  queue: [],
  activeDownloads: 0,
  maxConcurrent: 2,
});

// Define a mapping function
const mapApiStatusToDownloadStatus = (apiStatus: string): DownloadTask["status"] => {
    if (apiStatus.startsWith("pulling")) {
        return "downloading";
      }
    switch (apiStatus) {
    case "pulling manifest":
    case "pulling":
    case "downloading":
      return "downloading";
    case "verifying sha256 digest":
    case "writing manifest":
    case "removing any unused layers":
      return "processing";
    case "success":
      return "completed";
    default:
      return "error"; // Default to error if status is unknown
  }
};

// Actions
export const modelDownloadActions = {
  enqueueDownload: async (params: IPullModelParams) => {
    // If already downloading or queued, skip
    if (state.downloads[params.name]) return;

    // Add to downloads and queue
    state.downloads[params.name] = {
      modelName: params.name,
      progress: 0,
      status: "queued",
    };
    state.queue.push(params.name);

    // Start download if under concurrent limit
    if (state.activeDownloads < state.maxConcurrent) {
      await modelDownloadActions.processNextDownload();
    }
  },

  processNextDownload: async () => {
    if (state.activeDownloads >= state.maxConcurrent || state.queue.length === 0) return;

    const modelName = state.queue[0];
    state.queue.splice(0, 1); // Remove from queue
    state.activeDownloads += 1;
    state.downloads[modelName].status = "downloading";

try {
await PULL_MODEL(
    { model: modelName },
    (progress) => {
      if (state.downloads[modelName]) {
        state.downloads[modelName] = {
          ...state.downloads[modelName],
          progress: progress.completed && progress.total ? (progress.completed / progress.total) * 100 : 0,
          status: mapApiStatusToDownloadStatus(progress.status),
          ...(progress.message && { error: progress.message }),
        };
      }
    }
  );


      state.downloads[modelName].status = "completed";
      state.downloads[modelName].progress = 100;
    } catch (error) {
      console.error(error);
      state.downloads[modelName].status = "error";
      state.downloads[modelName].error = error instanceof Error ? error.message : "Unknown error";
    } finally {
      state.activeDownloads -= 1;
      // Process next download in queue
      await modelDownloadActions.processNextDownload();
    }
  },

  removeDownload: (modelName: string) => {
    delete state.downloads[modelName];
    state.queue = state.queue.filter(name => name !== modelName);
  },

  getDownloadStatus: (modelName: string): DownloadTask | undefined => {
    return state.downloads[modelName];
  }
};

export const downloadStore = {
  state,
  actions: modelDownloadActions
}; 