<script setup lang="ts">
import type { RouteMeta } from 'vue-router'

export interface BreadcrumbItem {
  path: string
  meta: RouteMeta
}
const router = useRouter()
const route = useRoute()
const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const matched = route.matched.filter(item => item.name)
  return matched.map((x) => {
    return {
      path: x.path,
      meta: x.meta
    }
  })
})
console.log('breadcrumbs', breadcrumbs.value)
const settingStore = useSettingsStore()
</script>

<template>
  <TransitionGroup v-if="settingStore.breadcrumbVisible" name="list" tag="div" class="flex gap-5">
    <div
      v-for="(item) in breadcrumbs"
      :key="item.path"
      style="color: var(--text-color-2); transition: 0.3s var(--cubic-bezier-ease-in-out);"
      class="split flex-center cursor-pointer gap-5"
      @click="router.push(item.path)"
    >
      <SvgIcon v-if="settingStore.breadcrumb.icon" :name="item.meta.icon" />
      <span class="whitespace-nowrap">{{ item.meta.title }}</span>
    </div>
  </TransitionGroup>
</template>

<style lang="scss">
.split:not(:first-child)::before {
  content: '/';
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
