<script setup lang="ts" name="ThemeSettings">
import type { IThemeColor } from 'color-kit'
import { useThemeStore } from '@/store'
import { set, useCssVar } from '@vueuse/core'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

const visible = defineModel<boolean>()
const { isDark } = storeToRefs(useSettingStore())
const { layoutType, primaryColor } = storeToRefs(useThemeStore())
const layoutList = reactive({
  layoutDefaults: {
    value: 'layoutDefaults',
    label: '默认布局',
    class: 'layout-defaults'
  },
  layoutHead: {
    value: 'layoutHead',
    label: '横向布局',
    class: 'layout-head'
  },
  layoutMixing: {
    value: 'layoutMixing',
    label: '混合布局',
    class: 'layout-mixing'
  }
})
const presetColors = ref<string[]>([
  '#165DFF',
  '#F53F3F',
  '#F77234',
  '#FF7D00',
  '#F7BA1E',
  '#FADC19',
  '#9FDB1D',
  '#00B42A',
  '#3491FA',
  '#c34d9c',
  '#722ED1',
  '#E6A23C',
  '#F56C6C',
  '#409EFF',
  '#42b883',
  '#b1d391'
])
// 这里处理unocss的primary-color
const bodyPrimaryColor = useCssVar('--primary-color', document.body, { initialValue: primaryColor.value })
function handlerColorChange(color: IThemeColor) {
  set(primaryColor, color.hex)
  set(bodyPrimaryColor, color.hex)
}
</script>

<template>
  <n-drawer v-model:show="visible" :width="502" :show-mask="false" :auto-focus="false">
    <n-drawer-content title="主题设置" closable :native-scrollbar="false" footer-class="!py-8">
      <n-flex vertical align="center">
        <n-flex vertical>
          <n-divider dashed>
            导航模式
          </n-divider>
          <n-tooltip v-for="item in layoutList" :key="item.value" trigger="hover">
            <template #trigger>
              <div
                :class="layoutType === item.value ? `current-layout ${item.class}` : item.class"
              >
                <span class="i-carbon:CheckmarkOutline" />
              </div>
            </template>
            <div>{{ item.label }}</div>
          </n-tooltip>
        </n-flex>
        <n-flex vertical>
          <n-divider dashed>
            主题设置
          </n-divider>
          <ColorPicker
            :theme="isDark ? 'dark' : 'light'"
            sucker-hide
            :colors-default="presetColors"
            :color="primaryColor"
            @change-color="handlerColorChange"
          />
        </n-flex>
      </n-flex>
      <template #footer>
        <n-flex>
          <n-button size="small" @click="() => visible = !visible">
            取消
          </n-button>
          <n-button size="small" type="primary">
            确定
          </n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
