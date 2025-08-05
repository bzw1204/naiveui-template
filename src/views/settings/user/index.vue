<script setup lang="ts">
import type { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { reactive, ref } from 'vue'

// 使用Naive UI的message hook
const message = useMessage()

// 用户信息
const userInfo = reactive({
  avatar: 'https://via.placeholder.com/100x100/4f46e5/ffffff?text=U',
  username: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+86 138 0013 8000',
  nickname: '管理员',
  department: '技术部',
  position: '前端工程师',
  bio: '热爱技术，专注于前端开发和用户体验设计。',
  location: '北京',
  website: 'https://johndoe.dev',
  joinDate: '2023-01-15'
})

// 表单相关
const formRef = ref<FormInst | null>(null)
const passwordFormRef = ref<FormInst | null>(null)
const loading = ref(false)
const passwordLoading = ref(false)

// 个人信息表单
const personalForm = reactive({
  nickname: userInfo.nickname,
  email: userInfo.email,
  phone: userInfo.phone,
  bio: userInfo.bio,
  location: userInfo.location,
  website: userInfo.website
})

// 密码修改表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const personalRules: FormRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度应在2-20个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
  ],
  website: [
    { type: 'url', message: '请输入有效的网址', trigger: 'blur' }
  ]
}

const passwordRules: FormRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (_, value) => {
        return value === passwordForm.newPassword
      },
      message: '两次输入的密码不一致',
      trigger: 'blur'
    }
  ]
}

// 当前选中的标签页
const activeTab = ref('personal')

// 头像上传
function handleAvatarUpload({ file }: { file: UploadFileInfo }) {
  if (file.file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userInfo.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file.file)
  }
}

// 保存个人信息
async function handleSavePersonalInfo() {
  try {
    await formRef.value?.validate()
    loading.value = true

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    Object.assign(userInfo, personalForm)
    message.success('个人信息更新成功')
  }
  catch (error) {
    console.error('验证失败:', error)
  }
  finally {
    loading.value = false
  }
}

