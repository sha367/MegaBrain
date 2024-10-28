<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import myContainer from '@/components/myContainer.vue';
</script>

<template>
  <div class="flex w-screen items-center bg-blue-300 py-4">
    <myContainer>
      <h1 class="color-white flex items-center gap-1 text-xl">
        <div _i-hugeicons:ai-brain-03 _text-4xl></div>
        <span>MyGPX</span>
      </h1>
    </myContainer>
  </div>

  <nav>
    <RouterLink to="/">
      <ElButton>Home</ElButton>
    </RouterLink>
    <RouterLink to="/chat">
      <ElButton>Chat</ElButton>
    </RouterLink>
    <RouterLink to="/settings">
      <ElButton>Settings</ElButton>
    </RouterLink>
  </nav>

  <RouterView />
</template>
