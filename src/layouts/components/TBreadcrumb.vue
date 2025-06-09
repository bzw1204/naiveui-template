<script setup lang="ts">
import type { RouteLocationMatched, RouteRecordRaw } from 'vue-router'

export interface BreadcrumbItem {
  path: string
  meta: RouteRecordRaw['meta']
}
const router = useRouter()
const route = useRoute()
const breadList = ref<BreadcrumbItem[]>([])

// 计算函数
const isLastItem = (index: number) => index === breadList.value.length - 1
const isHome = (route: RouteLocationMatched) => route.name === '/'

// 获取面包屑数据
function getBreadcrumb() {
  const { matched } = route

  // 处理首页情况
  if (!matched.length || isHome(matched[0])) {
    breadList.value = []
    return
  }

  // 处理一级菜单和普通路由
  const isFirstLevel = matched[0].meta?.isFirstLevel
  const currentRoute = matched[matched.length - 1]

  breadList.value = isFirstLevel
    ? [{ path: currentRoute.path, meta: currentRoute.meta }]
    : matched.map(({ path, meta }) => ({ path, meta }))
  breadList.value = breadList.value.filter(item => !item.meta?.isLayout)
}

// 处理面包屑点击
async function handleClick(item: BreadcrumbItem) {
  const { path, meta } = item

  if (meta?.link) {
    return
  }

  const currentRoute = router.getRoutes().find(route => route.path === path)

  if (!currentRoute?.children?.length) {
    await router.push(path)
    return
  }

  const firstValidChild = currentRoute.children.find(
    child => !child.redirect && !child.meta?.isHide
  )

  if (firstValidChild) {
    const fullPath = `/${firstValidChild.path}`.replace('//', '/')
    await router.push(fullPath)
  }
  else {
    await router.push(path)
  }
}
// 监听路由变化
watch(() => route.path, getBreadcrumb, { immediate: true })
</script>

<template>
  <n-breadcrumb>
    <TransitionGroup name="breadcrumb" tag="div" class="flex items-center">
      <n-breadcrumb-item
        v-for="(breadcrumb, index) in breadList"
        :key="breadcrumb.path"
        :style="{ '--index': index }"
        :class="{ clickable: breadcrumb.meta?.link && !isLastItem(index) }"
        @click="handleClick(breadcrumb)"
      >
        <div class="flex items-center gap-4">
          <n-icon v-if="breadcrumb.meta?.icon" :component="breadcrumb.meta?.icon" />
          <span>{{ breadcrumb.meta?.title }}</span>
        </div>
      </n-breadcrumb-item>
    </TransitionGroup>
  </n-breadcrumb>
</template>