// 修改密码
async function handleChangePassword() {
  try {
    await passwordFormRef.value?.validate()
    passwordLoading.value = true

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    message.success('密码修改成功')

    // 重置表单
    Object.assign(passwordForm, {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
  catch (error) {
    console.error('验证失败:', error)
  }
  finally {
    passwordLoading.value = false
  }
}

// 系统设置
const systemSettings = reactive({
  theme: 'auto',
  language: 'zh-CN',
  notifications: {
    email: true,
    browser: true,
    mobile: false
  },
  privacy: {
    showProfile: true,
    showActivity: false,
    allowMessages: true
  }
})

// 统计数据
const stats = ref([
  { label: '登录次数', value: 1256, icon: 'i-carbon-login' },
  { label: '在线时长', value: '2,340h', icon: 'i-carbon-time' },
  { label: '创建项目', value: 42, icon: 'i-carbon-folder-add' },
  { label: '完成任务', value: 189, icon: 'i-carbon-checkmark-outline' }
])
</script>

<template>
  <div class="user-center w-full p-6">
    <!-- 头部用户信息卡片 -->
    <n-card class="mb-6" :bordered="false">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <!-- 头像 -->
          <div class="relative">
            <n-avatar
              :src="userInfo.avatar"
              :size="100"
              class="shadow-lg ring-4 ring-white"
            />
            <n-upload
              accept="image/*"
              :show-file-list="false"
              @change="handleAvatarUpload"
            >
              <n-button
                circle
                size="small"
                class="absolute shadow-lg -bottom-1 -right-1"
                type="primary"
              >
                <template #icon>
                  <div class="i-carbon-camera text-xs" />
                </template>
              </n-button>
            </n-upload>
          </div>

          <!-- 基本信息 -->
          <div class="flex-1">
            <h1 class="mb-2 text-gray-900 font-bold">
              {{ userInfo.username }}
            </h1>
            <p class="mb-3 text-gray-600">
              {{ userInfo.position }} · {{ userInfo.department }}
            </p>
            <p class="mb-3 max-w-md text-gray-500">
              {{ userInfo.bio }}
            </p>

            <!-- 标签 -->
            <div class="flex gap-2">
              <n-tag type="primary" size="small">
                <template #icon>
                  <div class="i-carbon-location" />
                </template>
                {{ userInfo.location }}
              </n-tag>
              <n-tag type="info" size="small">
                <template #icon>
                  <div class="i-carbon-calendar" />
                </template>
                加入于 {{ userInfo.joinDate }}
              </n-tag>
            </div>
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="wh-full flex flex-1 items-center justify-end gap-20">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="min-h-200 min-w-200 flex flex-col rounded-lg bg-gray-50 p-4 text-center"
          >
            <div :class="`${stat.icon} text-primary mb-2`" />
            <div class="mb-1 text-gray-900 font-semibold">
              {{ stat.value }}
            </div>
            <div class="text-gray-500">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 主要内容区域 -->
    <n-card :bordered="false">
      <n-tabs v-model:value="activeTab" type="line" size="large">
        <!-- 个人信息 -->
        <n-tab-pane name="personal" tab="个人信息">
          <div class="max-w-4xl py-6">
            <n-form
              ref="formRef"
              :model="personalForm"
              :rules="personalRules"
              label-placement="left"
              label-width="120"
              require-mark-placement="left"
            >
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <n-form-item label="昵称" path="nickname">
                  <n-input v-model:value="personalForm.nickname" placeholder="请输入昵称" />
                </n-form-item>

                <n-form-item label="邮箱" path="email">
                  <n-input v-model:value="personalForm.email" placeholder="请输入邮箱地址" />
                </n-form-item>

                <n-form-item label="手机号" path="phone">
                  <n-input v-model:value="personalForm.phone" placeholder="请输入手机号码" />
                </n-form-item>

                <n-form-item label="所在城市" path="location">
                  <n-input v-model:value="personalForm.location" placeholder="请输入所在城市" />
                </n-form-item>
              </div>

              <n-form-item label="个人网站" path="website" class="mt-4">
                <n-input v-model:value="personalForm.website" placeholder="请输入个人网站地址" />
              </n-form-item>

              <n-form-item label="个人简介" path="bio" class="mt-4">
                <n-input
                  v-model:value="personalForm.bio"
                  type="textarea"
                  placeholder="介绍一下你自己吧..."
                  :rows="4"
                  maxlength="200"
                  show-count
                />
              </n-form-item>

              <div class="mt-6 flex justify-end">
                <n-button
                  type="primary"
                  :loading="loading"
                  @click="handleSavePersonalInfo"
                >
                  保存更改
                </n-button>
              </div>
            </n-form>
          </div>
        </n-tab-pane>

        <!-- 安全设置 -->
        <n-tab-pane name="security" tab="安全设置">
          <div class="max-w-4xl py-6">
            <!-- 修改密码 -->
            <div class="mb-8">
              <h3 class="mb-4 text-lg font-semibold">
                修改密码
              </h3>
              <n-form
                ref="passwordFormRef"
                :model="passwordForm"
                :rules="passwordRules"
                label-placement="left"
                label-width="120"
                require-mark-placement="left"
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div class="md:col-span-2">
                    <n-form-item label="当前密码" path="oldPassword">
                      <n-input
                        v-model:value="passwordForm.oldPassword"
                        type="password"
                        placeholder="请输入当前密码"
                        show-password-on="click"
                      />
                    </n-form-item>
                  </div>

                  <n-form-item label="新密码" path="newPassword">
                    <n-input
                      v-model:value="passwordForm.newPassword"
                      type="password"
                      placeholder="请输入新密码"
                      show-password-on="click"
                    />
                  </n-form-item>

                  <n-form-item label="确认密码" path="confirmPassword">
                    <n-input
                      v-model:value="passwordForm.confirmPassword"
                      type="password"
                      placeholder="请再次输入新密码"
                      show-password-on="click"
                    />
                  </n-form-item>
                </div>

                <div class="mt-4 flex justify-end">
                  <n-button
                    type="primary"
                    :loading="passwordLoading"
                    @click="handleChangePassword"
                  >
                    修改密码
                  </n-button>
                </div>
              </n-form>
            </div>

            <n-divider />

            <!-- 两步验证 -->
            <div class="mb-8">
              <h3 class="mb-4 text-lg font-semibold">
                两步验证
              </h3>
              <div class="rounded-lg bg-gray-50 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium">
                      短信验证
                    </div>
                    <div class="text-sm text-gray-500">
                      使用手机短信进行二次验证
                    </div>
                  </div>
                  <n-switch />
                </div>
              </div>
            </div>

            <!-- 登录历史 -->
            <div>
              <h3 class="mb-4 text-lg font-semibold">
                最近登录
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(item, index) in [
                    { device: 'Chrome on Windows', location: '北京', time: '2024-01-15 14:30', current: true },
                    { device: 'Safari on iPhone', location: '上海', time: '2024-01-14 09:15', current: false },
                    { device: 'Chrome on MacOS', location: '深圳', time: '2024-01-13 16:45', current: false },
                  ]"
                  :key="index"
                  class="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <div class="flex items-center gap-3">
                    <div class="i-carbon-devices text-lg text-gray-600" />
                    <div>
                      <div class="font-medium">
                        {{ item.device }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ item.location }} · {{ item.time }}
                      </div>
                    </div>
                  </div>
                  <n-tag v-if="item.current" type="success" size="small">
                    当前设备
                  </n-tag>
                </div>
              </div>
            </div>
          </div>
        </n-tab-pane>

        <!-- 偏好设置 -->
        <n-tab-pane name="preferences" tab="偏好设置">
          <div class="max-w-4xl py-6">
            <!-- 外观设置 -->
            <div class="mb-8">
              <h3 class="mb-4 text-lg font-semibold">
                外观设置
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      主题模式
                    </div>
                    <div class="text-sm text-gray-500">
                      选择您偏好的界面主题
                    </div>
                  </div>
                  <n-select
                    v-model:value="systemSettings.theme"
                    :options="[
                      { label: '跟随系统', value: 'auto' },
                      { label: '浅色模式', value: 'light' },
                      { label: '深色模式', value: 'dark' },
                    ]"
                    class="w-32"
                  />
                </div>

                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      界面语言
                    </div>
                    <div class="text-sm text-gray-500">
                      选择界面显示语言
                    </div>
                  </div>
                  <n-select
                    v-model:value="systemSettings.language"
                    :options="[
                      { label: '简体中文', value: 'zh-CN' },
                      { label: 'English', value: 'en-US' },
                    ]"
                    class="w-32"
                  />
                </div>
              </div>
            </div>

            <n-divider />

            <!-- 通知设置 -->
            <div class="mb-8">
              <h3 class="mb-4 text-lg font-semibold">
                通知设置
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      邮件通知
                    </div>
                    <div class="text-sm text-gray-500">
                      接收重要更新的邮件通知
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.notifications.email" />
                </div>

                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      浏览器通知
                    </div>
                    <div class="text-sm text-gray-500">
                      在浏览器中显示通知
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.notifications.browser" />
                </div>

                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      手机推送
                    </div>
                    <div class="text-sm text-gray-500">
                      向手机发送推送通知
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.notifications.mobile" />
                </div>
              </div>
            </div>

            <n-divider />

            <!-- 隐私设置 -->
            <div class="mb-8">
              <h3 class="mb-4 text-lg font-semibold">
                隐私设置
              </h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      公开个人资料
                    </div>
                    <div class="text-sm text-gray-500">
                      允许其他用户查看您的个人资料
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.privacy.showProfile" />
                </div>

                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      显示活动状态
                    </div>
                    <div class="text-sm text-gray-500">
                      显示您的在线状态和最后活动时间
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.privacy.showActivity" />
                </div>

                <div class="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <div>
                    <div class="font-medium">
                      允许私信
                    </div>
                    <div class="text-sm text-gray-500">
                      允许其他用户向您发送私信
                    </div>
                  </div>
                  <n-switch v-model:value="systemSettings.privacy.allowMessages" />
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <n-button type="primary">
                保存偏好设置
              </n-button>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped>
.user-center :deep(.n-card) {
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-center :deep(.n-form-item-label) {
  font-weight: 500;
}

.user-center :deep(.n-input),
.user-center :deep(.n-select),
.user-center :deep(.n-textarea) {
  border-radius: 6px;
}

.user-center :deep(.n-button) {
  border-radius: 6px;
}

.user-center :deep(.n-tag) {
  border-radius: 4px;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .user-center {
    padding: 1rem;
  }

  .max-w-6xl {
    max-width: 100%;
  }

  .gap-6 {
    gap: 1rem;
  }

  .gap-4 {
    gap: 0.75rem;
  }
}
</style>
