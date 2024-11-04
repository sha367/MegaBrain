<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();


</script>

<template>
  <transition
    enter-from-class='opacity-0'
    enter-active-class='transition-opacity duration-100'
    enter-to-class='opacity-100'
    leave-from-class='opacity-100'
    leave-active-class='transition-opacity duration-500'
    leave-to-class='opacity-0'
  >
    <div
      v-if='props.show'
      class='loader-screen'
    >
      <div class='flex flex-col gap-8 justify-center items-center w-full h-full text-white'>
        <div
          _i-svg-spinners:ring-resize
          _text-8xl
        />
        <span class='text-2xl'>MyGPX</span>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.loader-screen {
  @apply
    fixed top-0 left-0 w-screen h-screen
    bg-blue-500 bg-gradient-to-br from-white to-indigo-500
    z-50;
}
</style>
