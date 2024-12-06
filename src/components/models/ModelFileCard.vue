<script setup lang="ts">
import MyIconButton from '../shared/MyIconButton.vue';
import { TModel } from './models.types';

const props = defineProps<{
  item: TModel;
}>();
</script>

<template>
  <div class='p-4 rounded-xl flex gap-4 border bg-gray-100'>
    <ElAvatar src='/images/ollama-avatar.svg' />

    <div class='flex flex-col'>
      <div class='text-lg font-semibold'>
        {{ props.item.name }}
      </div>
    </div>

    <div class='flex gap-2'>
      <!-- <MyIconButton
        v-if='!props.item.downloadUrl'
        variant='danger'
      >
        <div _i-hugeicons:delete-02 />
      </MyIconButton> -->
      <MyIconButton v-if='props.item.url'>
        <div _i-hugeicons:cloud-download />
      </MyIconButton>
      <a
        v-if='props.item.url'
        :href='props.item.url'
        target='_blank'
      >
        <MyIconButton>
          <div _i-hugeicons:link-square-02 />
        </MyIconButton>
      </a>
    </div>
  </div>
</template>
