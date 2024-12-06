<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ChatsList from './chatsList/ChatsList.vue';
import { computed } from 'vue';
import MyIconButton from './shared/MyIconButton.vue';

const router = useRouter();
const route = useRoute();

const isChatPage = computed(() => route.name === 'NewChatPage' || route.name === 'ChatPage');
const isSettingsPage = computed(() => route.name === 'SettingsPage');

const goToNewChatPage = () => {
  router.push({ name: 'NewChatPage' });
};

const goToSettingsPage = () => {
  router.push({ name: 'SettingsPage' });
};
</script>

<template>
  <div class='min-w-[20rem] w-[20rem] h-full flex flex-col bg-gray-200 border-r'>
    <div class='w-full bg-white shadow-2xl flex p-2 px-4 justify-center gap-4 z-2'>
      <MyIconButton
        :active='isChatPage'
        @on-click='goToNewChatPage()'
      >
        <div _i-line-md:chat-bubble-filled />
      </MyIconButton>
      <MyIconButton
        :active='isSettingsPage'
        @on-click='goToSettingsPage()'
      >
        <div _i-line-md:cog-filled />
      </MyIconButton>
      <MyIconButton>
        <a
          href='https://github.com/sha367/MyGPX'
          target='_blank'
        >
          <div _i-line-md:github />
        </a>
      </MyIconButton>
    </div>

    <ChatsList />
  </div>
</template>
