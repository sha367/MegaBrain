<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ChatsListItem from './ChatsListItem.vue';
import { TChat } from './chatsList.types';
// import { mockChatsList } from '@/mock/chatsList';
import { useRoute } from 'vue-router';
import { chatApi } from '@/api/chatApi';

const route = useRoute();
const currentChatId = computed(() => {
  if (route.params.id) {
    return route.params.id
  }

  return undefined;
});
const chats = ref<TChat[]>([]);

onMounted(() => {
  loadModels();
});

const loadModels = async () => {
  try {
    const res = await chatApi.getChats();
    console.log(res);

    if (res.error || !res.data) {
      throw new Error('Couldn\'t load chats');
    }

    chats.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class='w-full grow-1 p-4 flex flex-col overflow-y-auto gap-2'>
    <ChatsListItem
      v-for='chat in chats'
      :key='chat.id'
      :item='chat'
      :active='!!chat.id && chat.id === currentChatId'
    />
  </div>
</template>
