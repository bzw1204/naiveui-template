<script setup lang="ts" vapor>
import ThemeToggleButton from '@/components/theme-toggle/index.vue'
import { cleanseRedirect } from '@/utils'
import { TBreadcrumb } from '.'
import SystemSettings from './system-settings/index.vue'
import ThemeSettings from './theme-settings/index.vue'

const { token } = storeToRefs(useAuthStore())
const settingStore = useSettingStore()
const { showBreadcrumb } = storeToRefs(settingStore)
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.path)
const showSettings = ref(false)
const showColorSetting = ref(false)
function logout() {
  window.$dialog?.warning({
    title: '退出登录',
    content: '确定需要退出登录吗？',
    closable: false,
    closeOnEsc: false,
    maskClosable: false,
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      token.value = ''
      router.push({ path: '/login', query: cleanseRedirect(currentRoute.value) })
    }
  })
}
</script>

<template>
  <n-layout-header bordered class="m-auto box-border h-[var(--header-height)] p-10">
    <n-flex justify="space-between" align="center" class="m-auto">
      <div class="h-auto w-auto">
        <TBreadcrumb v-show="showBreadcrumb" />
      </div>
      <n-flex align="center">
        <!-- 主题模式 -->
        <ThemeToggleButton />
        <!-- 主题设置 -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              quaternary
              type="default"
              :focusable="false"
              size="small"
              @click="() => showColorSetting = !showColorSetting"
            >
              <template #icon>
                <div class="i-carbon:ColorPalette" />
              </template>
            </n-button>
          </template>
          主题设置
        </n-tooltip>
        <!-- 系统设置 -->
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              quaternary
              type="default"
              :focusable="false"
              size="small"
              @click="() => showSettings = !showSettings"
            >
              <template #icon>
                <div class="i-carbon:Settings" />
              </template>
            </n-button>
          </template>
          系统设置
        </n-tooltip>
        <!-- 用户信息 -->
        <x-n-dropdown trigger="click">
          <template #trigger>
            <n-avatar class="hover:cursor-pointer" object-fit="cover" src="https://www.github.com/zyyv.png" />
          </template>
          <x-n-dropdown-item key="1" @click="() => router.push('/user')">
            个人中心
          </x-n-dropdown-item>
          <x-n-dropdown-item key="2">
            项目主页
          </x-n-dropdown-item>
          <x-n-dropdown-divider />
          <x-n-dropdown-item key="3" @click="logout">
            退出登录
          </x-n-dropdown-item>
        </x-n-dropdown>
      </n-flex>
    </n-flex>
  </n-layout-header>
  <SystemSettings v-model="showSettings" />
  <ThemeSettings v-model="showColorSetting" />
</template>
