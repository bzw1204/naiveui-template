<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useDraggable } from 'vue-draggable-plus'
import IconLeft from '~icons/carbon/ArrowLeft'
import IconRight from '~icons/carbon/ArrowRight'
import IconClose from '~icons/carbon/Close'
import IconDelete from '~icons/carbon/Delete'
import IconFullwith from '~icons/carbon/PanHorizontal'
import IconRedo from '~icons/carbon/Renew'
import { useTabScroll } from '@/hooks/use-tab-scroll'
import { RouteListener } from '@/utils'
import ContentFullScreen from './ContentFullScreen.vue'
import DropTabs from './DropTabs.vue'
import Reload from './Reload.vue'
import TabBarItem from './TabBarItem.vue'

const tabStore = useTabStore()
const { tabs, pin, active } = storeToRefs(tabStore)
const { scrollbar, onWheel } = useTabScroll(active)
const router = useRouter()

function handleTab(route: any) {
  router.push(route.fullPath)
}
const options = computed(() => {
  return [
    {
      label: '刷新',
      key: 'reload',
      icon: () => h(IconRedo)
    },
    {
      label: '关闭当前',
      key: 'closeCurrent',
      icon: () => h(IconClose)
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: () => h(IconDelete)
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      icon: () => h(IconLeft)
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: () => h(IconRight)
    },
    {
      label: '关闭所有',
      key: 'closeAll',
      icon: () => h(IconFullwith)
    }
  ]
})
const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const currentRoute = ref()

function handleSelect(key: string) {
  showDropdown.value = false
  interface HandleFn {
    [key: string]: any
  }
  const handleFn: HandleFn = {
    reload() {
      console.info('刷新')
    },
    closeCurrent() {
      tabStore.closeTab(currentRoute.value.fullPath)
    },
    closeOther() {
      tabStore.closeOtherTabs(currentRoute.value.fullPath)
    },
    closeLeft() {
      tabStore.closeLeftTabs(currentRoute.value.fullPath)
    },
    closeRight() {
      tabStore.closeRightTabs(currentRoute.value.fullPath)
    },
    closeAll() {
      tabStore.closeAllTabs()
    }
  }
  handleFn[key]()
}
function handleContextMenu(e: MouseEvent, route: RouteLocationNormalized) {
  e.preventDefault()
  currentRoute.value = route
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
function onClickoutside() {
  showDropdown.value = false
}

const el = useTemplateRef<HTMLElement>('el')
useDraggable(el, tabs, {
  animation: 150,
  ghostClass: 'ghost'
})
onMounted(() => {
  RouteListener.on((route) => {
    tabStore.addTab(route)
    tabStore.setActive(route.fullPath)
  })
})
</script>

<template>
  <n-scrollbar
    ref="scrollbar"
    class="tab-bar-scroller-wrapper relative h-full flex"
    content-class="h-full pr-34 tab-bar-scroller-content"
    :x-scrollable="true"
    @wheel="onWheel"
  >
    <div class="relative wh-full flex p-l-2">
      <div class="flex items-end">
        <TabBarItem
          v-for="item in pin"
          :key="item.fullPath"
          :value="tabStore.active"
          :route="item"
          @click="handleTab(item)"
        />
      </div>
      <div ref="el" class="flex flex-1 items-end">
        <TabBarItem
          v-for="item in tabs"
          :key="item.fullPath"
          :value="tabStore.active"
          :route="item"
          closable
          :data-tab-path="item.fullPath"
          @close="tabStore.closeTab"
          @click="handleTab(item)"
          @contextmenu="handleContextMenu($event, item)"
        />
        <n-dropdown
          placement="bottom-start"
          trigger="manual"
          :x="x"
          :y="y"
          :options="options"
          :show="showDropdown"
          :on-clickoutside="onClickoutside"
          @select="handleSelect"
        />
      </div>
    </div>
    <n-el class="absolute right-0 top-0 h-full flex items-center gap-1 bg-[var(--card-color)]">
      <Reload />
      <ContentFullScreen />
      <DropTabs />
    </n-el>
  </n-scrollbar>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c4f6d5;
}
</style>
