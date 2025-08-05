<script setup lang="ts">
import { set } from '@vueuse/core'

const { sider } = storeToRefs(useSettingsStore())
function toggleCollapse() {
  set(sider, {
    ...sider.value,
    collapsed: !sider.value.collapsed
  })
}
</script>

<template>
  <div class="text-24 hover:cursor-pointer" :class="sider.collapsed ? 'i-ant-design:MenuFoldOutlined' : 'i-ant-design:MenuUnfoldOutlined'" @click="toggleCollapse" />
</template>
