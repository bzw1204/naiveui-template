<script setup lang="ts">
import { cleanseRedirect } from '@/utils'

const { token } = storeToRefs(useAuthStore())
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
  <!-- 用户信息 -->
  <x-n-dropdown trigger="click">
    <template #trigger>
      <n-avatar class="hover:cursor-pointer" object-fit="cover" src="https://www.github.com/zyyv.png" />
    </template>
    <x-n-dropdown-item key="1" @click="() => $router.push('/user')">
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
</template>
