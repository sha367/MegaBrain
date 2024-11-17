<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ChatsListItem from './ChatsListItem.vue';
import { TChat } from './chatsList.types';
import { useRoute } from 'vue-router';
import { chatApi } from '@/api/chatApi';
import { checkResponse } from '@/utils/checkResponse';

const route = useRoute();
const currentChatId = computed(() => {
  if (route.params.id) {
    return route.params.id
  }

  return undefined;
});
const chats = ref<TChat[]>([]);

/** Load list of existed chats */
const loadChats = async () => {
  try {
    const res = await chatApi.getChats();
    console.log('loadChats', res);

    if (res.error || !res.data) {
      throw new Error('Couldn\'t load chats');
    }

    chats.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

/** Delete chat from the list */
const deleteChat = async (id: string) => {
  try {
    const res = await chatApi.deleteChat({ id });
    console.log('deleteChat', res);

    checkResponse(res);

    chats.value = chats.value.filter((chat) => chat.id !== id);
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  loadChats();
});
</script>

<template>
  <div class='w-full grow-1 p-4 flex flex-col overflow-y-auto gap-2'>
    <ChatsListItem
      v-for='chat in chats'
      :key='chat.id'
      :item='chat'
      :active='!!chat.id && chat.id === currentChatId'
      @on-delete='deleteChat(chat.id)'
    />
  </div>
</template>
