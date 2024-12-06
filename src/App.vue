<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import { useCommonStore } from './store/common';
import MyScreenLoader from './components/shared/myScreenLoader.vue';
import AppSidebar from './components/AppSidebar.vue';

const commonStore = useCommonStore();
commonStore.initLoadingStatusHandler();
</script>

<template>
  <div class='w-screen h-screen flex flex-col'>
    <MyScreenLoader :status='commonStore.loadingStatus' />

    <AppHeader />

    <div
      v-if='!commonStore.loadingStatus'
      class='flex flex-grow overflow-hidden'
    >
      <AppSidebar />

      <main class='flex-grow flex flex-col bg-white'>
        <!-- <div class='p-4 bg-gray-300'>
          Main Header
        </div> -->
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
</style>
