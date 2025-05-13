<script setup lang="ts" name="KeepAlive">
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <n-flex>
    <n-input-number v-model:value="count" />
  </n-flex>
</template>
