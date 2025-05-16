<script setup lang="ts">
import ThemeToggleButton from '@/components/theme-toggle/index.vue'
import { cleanseRedirect } from '@/utils'
import { TBreadcrumb } from '.'

const { token } = storeToRefs(useAuthStore())
const settingStore = useSettingStore()
const { showBreadcrumb } = storeToRefs(settingStore)
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.path)

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
        <n-button type="primary" quaternary :focusable="false">
          大屏
        </n-button>
        <ThemeToggleButton />
        <!-- 用户信息 -->
        <x-n-dropdown trigger="click">
          <template #trigger>
            <n-avatar class="hover:cursor-pointer" object-fit="cover" src="https://www.github.com/zyyv.png" />
          </template>
          <x-n-dropdown-item key="1">
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
</template>
