<script lang="ts" setup>
import { ref } from 'vue';
import TextArea from '../TextArea.vue';
import MyContainer from '../shared/myContainer.vue';
import MyIconButton from '../shared/MyIconButton.vue';

/** PROPS */
const props = defineProps<{
  onSendMessage: (message: string) => void;
  clearOnSend?: boolean;
}>();

/** User's input value */
const input = ref('');

/** Send message handler */
const sendMessage = () => {
  props.onSendMessage(input.value);

  if (props.clearOnSend) {
    input.value = '';
  }
}
</script>

<template>
  <MyContainer
    tiny
    class='py-4'
  >
    <div class='flex justify-center items-end gap-2'>
      <div class='relative w-full'>
        <TextArea
          v-model='input'
          class='chat-bottom-pannel__textarea'
        />

        <div class='flex gap-1 absolute bottom-1.5 right-1.5'>
          <MyIconButton
            variant='primary'
            @on-click='sendMessage'
          >
            <div
              _i-hugeicons:arrow-right-01
              _text-2xl
            />
          </MyIconButton>
        </div>
      </div>
    </div>
  </MyContainer>
</template>

<style scoped lang='scss'>
.chat-bottom-pannel__textarea {
  :deep(textarea) {
    @apply rounded-3xl;
  }

  :deep(textarea) {
    @apply p-3 pr-20 text-base;
  }
}
</style>
