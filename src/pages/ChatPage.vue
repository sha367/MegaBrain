<script lang='ts' setup>
import { TChatMessage } from '@/components/chat/chat.types';
import ChatMessageBlock from '@/components/chat/ChatMessageBlock.vue';
import ChatMessagesScroll from '@/components/chat/ChatMessagesScroll.vue';
import ChatTemplate from '@/components/chat/ChatTemplate.vue';
import MyContainer from '@/components/shared/myContainer.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const chatId = computed(() => route.params.id as string);
const messages = ref<TChatMessage[]>([]);

/** Load chat messages */
const loadMessages = async (id: string) => {
  try {
    // const res = await messagesApi.getMessages({ chatId: id });
    // console.log('loadMessages', res);

    // checkResponse(res);

    // messages.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

watch(chatId, (newChatId) => {
  loadMessages(newChatId);
});

onMounted(() => {
  loadMessages(chatId.value);
});

const sendMessageRequest = async (content: string) => {
  try {
    // const res = await chatApi.updateChat({ id: chatId.value, message: content });
    // console.log('sendMessageRequest', res);

    // checkResponse(res);

    // messages.value.push(res.data);
  } catch (err) {
    console.log(err);
  }
};

/** Send the value from ChatBottomPannel to server */
const sendMessage = (content: string) => {
  if (content) {
    sendMessageRequest(content);
    chatMessagesScroll.value?.scrollToBottom(true);
  }
};

const chatMessagesScroll = ref<InstanceType<typeof ChatMessagesScroll> | null>(null);

watch(() => messages.value, () => {
  chatMessagesScroll.value?.scrollToBottom();
});
</script>

<template>
  <ChatTemplate @send-message='sendMessage'>
    <ChatMessagesScroll
      ref='chatMessagesScroll'
    >
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
  </ChatTemplate>
</template>
