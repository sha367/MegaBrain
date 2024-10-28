<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <AppHeader />

  <nav class='bg-red flex'>
    <RouterLink to='/ChatPage'>
      <ElButton>Chat</ElButton>
    </RouterLink>
    <RouterLink to='/SettingsPage'>
      <ElButton>Settings</ElButton>
    </RouterLink>
  </nav>

  <RouterView />
</template>

<style lang="scss">
Div {
  @apply flex border border-2 border-blue-500 bg-blue-500 p-4 text-white shadow-2xl;
}

.div123 {
  @apply bg-red;
}
</style>
