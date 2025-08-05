<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <n-flex vertical align="center" class="w-full">
    <n-divider dashed>
      {{ title }}
    </n-divider>
    <slot />
  </n-flex>
</template>
