<script setup lang="ts">
import type { IUserInfo } from 'auth'
import type { FormInst } from 'naive-ui'
import { set } from '@vueuse/core'
import { useCaptcha, useForm } from 'alova/client'
import { useTemplateRef } from 'vue'
import alova from '@/request'

const router = useRouter()
const { useInfo, token } = storeToRefs(useAuthStore())
// 表单数据
interface LoginForm {
  phone: string
  code: string
}
const smsFormRef = useTemplateRef<FormInst | null>('smsFormRef')
const {
  form: loginForm,
  loading,
  send: sendSms,
  reset
} = useForm(formData => alova.Post<IUserInfo>('/auth/login/sms', formData), {
  // 初始化表单数据
  initialForm: {
    phone: '',
    code: ''
  } as LoginForm
})
  .onSuccess(({ data }) => {
    reset()
    set(useInfo, data)
    set(token, data.mobile)
    router.push('/dashboard')
  })
  .onError(({ error }) => {
    window.$message?.error(error.message)
  })

const {
  loading: captchaLoading,
  countdown,
  send: sendCaptcha
} = useCaptcha(() =>
  alova.Get('/auth/capcha/sms', { params: { phone: loginForm.value.phone } })
)
async function handleSubmit() {
  const result = await smsFormRef.value?.validate()
  if (!result?.warnings) {
    await sendSms()
  }
}
onMounted(() => {
  window.bindEnterEvent(handleSubmit)
})
onUnmounted(() => {
  window.unbindEnterEvent(handleSubmit)
})
</script>

<template>
  <n-form ref="smsFormRef" :model="loginForm" label-placement="left" label-width="auto" class="w-full">
    <n-form-item path="phone" label="账号" label-placement="left" :rule="{ required: true, message: '请输入手机号' }">
      <n-input v-model:value="loginForm.phone" placeholder="请输入手机号" size="large">
        <template #prefix>
          <div class="i-carbon:User" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="code" label="验证码" label-placement="left" :rule="{ required: true, message: '请输入验证码' }">
      <n-input-group>
        <n-input v-model:value="loginForm.code" placeholder="请输入验证码" size="large">
          <template #prefix>
            <div class="i-carbon:IotPlatform" />
          </template>
        </n-input>
        <n-button
          type="primary"
          :loading="captchaLoading"
          :disabled="captchaLoading || countdown > 0"
          ghost
          size="large"
          @click="sendCaptcha"
        >
          {{ captchaLoading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码' }}
        </n-button>
      </n-input-group>
    </n-form-item>
    <n-flex justify="space-between" class="mb-15">
      <span />
      <n-a href="#">
        忘记密码？
      </n-a>
    </n-flex>
    <n-button type="primary" block size="large" :loading="loading" @click="handleSubmit">
      登录
    </n-button>
  </n-form>
</template>
