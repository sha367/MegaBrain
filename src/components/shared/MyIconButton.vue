<script setup lang="ts">
import { computed } from 'vue';

const {
  variant = 'default',
  active = false,
} = defineProps<{
  variant?: 'default' | 'danger' | 'primary';
  active?: boolean;
}>();

const dynamicClasses = computed(() => {
  const classes = ['bg-gray-200 text-gray-400 transition-all'];

  if (variant === 'default') {
    classes.push('hover:bg-gray-200 hover:text-indigo-500');
  } else if (variant === 'danger') {
    classes.push('hover:bg-rose-200 hover:text-rose-500');
  } else if (variant === 'primary') {
    classes.push('hover:bg-indigo-200 hover:text-indigo-500');
  }

  if (active) {
    if (variant === 'default') {
      classes.push('text-indigo-500');
    } else if (variant === 'danger') {
      classes.push('text-rose-500');
    } else if (variant === 'primary') {
      classes.push('text-indigo-500');
    }
  }

  return classes;
});

const emit = defineEmits(['on-click']);
</script>

<template>
  <div
    class='text-2xl cursor-pointer rounded-full p-2'
    :class='dynamicClasses'
    @click.stop='() => emit("on-click")'
  >
    <slot />
  </div>
</template>
