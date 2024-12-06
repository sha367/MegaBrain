<script lang='ts' setup>
import ChatBottomPannel from '@/components/chat/ChatBottomPannel.vue';

const emit = defineEmits(['send-message']);
</script>

<template>
  <div class='flex flex-col grow overflow-hidden'>
    <div class='flex flex-col grow overflow-hidden'>
      <slot />
    </div>
    <ChatBottomPannel
      clear-on-send
      @send-message='(...args) => emit("send-message", args)'
    />
  </div>
</template>
