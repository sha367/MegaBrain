<script setup lang="ts">
import { RouterLink } from 'vue-router';
import MyContainer from './shared/myContainer.vue';
</script>

<template>
  <div class='flex w-screen items-center bg-blue-500 py-4 shadow-2xl'>
    <MyContainer>
      <div class='flex justify-between' />
      <RouterLink to='/'>
        <h1 class='color-white flex items-center gap-1 text-xl'>
          <div
            _i-hugeicons:ai-brain-03
            _text-4xl
          />
          <span>MyGPX</span>
        </h1>
      </RouterLink>
    </MyContainer>
  </div>
</template>
