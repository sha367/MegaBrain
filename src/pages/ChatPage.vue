<script lang='ts' setup>
import { TChatMessage } from '@/components/chat/chat.types';
import ChatBottomPannel from '@/components/chat/ChatBottomPannel.vue';
import ChatMessageBlock from '@/components/chat/ChatMessageBlock.vue';
import ChatMessagesScroll from '@/components/chat/ChatMessagesScroll.vue';
import MyContainer from '@/components/shared/myContainer.vue';
import { ref, watch } from 'vue';

const messages = ref<TChatMessage[]>([
  {
    id: 'aaa1',
    content: 'Hello, how can I help you?',
    from: '__llama__',
    timestamp: new Date('01-11-2024 15:20').toISOString(),
  },
  {
    id: 'aaa2',
    content: 'Tell me a joke',
    from: '__user__',
    timestamp: new Date('01-11-2024 16:30').toISOString(),
  },
  {
    id: 'aaa3',
    content: 'Why don’t skeletons fight each other?\n\nThey don’t have the guts!',
    from: '__llama__',
    timestamp: new Date('01-11-2024 20:01').toISOString(),
  },
  {
    id: 'aaa1',
    content: 'Hello, how can I help you?',
    from: '__llama__',
    timestamp: new Date('01-11-2024 15:20').toISOString(),
  },
  {
    id: 'aaa2',
    content: 'Tell me a joke',
    from: '__user__',
    timestamp: new Date('01-11-2024 16:30').toISOString(),
  },
  {
    id: 'aaa3',
    content: 'Why don’t skeletons fight each other?\n\nThey don’t have the guts!',
    from: '__llama__',
    timestamp: new Date('01-11-2024 20:01').toISOString(),
  },
  {
    id: 'aaa1',
    content: 'Hello, how can I help you?',
    from: '__llama__',
    timestamp: new Date('01-11-2024 15:20').toISOString(),
  },
  {
    id: 'aaa2',
    content: 'Tell me a joke',
    from: '__user__',
    timestamp: new Date('01-11-2024 16:30').toISOString(),
  },
  {
    id: 'aaa3',
    content: 'Why don’t skeletons fight each other?\n\nThey don’t have the guts!',
    from: '__llama__',
    timestamp: new Date('01-11-2024 20:01').toISOString(),
  },
  {
    id: 'aaa1',
    content: 'Hello, how can I help you?',
    from: '__llama__',
    timestamp: new Date('01-11-2024 15:20').toISOString(),
  },
  {
    id: 'aaa2',
    content: 'Tell me a joke',
    from: '__user__',
    timestamp: new Date('01-11-2024 16:30').toISOString(),
  },
  {
    id: 'aaa3',
    content: 'Why don’t skeletons fight each other?\n\nThey don’t have the guts!',
    from: '__llama__',
    timestamp: new Date('01-11-2024 20:01').toISOString(),
  },
]);

/** Send the value from ChatBottomPannel to server */
const sendMessage = (content: string) => {
  if (content) {
    messages.value = [...messages.value, {
      id: Math.random().toString(36).substr(2, 9),
      content: content,
      from: '__user__',
      timestamp: new Date().toISOString(),
    }];
    chatMessagesScroll.value?.scrollToBottom(true);
  }
};

const chatMessagesScroll = ref<InstanceType<typeof ChatMessagesScroll> | null>(null);

watch(() => messages.value, () => {
  chatMessagesScroll.value?.scrollToBottom();
});
</script>

<template>
  <div class='flex flex-col grow overflow-hidden'>
    <div class='flex flex-col grow overflow-hidden'>
      <ChatMessagesScroll ref='chatMessagesScroll'>
        <MyContainer
          tiny
          class='flex flex-col h-full gap-2 py-4'
        >
          <TransitionGroup
            enter-from-class='opacity-0 -translate-x-200'
            enter-active-class='transform transition-all duration-500'
            enter-to-class='opacity-100 translate-x-0'
            leave-from-class='opacity-100 translate-x-0'
            leave-active-class='transition-opacity'
            leave-to-class='opacity-0 -translate-x-200'
          >
            <ChatMessageBlock
              v-for='message in messages'
              :key='message.id'
              :message='message'
            >
              {{ message }}
            </ChatMessageBlock>
          </TransitionGroup>
        </MyContainer>
      </ChatMessagesScroll>
    </div>
    <ChatBottomPannel
      clear-on-send
      @send-message='sendMessage'
    />
  </div>
</template>
