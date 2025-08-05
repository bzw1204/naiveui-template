<script setup lang="ts">
import alova from '@/request'
import { useCaptcha, useForm } from 'alova/client'
import type { FormInst } from 'naive-ui'

const forgetFormRef = useTemplateRef<FormInst | null>('forgetFormRef')
function changeFormType() {
  window.$ipc.emit('set-form-type', 'login')
}
const { form: loginForm, loading, send } = useForm((formData) => alova.Post('/auth/change/pwd', formData), {
  initialForm: {
    phone: '',
    token: '',
    code: '',
    password: '',
    repassword: ''
  },
})
  .onSuccess(changeFormType)
  .onError(({ error }) => {
    window.$message?.error(error.message || '操作失败')
  })
const {
  loading: captchaLoading,
  countdown,
  send: sendCaptcha,
} = useCaptcha(() =>
  alova.Get('/auth/capcha/sms', { params: { phone: loginForm.value.phone } })
);
async function handleSubmit() {
  const result = await forgetFormRef.value?.validate()
  if (!result?.warnings) {
    await send()
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
  <n-flex vertical class=" wh-full ">
    <h1 class="w-full text-center">忘记密码</h1>
    <n-form ref="forgetFormRef" :model="loginForm" label-placement="left" label-width="auto" class="w-full">
      <n-form-item path="phone" label="手机号" label-placement="left" :rule="{ required: true, message: '请输入手机号' }">
        <n-input v-model:value="loginForm.phone" placeholder="请输入手机号" size="large">
          <template #prefix>
            <div class="i-carbon:Phone" />
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
          <n-button type="primary" :loading="captchaLoading" :disabled="captchaLoading || countdown > 0" ghost
            size="large" @click="sendCaptcha">
            {{ captchaLoading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码' }}
          </n-button>
        </n-input-group>
      </n-form-item>
      <n-form-item path="password" label="新密码" label-placement="left" :rule="{ required: true, message: '请输入新密码' }">
        <n-input v-model:value="loginForm.password" placeholder="请输入新密码" size="large">
          <template #prefix>
            <div class="i-carbon:Password" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="repassword" label="确认密码" label-placement="left" :rule="{ required: true, message: '请输入确认密码' }">
        <n-input v-model:value="loginForm.repassword" placeholder="请输入确认密码" size="large">
          <template #prefix>
            <div class="i-carbon:Password" />
          </template>
        </n-input>
      </n-form-item>
      <n-flex justify="space-between" class="mb-15">
        <span>
        </span>
        <n-a href="javascript:void(0);" @click="changeFormType">
          返回登录
        </n-a>
      </n-flex>
      <n-button type="primary" block size="large" :loading="loading" @click="handleSubmit">
        提交
      </n-button>
    </n-form>
  </n-flex>
</template>