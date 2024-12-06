<script setup lang="ts">
import {
  RouterLink,
  // useRouter
} from 'vue-router';
import MyContainer from './shared/myContainer.vue';

// const { currentRoute } = useRouter();

// import { useDark, useToggle } from '@vueuse/core'

// const isDark = useDark()
// const toggleDark = useToggle(isDark)
</script>

<template>
  <div class='w-screen bg-white shadow-md text-gray-900 z-10'>
    <MyContainer class='py-4'>
      <div class='flex justify-between items-center'>
        <RouterLink to='/'>
          <h1 class='flex items-center gap-1 text-xl'>
            <span class='font-black'>MyGPX</span>
          </h1>
        </RouterLink>

        <div class='flex gap-4 items-center text-gray-400'>
          <!-- <RouterLink
            :to='currentRoute.path !== "/SettingsPage" ? "/SettingsPage" : "/ChatPage"'
            class='p-2 rounded-full overflow-hidden p-1 text-2xl hover:bg-gray-200 hover:text-indigo-500'
            :class='currentRoute.path === "/SettingsPage" ? "text-indigo-500" : ""'
          >
            <div
              _i-line-md:cog-filled
            />
          </RouterLink> -->
          <!-- <div
            class='p-2 rounded-full cursor-pointer text-2xl hover:text-indigo-500 hover:bg-gray-200'
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
          </div> -->
        </div>
      </div>
    </MyContainer>
  </div>
</template>
