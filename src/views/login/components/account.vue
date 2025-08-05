<script setup lang="ts">
import type { IUserInfo } from 'auth'
import type { FormInst } from 'naive-ui'
import { set } from '@vueuse/core'
import { useForm, useRequest } from 'alova/client'
import alova from '@/request'

const router = useRouter()
const { useInfo, token } = storeToRefs(useAuthStore())
const accountFormRef = useTemplateRef<FormInst | null>('accountFormRef')
const { data: capchaId, send: refreshCapchaId } = useRequest(() => alova.Get('/auth/capcha/img'))
const {
  form: loginForm,
  loading,
  send,
  updateForm
} = useForm(formData => alova.Post<IUserInfo>('/auth/login/account', formData), {
  initialForm: {
    account: '',
    password: '',
    token: '',
    code: ''
  },
  initialData: {
    id: 0,
    account: '',
    mobile: ''
  }
})
  .onSuccess(({ data }) => {
    set(useInfo, data)
    set(token, data.mobile)
    router.push('/dashboard')
  })
  .onError(({ error }) => {
    window.$message?.error(error.message || '操作失败')
  })
const { send: getCapchaToken } = useRequest(
  () => alova.Patch<string>('/auth/capcha', { code: loginForm.value.code, img_id: capchaId.value }),
  {
    immediate: false,
    initialData: {
      data: ''
    }
  }
)
  .onSuccess(({ data }) => {
    updateForm({
      token: data
    })
    send()
  })
  .onError(({ error }) => {
    updateForm({
      code: ''
    })
    window.$message?.error(error.message || '操作失败')
  })
async function handleSubmit() {
  const result = await accountFormRef.value?.validate()
  if (!result?.warnings) {
    await getCapchaToken()
  }
}
function handleForget() {
  window.$ipc.emit('set-form-type', 'forget')
}
onMounted(() => {
  window.bindEnterEvent(handleSubmit)
})
onUnmounted(() => {
  window.unbindEnterEvent(handleSubmit)
})
</script>

<template>
  <n-form ref="accountFormRef" :model="loginForm" label-placement="left" label-width="auto" class="w-full">
    <n-form-item path="account" label="账号" label-placement="left" :rule="{ required: true, message: '请输入账号' }">
      <n-input v-model:value="loginForm.account" placeholder="请输入账号" size="large">
        <template #prefix>
          <div class="i-carbon:User" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="password" label="密码" label-placement="left" :rule="{ required: true, message: '请输入密码' }">
      <n-input
        v-model:value="loginForm.password"
        type="password"
        show-password-on="click"
        placeholder="请输入密码"
        size="large"
        @keyup.enter="handleSubmit"
      >
        <template #prefix>
          <span class="i-carbon:Password" />
        </template>
      </n-input>
    </n-form-item>

    <n-form-item path="code" label="验证码" label-placement="left" :rule="{ required: true, message: '请输入验证码' }">
      <n-flex :wrap="false" class="h-full w-full">
        <n-input v-model:value="loginForm.code" placeholder="请输入验证码" size="large" @keyup.enter="handleSubmit">
          <template #prefix>
            <div class="i-carbon:IotPlatform" />
          </template>
        </n-input>
        <img
          :src="`/api/auth/img/captcha?img_id=${capchaId}`"
          class="w-100 hover:cursor-pointer"
          @click="refreshCapchaId"
        >
      </n-flex>
    </n-form-item>
    <n-flex justify="space-between" class="mb-15">
      <span />
      <n-a href="javascript:void(0);" @click="handleForget">
        忘记密码？
      </n-a>
    </n-flex>
    <n-button type="primary" block size="large" :loading="loading" @click="handleSubmit">
      登录
    </n-button>
  </n-form>
</template>
