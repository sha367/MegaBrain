<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import MyContainer from './shared/myContainer.vue';

const { currentRoute } = useRouter();

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class='w-screen bg-blue-500 shadow-2xl color-white'>
    <MyContainer class='py-4'>
      <div class='flex justify-between items-center'>
        <div class='cursor-pointer text-2xl'>
          <div _i-line-md:menu />
        </div>

        <RouterLink to='/'>
          <h1 class='flex items-center gap-1 text-xl'>
            <span class='font-black'>MyGPX</span>
          </h1>
        </RouterLink>

        <div class='flex gap-4 items-center'>
          <RouterLink
            :to='currentRoute.path !== "/SettingsPage" ? "/SettingsPage" : "/ChatPage"'
            class='rounded-full overflow-hidden p-1'
            :class='currentRoute.path === "/SettingsPage" ? "bg-gray-100 text-blue-500" : ""'
          >
            <div
              _i-line-md:cog-filled
              _text-2xl
            />
          </RouterLink>
          <div
            class='cursor-pointer text-2xl'
            @click='() => toggleDark()'
          >
            <div
              v-if='isDark'
              _i-line-md:moon-rising-filled-loop
            />
            <div
              v-else
              _i-line-md:sun-rising-filled-loop
            />
          </div>
        </div>
      </div>
    </MyContainer>
  </div>
</template>
