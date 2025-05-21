<script setup lang="ts">
import type { ILoginForm } from 'auth'
import type { FormRules } from 'naive-ui'
import alova from '@/request'
import { set } from '@vueuse/core'
import { useForm } from 'alova/client'

const loginFormRef = ref()
const { form: loginForm } = useForm(formData => alova.Post('/login', formData), {
  initialForm: {
    username: '',
    password: ''
  } as ILoginForm
})

const rules: FormRules = {
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ]
}
const { token } = storeToRefs(useAuthStore())
const router = useRouter()
const rememberMe = ref(false)
const loading = ref(false)

function login() {
  loading.value = true
  // 模拟API请求
  setTimeout(() => {
    set(token, '123456')
    const redirect = router.currentRoute.value.query.redirect as string || '/'
    router.push({ path: redirect })
    loading.value = false
  }, 1500)
}
</script>

<template>
  <n-el class="login-bg wh-screen flex items-center justify-center bg-cover">
    <n-flex class="m-auto h-500 w-850" :size="0" align="center">
      <n-flex vertical justify="center" align="center" class="h-500 w-400 bg-[var(--info-color)]">
        <img src="@/assets/icons/logo.svg" alt="Logo" class="h-80 w-80">
        <span>沐雨</span>
      </n-flex>
      <n-flex vertical justify="space-evenly" class="box-border h-500 w-400 bg-white p-15">
        <div class="text-2xl font-bold">
          登录
        </div>
        <n-form
          ref="loginFormRef"
          label-placement="left"
          label-width="auto"
          :model="loginForm"
          :rules="rules"
        >
          <n-form-item path="username" label="账号">
            <n-input v-model:value="loginForm.username" placeholder="请输入账号" />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" />
          </n-form-item>
          <n-flex justify="space-between" class="mb-15">
            <n-checkbox v-model:checked-value="rememberMe">
              记住我
            </n-checkbox>
            <n-a>忘记密码？</n-a>
          </n-flex>
          <n-button type="primary" block :loading="loading" @click="login">
            登录
          </n-button>
          <n-divider>或</n-divider>
          <n-button secondary block>
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" fill="currentColor" />
                </svg>
              </n-icon>
            </template>
            使用Google账号登录
          </n-button>
        </n-form>
      </n-flex>
    </n-flex>
  </n-el>
</template>
