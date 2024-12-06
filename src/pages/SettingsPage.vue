<script setup lang="ts">
import ModelFileCard from '@/components/models/ModelFileCard.vue';
import { TModel } from '@/components/models/models.types';
import MyContainer from '@/components/shared/myContainer.vue';
import { onMounted, ref } from 'vue';

const modelFiles = ref<TModel[]>([]);
const suggestedModelFiles = ref<TModel[]>();

onMounted(() => {
  // modelFiles.value = mockModelFiles;
});
</script>

<template>
  <MyContainer class='py-4'>
    <div class='flex flex-col gap-4'>
      <ElAlert
        v-if='!modelFiles.length'
        show-icon
      >
        <template #title>
          <p>There are no models been found on your device</p>
        </template>
        <div class='flex flex-col gap-1'>
          <p>
            You can start with the suggested models below or add models by yourself. For more info visit <a
              _text-blue-500
              _hover:underline
              href='https://github.com/sha367/MyGPX'
            >https://github.com/sha367/MyGPX</a>
          </p>
        </div>
      </ElAlert>

      <div
        v-if='!modelFiles.length'
        class='flex flex-wrap justify-start gap-4'
      >
        <ModelFileCard
          v-for='modelFile in suggestedModelFiles'
          :key='modelFile.id'
          :item='modelFile'
        />
      </div>

      <div
        v-else
        class='flex flex-wrap justify-start gap-4'
      >
        <ModelFileCard
          v-for='modelFile in modelFiles'
          :key='modelFile.id'
          :item='modelFile'
        />
      </div>
    </div>
  </MyContainer>
</template>
