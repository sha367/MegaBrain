<script setup lang="ts">
import { TModel } from '../models/models.types';
import ModelCard from '../models/ModelCard.vue';

const props = defineProps<{
  models: TModel[];
  selectedModel: TModel | null;
}>();

const emit = defineEmits(['select-model']);
</script>

<template>
  <div class='w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4'>
    <b class='text-center text-2xl text-gray-400'>Choose the model to start conversation with</b>

    <div class='p-2 max-h-full w-full overflow-y-auto flex flex-wrap items-center justify-center gap-2'>
      <ModelCard
        v-for='model in props.models'
        :key='model.id'
        :model='model'
        :active='!!model.id && model.id === selectedModel?.id'
        @on-click='() => emit("select-model", model)'
      />
    </div>
  </div>
</template>
