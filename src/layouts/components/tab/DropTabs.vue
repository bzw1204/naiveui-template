<script setup lang="ts">
import Menu from '~icons/carbon/HintonPlot'
import { useTabStore } from '@/store'
import SvgIcon from '@/components/svg-icon.vue'

const tabStore = useTabStore()
const { tabs } = storeToRefs(tabStore)
function renderDropTabsLabel(option: any) {
  return option.meta.title
}

function renderDropTabsIcon(option: any) {
  return h(SvgIcon,{name: option.meta.icon})
}

const router = useRouter()
function handleDropTabs(_: string, option: any) {
  router.push(option.fullPath)
}
</script>

<template>
  <n-dropdown
    :options="tabs"
    :render-label="renderDropTabsLabel"
    :render-icon="renderDropTabsIcon"
    trigger="click"
    size="small"
    key-field="fullPath"
    @select="handleDropTabs"
  >
    <n-button quaternary size="small" :focusable="false">
      <template #icon>
        <n-icon :component="Menu" />
      </template>
    </n-button>
  </n-dropdown>
</template>

<style scoped>

</style>
