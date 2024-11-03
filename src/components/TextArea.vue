<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { ElInput } from 'element-plus';

/** PROPS */
const props = defineProps<{
  modelValue: string;
}>();

/** EMITS */
const emit = defineEmits(['update:model-value']);

/** Ref to a textarea's component */
const textareaRef = ref<InstanceType<typeof ElInput> | null>(null);

/** ON MOUNTED */
onMounted(() => {
  const textareaElement = textareaRef.value?.$el.querySelector('textarea') as HTMLTextAreaElement | null;
  if (textareaElement) {
    textareaElement.style.height = '10px'; // Set max height
    textareaElement.style.maxHeight = '50vh'; // Set max height
  }
});

/**
 * Auto resize textarea
 */
const autoResize = () => {
  nextTick(() => {
    const textareaElement = textareaRef.value?.$el.querySelector('textarea') as HTMLTextAreaElement | null;
    if (textareaElement) {
      textareaElement.style.height = 'auto'; // Сброс высоты
      textareaElement.style.height = `${textareaElement.scrollHeight - 20}px`; // Установка новой высоты
    }
  });
};

/** Watch modelValue to adjust height when value changes */
watch(
  () => props.modelValue,
  () => autoResize(),
  { immediate: true }
);
</script>

<template>
  <ElInput
    ref='textareaRef'
    :model-value='props.modelValue'
    type='textarea'
    placeholder='Type a message...'
    class='max-h-[50vh] h-auto'
    resize='none'
    @update:model-value='(value: string) => emit("update:model-value", value)'
  />
</template>
