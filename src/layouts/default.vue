<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { ProLayout, useLayoutMenu } from 'pro-naive-ui'
import { ThemeToggle } from '@/components'
import { menus } from '@/router'
import {
  BackTop,
  Breadcrumb,
  CollapaseButton,
  Logo,
  MobileDrawer,
  // Notices,
  // Search,
  // Setting,
  TabBar,
  ThemeSettings,
  UserCenter
} from './components'
import Content from './Content.vue'

const route = useRoute()
const settingStore = useSettingsStore()
const themeSettings = useTemplateRef<InstanceType<typeof ThemeSettings>>('themeSettings')
const { layoutType, sider, tab, isMobile } = storeToRefs(settingStore)

const {
  layout,
  activeKey
} = useLayoutMenu({
  mode: layoutType,
  accordion: true,
  menus: menus as unknown as MenuOption[]
})
watch(() => route.path, (value: string) => {
  activeKey.value = value
}, { immediate: true })
// 移动端抽屉控制
const showMobileDrawer = ref(false)
const hidenCollapaseButton = computed(() => ['horizontal'].includes(layoutType.value) || isMobile)
</script>

<template>
  <ProLayout
    v-model:collapsed="sider.collapsed"
    :mode="layoutType"
    :is-mobile="isMobile"
    :show-logo="!isMobile"
    :show-footer="false"
    :show-tabbar="tab.visible"
    nav-fixed
    show-nav
    show-sidebar
    :nav-height="54"
    :tabbar-height="35"
    :sidebar-width="sider.width"
    :sidebar-collapsed-width="sider.collapsedWidth"
    class="wh-screen"
    header-class="h-[var(--header-height)] box-border"
  >
    <template #logo>
      <Logo />
    </template>

    <template #nav-left>
      <template v-if="isMobile">
        <Logo />
      </template>

      <template v-else>
        <div v-if="settingStore.breadcrumbVisible || !hidenCollapaseButton" class="h-full flex-y-center gap-10 pl-5">
          <CollapaseButton v-if="hidenCollapaseButton" />
          <Breadcrumb v-if="settingStore.breadcrumbVisible" />
        </div>
      </template>
    </template>

    <template #nav-center>
      <div class="h-full flex-y-center gap-1">
        <n-menu
          v-if="settingStore.showHorizontalMenu"
          :collapsed-width="sider.collapsedWidth"
          :collapsed-icon-size="22"
          v-bind="layout.horizontalMenuProps"
        />
      </div>
    </template>

    <template #nav-right>
      <div class="h-full flex-y-center gap-1 pr-10">
        <!-- 移动端：只显示菜单按钮 -->
        <template v-if="isMobile">
          <n-button quaternary @click="showMobileDrawer = true">
            <template #icon>
              <div class="i-carbon:menu" />
            </template>
          </n-button>
        </template>

        <!-- 桌面端：显示完整功能组件 -->
        <template v-else>
          <n-flex align="center">
            <!-- 主题模式 -->
            <ThemeToggle />
            <!-- 系统设置 -->
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button
                  quaternary
                  type="default"
                  :focusable="false"
                  size="small"
                  @click="() => themeSettings?.show()"
                >
                  <template #icon>
                    <div class="i-carbon:Settings" />
                  </template>
                </n-button>
              </template>
              系统设置
            </n-tooltip>
            <!-- 用户信息 -->
            <UserCenter />
          </n-flex>
        </template>
      </div>
    </template>

    <template #sidebar>
      <n-menu
        :collapsed-width="sider.collapsedWidth"
        :collapsed-icon-size="22"
        v-bind="layout.verticalMenuProps"
      />
    </template>

    <template #sidebar-extra>
      <n-scrollbar class="flex-[1_0_0]">
        <n-menu
          v-bind="layout.verticalExtraMenuProps"
          :collapsed-width="sider.collapsedWidth"
          :collapsed-icon-size="22"
        />
      </n-scrollbar>
    </template>

    <template #tabbar>
      <TabBar />
    </template>

    <Content />
    <BackTop />

    <!-- 移动端功能抽屉 -->
    <MobileDrawer v-model:show="showMobileDrawer" @show-setting="() => themeSettings?.show()">
      <n-menu
        v-bind="layout.verticalMenuProps"
        :collapsed-width="sider.collapsedWidth"
        :collapsed-icon-size="22"
      />
    </MobileDrawer>
  </ProLayout>
  <ThemeSettings ref="themeSettings" />
</template>
