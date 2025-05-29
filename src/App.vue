<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { RouteListener } from '@/utils/route'
import { set } from '@vueuse/core'
import { darkTheme } from 'naive-ui'

const { isDark, name, primaryColor } = storeToRefs(useSettingStore())
const title = ref(name.value)
useHead({ title: () => title.value })
const themes = computed<GlobalThemeOverrides>(() => ({
  common: {
    primaryColor: primaryColor.value
  }
}))
onMounted(() => {
  RouteListener.on((currentRoute) => {
    // 更新标题为当前路由的标题
    if (currentRoute.meta?.title) {
      set(title, currentRoute.meta.title)
    }
  })
})

onUnmounted(() => {
  RouteListener.destroyed()
})
</script>

<template>
  <!-- 调整 naive-ui 的字重配置 -->
  <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themes">
    <naive-provider>
      <router-view />
    </naive-provider>
    <n-global-style />
  </n-config-provider>
</template>

<style>
/* 切换主题的动画效果 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
