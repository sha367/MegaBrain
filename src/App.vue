<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import { useCommonStore } from './store/common';
import MyScreenLoader from './components/shared/myScreenLoader.vue';

const commonStore = useCommonStore();
</script>

<template>
  <div class='w-screen h-screen overflow-hidden flex flex-col bg-gray-100 dark:bg-gray-800'>
    <MyScreenLoader :show='commonStore.loading' />

    <AppHeader />

    <RouterView />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
</style>
