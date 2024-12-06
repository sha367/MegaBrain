<script setup lang="ts">
import { computed } from 'vue';
import { TChatMessage } from './chat.types';
import { rootMessageUser } from './utils';

/** PROPS */
const props = defineProps<{
  message: TChatMessage;
}>();

/** Root element classes */
const rootElementClasses = computed(() => {
  return {
    'justify-end': props.message.from === '__user__',
    'justify-start': props.message.from !== '__user__',
  };
});

/** Message block classes */
const messageBlockClasses = computed(() => {
  return {
    'bg-blue-200 dark:bg-blue-600': props.message.from === '__user__',
    'bg-gray-200 dark:bg-gray-500': props.message.from !== '__user__',
  };
});

const date = computed(() => {
  return new Date(props.message.timestamp);
});
const time = computed(() => {
  return date.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});
</script>

<template>
  <div
    class='flex'
    :class='rootElementClasses'
  >
    <div
      class='max-w-[90vw] rounded-xl overflow-hidden p-4 flex flex-col gap-1'
      :class='messageBlockClasses'
    >
      <p
        v-if='props.message.from !== rootMessageUser'
        class='text-gray-500 text-xs'
      >
        {{ props.message.from }}
      </p>
      <p>{{ props.message.content }}</p>
      <div class='flex justify-end'>
        <p class='text-gray-500 text-xs'>
          {{ time }}
        </p>
      </div>
    </div>
  </div>
</template>
