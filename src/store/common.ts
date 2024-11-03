import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(newValue: boolean) {
      this.loading = newValue;
    },
  },
});
