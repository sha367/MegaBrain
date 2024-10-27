import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    value: 0,
  }),
  actions: {
    setValue(newValue: number) {
      console.log('setValue', newValue);
      this.value = newValue;
    },
  },
  getters: {
    doubledValue(state) {
      return state.value * 2;
    }
  }
});
