<script lang='ts' setup>
const props = defineProps<{
  tiny?: boolean
}>();
</script>

<template>
  <div
    class='max-w-screen mx-auto px-4'
    :class='props.tiny ? "w-[60rem]" : "w-full"'
  >
    <slot />
  </div>
</template>
