import { defineStore } from 'pinia';

interface CommonState {
  loadingStatus?: false;
}

export const useCommonStore = defineStore('common', {
  state: (): CommonState => ({
    loadingStatus: undefined,
  }),
  actions: {
    setLoading(newValue: boolean) {

    },
    initLoadingStatusHandler() {

    }
  },
});
