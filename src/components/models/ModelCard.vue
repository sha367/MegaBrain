<script setup lang="ts">
import { ElAvatar } from 'element-plus';
import { TModel } from './models.types';

const props = defineProps<{
  model: TModel;
  active?: boolean;
}>();

const emit = defineEmits(['on-click']);
</script>

<template>
  <div
    class='model-card'
    :class='props.active ? "model-card--active" : ""'
    @click='() => emit("on-click", props.model)'
  >
    <div class='shrink-0'>
      <ElAvatar src='/images/ollama-avatar.svg' />
    </div>
    <div class='flex flex-col'>
      <div class='font-semibold'>
        {{ props.model.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model-card {
  @apply flex flex-row gap-4 rounded-xl border shadow-md p-4 cursor-pointer bg-gray-100;

  &--active {
    @apply bg-gradient-to-br from-rose-500 to-indigo-700 text-white;
  }
}
</style>
