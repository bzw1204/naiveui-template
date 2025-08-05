<script setup lang="ts">
import FullscreenExitOutlined from '~icons/ant-design/FullscreenExitOutlined'
import FullscreenOutlined from '~icons/ant-design/FullscreenOutlined'

const appStore = useSettingsStore()

let previousLayoutMode = appStore.layoutType

function enterFullContent() {
  previousLayoutMode = appStore.layoutType
  appStore.layoutType = 'full-content'
}

function exitFullContent() {
  // 如果是全屏或者数据不存在，则恢复为默认的vertical
  if (previousLayoutMode === 'full-content' || !previousLayoutMode) {
    previousLayoutMode = 'vertical'
  }
  appStore.layoutType = previousLayoutMode
}
</script>

<template>
  <n-tooltip v-if="!appStore.isMobile" placement="bottom" trigger="hover">
    <template #trigger>
      <n-button quaternary size="small" :focusable="false" @click="enterFullContent">
        <template #icon>
          <n-icon :component="FullscreenOutlined" />
        </template>
      </n-button>
    </template>
    切换内容全屏
  </n-tooltip>

  <Teleport to="body">
    <div v-if="appStore.layoutType === 'full-content'" class="fixed right-0 top-4 z-[9999]">
      <n-tooltip placement="left" trigger="hover">
        <template #trigger>
          <n-button type="primary" size="small" :focusable="false" @click="exitFullContent">
            <template #icon>
              <n-icon :component="FullscreenExitOutlined" />
            </template>
          </n-button>
        </template>
        切换内容全屏
      </n-tooltip>
    </div>
  </Teleport>
</template>
