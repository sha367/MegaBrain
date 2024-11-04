<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TModel } from '../models/models.types';
import { mockModels } from '@/mock/models';
import ModelCard from '../models/ModelCard.vue';

const models = ref<TModel[]>([]);
const selectedModel = ref<TModel | null>(null);

onMounted(() => {
  models.value = mockModels;
  selectedModel.value = models.value[0];
});
</script>

<template>
  <div class='w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4'>
    <b class='text-center text-2xl text-gray-400'>Choose the model to start conversation with</b>

    <div class='p-2 max-h-full w-full overflow-y-auto flex flex-wrap items-center justify-center gap-2'>
      <ModelCard
        v-for='model in models'
        :key='model.id'
        :model='model'
        :active='!!model.id && model.id === selectedModel?.id'
        @on-click='selectedModel = model'
      />
    </div>
  </div>
</template>
