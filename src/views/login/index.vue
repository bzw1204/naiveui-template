<script setup lang="ts">
import { colord } from 'colord'
import { useThemeVars } from 'naive-ui'
import DarkVeil from '@/components/dark-veil.vue'
import ThemeToggleButton from '@/components/theme-toggle/index.vue'
import { Forget, Login } from './components'

const formTypeMap: Record<string, Component> = {
  login: Login,
  forget: Forget
}
const themeVars = useThemeVars()
const bodyColor = computed(() => colord(themeVars.value.bodyColor).toHex())
const { themeColors } = storeToRefs(useSettingsStore())
const formType = shallowRef<Component>(Login)
onMounted(() => {
  window.$ipc.on('set-form-type', (type: string) => {
    formType.value = formTypeMap[type]
  })
})
onUnmounted(() => {
  window.$ipc.off('set-form-type')
})
</script>

<template>
  <div class=":uno: relative wh-screen">
    <DarkVeil
      :color-stops="[themeColors.primaryColor, bodyColor, themeColors.primaryColor]"
      :hue-shift="0"
      :noise-intensity="0"
      :scanline-intensity="0"
      :speed="0.5"
      :scanline-frequency="0"
      :warp-amount="0"
      :resolution-scale="1"
    />
    <n-el class=":uno: login-bg absolute left-0 top-0 wh-screen flex-center bg-cover">
      <n-flex class=":uno: m-auto h-500 w-900 shadow-lg" :wrap="false" :size="0">
        <!-- 左侧视觉区域 -->
        <n-flex
          vertical
          align="center"
          :size="50"
          class=":uno: box-border h-500 w-400 overflow-hidden from-[var(--info-color)] to-[var(--primary-color)] bg-gradient-to-br p-30 text-white"
        >
          <div class="w-full flex justify-end">
            <ThemeToggleButton class="self-end" />
          </div>
          <div class="i-local:logo text-180 text-[#000] font-bold" />
          <div class="text-28 text-#000 font-bold">
            黑匣子运营平台
          </div>
        </n-flex>

        <!-- 右侧登录表单 -->
        <div class=":uno: box-border h-500 w-500 bg-[var(--card-color)] p-30">
          <Transition name="fade" mode="out-in" appear>
            <component :is="formType" />
          </Transition>
        </div>
      </n-flex>
    </n-el>
  </div>
</template>
