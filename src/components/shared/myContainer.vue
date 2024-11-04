<script lang='ts' setup>
const props = defineProps<{
  tiny?: boolean
}>();
</script>

<template>
  <div
    class='w-full mx-auto px-4'
    :class='props.tiny ? "max-w-[100rem]" : "max-w-screen w-full"'
  >
    <slot />
  </div>
</template>
