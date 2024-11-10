import { defineStore } from 'pinia';

interface CommonState {
  loadingStatus?: typeof window.mainProcessLoadingStatus;
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    loadingStatus: undefined,
  }),
  actions: {
    setLoading(newValue: typeof window.mainProcessLoadingStatus) {
      this.loadingStatus = newValue;
    },
    initLoadingStatusHandler() {
      this.loadingStatus = window.mainProcessLoadingStatus;

      window.ipcRenderer.on(
        'main-process-loading-status',
        (_, status: typeof window.mainProcessLoadingStatus) => {
          this.loadingStatus = status;
        }
      );
    }
  },
});
