<script lang="ts" setup>
import { ref } from 'vue';
import TextArea from '../TextArea.vue';
import MyContainer from '../shared/myContainer.vue';

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
      <TextArea
        v-model='input'
      />
      <ElButton
        class='bg-blue-500 text-white rounded-full p-2'
        type='primary'
        @click='sendMessage'
      >
        <div
          _i-hugeicons:arrow-right-01
          _text-2xl
        />
      </ElButton>
    </div>
  </MyContainer>
</template>
