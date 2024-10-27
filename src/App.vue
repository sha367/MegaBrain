<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <h1>MyGPX</h1>

  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/chat">Chat</RouterLink> |
    <RouterLink to="/settings">Settings</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>

</style>
