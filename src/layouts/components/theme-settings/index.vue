<script setup lang="ts" name="ThemeSettings" vapor>
import { set, useCssVar } from '@vueuse/core'
import { SettingContent, SettingItem, LayoutMode } from './components'

const visible = ref(false)
const settingStore = useSettingsStore()
const { themeColor, animationMode, sider, tab, breadcrumb } = storeToRefs(settingStore)
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
const bodyPrimaryColor = useCssVar('--primary-color', document.body, { initialValue: themeColor.value.primaryColor })
const themeLabelMap: Record<string, string> = {
  primaryColor: '主题颜色',
  infoColor: '信息颜色',
  successColor: '成功颜色',
  warningColor: '警告颜色',
  errorColor: '错误颜色'
}
watch(themeColor, (n) => {
  set(bodyPrimaryColor, n.primaryColor)
}, { deep: true })
function handlerColorChange(color: string, key: string) {
  set(themeColor, { ...themeColor.value, [key]: color })
}
const backgroundAnimationOptions = [
  {
    label: '无',
    value: 'none'
  },
  {
    label: '滑动',
    value: 'fade-slide'
  },
  {
    label: '淡入淡出',
    value: 'fade'
  },
  {
    label: '底部消退',
    value: 'fade-bottom'
  },
  {
    label: '缩放消退',
    value: 'fade-scale'
  },
  {
    label: '渐变',
    value: 'zoom-fade'
  },
  {
    label: '闪现',
    value: 'zoom-out'
  }
]
function show() {
  visible.value = true
}
defineExpose({
  show
})
</script>

<template>
  <n-modal v-model:show="visible" class="w-450" preset="card" title="主题设置" size="small" :bordered="false"
    :show-icon="false" :auto-focus="false" :close-on-esc="false" footer-class="" :mask-closable="false">
    <NScrollbar class="max-h-400" content-class="pr-15">
      <n-flex vertical align="center">
        <SettingContent title="导航模式">
          <LayoutMode />
        </SettingContent>
        <!-- 主题设置 -->
        <SettingContent title="主题设置">
          <SettingItem v-for="(color, key) in themeColor" :key="key" :label="themeLabelMap[key]">
            <NColorPicker :value="color" :show-alpha="false" :swatches="presetColors"
              @update:value="handlerColorChange($event, key)" />
          </SettingItem>
        </SettingContent>

        <!-- 页面设置 -->
        <SettingContent title="页面设置">
          <SettingItem label="背景动画">
            <n-select v-model:value="animationMode" :options="backgroundAnimationOptions" />
          </SettingItem>
          <SettingItem label="手风琴模式">
            <n-switch v-model:value="sider.accordion" />
          </SettingItem>
          <SettingItem label="侧边栏宽度">
            <n-input-number v-model:value="sider.width" :min="100" :max="300" :step="10" />
          </SettingItem>
          <SettingItem label="侧边栏折叠宽度">
            <n-input-number v-model:value="sider.collapsedWidth" :min="54" :max="74" :step="1" />
          </SettingItem>
          <SettingItem label="侧边栏图标大小">
            <n-input-number v-model:value="sider.collapsedIconSize" :min="10" :max="30" :step="1" />
          </SettingItem>
          <SettingItem label="显示面包屑">
            <n-switch v-model:value="breadcrumb.visible" />
          </SettingItem>
          <SettingItem label="显示Tabs">
            <n-switch v-model:value="tab.visible" />
          </SettingItem>
        </SettingContent>
      </n-flex>
    </NScrollbar>
    <template #footer>
      <n-flex justify="end" gap="15">
        <n-button size="small" type="error" @click="settingStore.$reset()">
          重置
        </n-button>
        <n-button type="primary" size="small" @click="() => visible = !visible">
          确定
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>
