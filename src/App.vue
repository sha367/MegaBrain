<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Container from "./components/shared/Container.vue";
</script>

<template>
  <div class="w-screen bg-blue-300 flex items-center py-4">
    <Container>
      <h1 class="flex items-center gap-1 color-white text-xl">
        <div _i-hugeicons:ai-brain-03 _text-4xl></div>
        <span>MyGPX</span>
      </h1>
    </Container>
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

<style scoped></style>
