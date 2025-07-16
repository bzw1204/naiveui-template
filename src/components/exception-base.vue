<script lang="ts" setup name="ExceptionBase">
type ExceptionType = 403 | 404 | 500
interface IProps {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type?: ExceptionType
}
const { type = 404 } = defineProps<IProps>()
const iconMap: Record<ExceptionType, string> = {
  403: 'i-color:not-permission',
  404: 'i-color:not-found',
  500: 'i-color:service-error'
}
</script>

<template>
  <div class="box-border h-screen w-screen flex flex-col items-center justify-center gap-10px p-48">
    <span class="text-800" :class="iconMap[type]" />
    <router-link :to="{ path: '/dashboard' }">
      <n-button type="primary">
        返回首页
      </n-button>
    </router-link>
  </div>
</template>
