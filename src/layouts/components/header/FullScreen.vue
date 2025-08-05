<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const appStore = useSettingsStore()

useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'F11' && e.type === 'keydown') {
      e.preventDefault()
      appStore.toggleFullScreen()
    }
  }
})
</script>

<template>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <CommonWrapper @click="appStore.toggleFullScreen">
        <icon-park-outline-off-screen v-if="appStore.fullScreen" />
        <icon-park-outline-full-screen v-else />
      </CommonWrapper>
    </template>
    <span>切换全屏</span>
  </n-tooltip>
</template>
