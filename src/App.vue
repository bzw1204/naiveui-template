<script setup lang="ts">
import { RouteListener } from '@/utils/route'
import { set } from '@vueuse/core'

const { globalTheme, name } = storeToRefs(useSettingStore())
const title = ref(name.value)
useHead({ title: () => title.value })

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
  <n-config-provider :theme="globalTheme">
    <naive-provider>
      <router-view />
    </naive-provider>
    <n-global-style />
  </n-config-provider>
</template>
