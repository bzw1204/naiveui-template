<script setup lang="ts">
import useAuthStore from '@/store/modules/auth'
import { set } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 表单数据
interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
}

const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

// 登录处理函数
function handleLogin() {
  loading.value = true

  // 模拟API请求
  setTimeout(() => {
    // 设置token（实际应从API获取）
    set(authStore, 'token', 'fitness_app_token')

    // 跳转到仪表盘或重定向页面
    const redirect = router.currentRoute.value.query.redirect as string || '/dashboard'
    router.push({ path: redirect })

    loading.value = false
  }, 1500)
}
</script>

<template>
  <n-el class="login-bg wh-screen flex items-center justify-center bg-cover">
    <n-flex class="m-auto h-500 w-900 shadow-lg" :wrap="false" :size="0">
      <!-- 左侧视觉区域 -->
      <n-flex vertical justify="center" align="center" class="box-border h-500 w-400 overflow-hidden from-[var(--info-color)] to-[var(--primary-color)] bg-gradient-to-br p-30 text-white">
        <div class="i-custom:logo text-180 text-[#000] font-bold" />
        <div class="text-28 text-#000 font-bold">
          Naive Admin
        </div>
      </n-flex>

      <!-- 右侧登录表单 -->
      <n-flex vertical justify="center" class="box-border h-500 w-500 bg-white p-30">
        <h2 class="font-bold">
          欢迎回来！
        </h2>
        <n-form :model="loginForm" class="w-full">
          <n-form-item path="username" label="账号" label-placement="left">
            <n-input v-model:value="loginForm.username" placeholder="请输入账号" size="large">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 4C14.2091 4 16 8.79086 16 12C16 15.2091 14.2091 20 12 20C9.79086 20 8 15.2091 8 12C8 8.79086 9.79086 4 12 4ZM12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6ZM18 13H6C4.9 13 4 13.9 4 15V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15C20 13.9 19.1 13 18 13ZM6 18V15H18L18 18H6Z" fill="currentColor" />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password" label="密码" label-placement="left">
            <n-input
              v-model:value="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 1C9.79086 1 8 2.79086 8 5V7H6C4.34315 7 3 8.34315 3 10V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V10C21 8.34315 19.6569 7 18 7H16V5C16 2.79086 14.2091 1 12 1ZM12 3C13.1046 3 14 3.89543 14 5V7H10V5C10 3.89543 10.8954 3 12 3ZM19 19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H19Z" fill="currentColor" />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-flex justify="space-between" class="mb-15">
            <n-checkbox v-model:checked-value="loginForm.rememberMe">
              记住账号
            </n-checkbox>
            <n-a href="#">
              忘记密码？
            </n-a>
          </n-flex>

          <n-button
            type="primary"
            block
            size="large"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </n-form>

        <n-divider>或使用其他方式登录</n-divider>

        <n-flex justify="center" gap="20" class="mt-10">
          <n-button circle secondary size="large">
            <template #icon>
              <n-icon size="24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />
                </svg>
              </n-icon>
            </template>
          </n-button>
          <n-button circle secondary size="large">
            <template #icon>
              <n-icon size="24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />
                </svg>
              </n-icon>
            </template>
          </n-button>
          <n-button circle secondary size="large">
            <template #icon>
              <n-icon size="24">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />
                </svg>
              </n-icon>
            </template>
          </n-button>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-el>
</template>
