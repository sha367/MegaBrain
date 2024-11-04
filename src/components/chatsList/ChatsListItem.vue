<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { TChat } from './chatsList.types';
import MyIconButton from '../shared/MyIconButton.vue';

const props = defineProps<{
  item: TChat,
  active?: boolean,
}>();

const router = useRouter();

const goToChat = (id: TChat['id']) => {
  router.push({ name: 'ChatPage', params: { id } });
};

const onDeleteChat = () => {
  console.log('Delete chat', props.item.id);
};
</script>

<template>
  <div
    class='chats-list-item'
    :class='props.active ? "chats-list-item--active" : ""'
    @click='() => goToChat(props.item.id)'
  >
    <div class='flex gap-2'>
      <div class='shrink-0'>
        <ElAvatar src='/images/ollama-avatar.svg' />
      </div>
      <div class='flex flex-col'>
        <div class='font-semibold'>
          {{ props.item.name }}
        </div>
        <div class='text-gray-500 text-xs overflow-hidden max-w-[10rem] truncate'>
          {{ props.item.lastMessage.message }}
        </div>
      </div>
    </div>

    <div class='shrink-0'>
      <MyIconButton
        variant='danger'
        @on-click='() => onDeleteChat()'
      >
        <div _i-hugeicons:delete-02 />
      </MyIconButton>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.chats-list-item {
  @apply
    rounded-xl w-full max-w-full bg-white flex justify-between gap-2
    shadow-md p-2 cursor-pointer transition-all border-1 hover:border-indigo-500;

  &--active {
    @apply bg-gradient-to-br from-gray-300 to-indigo-300 text-white border-indigo-300;
  }
}
</style>
