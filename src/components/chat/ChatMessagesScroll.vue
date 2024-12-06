<script setup lang="ts">
import { nextTick, ref } from 'vue';

const scroll = ref<HTMLElement | null>(null);

const scrollToBottom = (force?: boolean) => {
  nextTick(() => {
    if (!scroll.value) return;

    const hasToScroll = force || (scroll.value.scrollHeight - scroll.value.scrollTop - scroll.value.clientHeight) < 200;

    if (!hasToScroll) return;

    scroll.value.scrollTo({
      top: scroll?.value?.scrollHeight,
      behavior: 'smooth',
    });
  });
};

defineExpose({
  scrollToBottom,
})
</script>

<template>
  <div
    ref='scroll'
    class='w-full h-full flex flex-col gap-4 overflow-y-auto'
  >
    <slot />
  </div>
</template>
