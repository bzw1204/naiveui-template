<script setup lang="ts">
const loading = ref(false)

function handleReload() {
  loading.value = true
  // setting.reloadPage()
  setTimeout(() => {
    loading.value = false
  }, 800)
}
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <n-button quaternary size="small" :focusable="false" @click="handleReload">
        <div class="i-carbon:Renew" :class="{ 'animate-spin': loading }" />
      </n-button>
    </template>
    <span>刷新当前页面</span>
  </n-tooltip>
</template>

<style scoped></style>
