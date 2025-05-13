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
function login() {
  set(token, '123456')
  const redirect = router.currentRoute.value.query.redirect as string || '/'
  router.push({ path: redirect })
}
</script>

<template>
  <n-el class="wh-screen flex items-center justify-center bg-cover login-bg">
    <n-flex class="m-auto h-500 w-850" :size="0" align="center">
      <n-flex vertical justify="center" align="center" class="h-500 w-400 bg-[var(--info-color)]">
        <img src="@/assets/icons/logo-ying.svg" alt="Logo" class="h-80 w-80">
        <span>CNNS 后台模板</span>
      </n-flex>
      <n-flex vertical justify="space-evenly" class="box-border h-500 w-400 bg-white p-15">
        <div>登录</div>
        <n-form
          ref="loginFormRef"
          label-placement="left"
          label-width="auto"
          :model="loginForm"
          :rules="rules"
        >
          <n-form-item path="username" label="账号">
            <n-input v-model:value="loginForm.username" />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input v-model:value="loginForm.password" type="password" />
          </n-form-item>
        </n-form>
        <n-button type="primary" @click="login">
          登录
        </n-button>
      </n-flex>
    </n-flex>
  </n-el>
</template>
