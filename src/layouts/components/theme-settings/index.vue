<script setup lang="ts" name="ThemeSettings">
import type { IThemeColor } from 'color-kit'
import { set, useCssVar } from '@vueuse/core'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

const visible = defineModel<boolean>()
const { isDark, layoutType, primaryColor } = storeToRefs(useSettingStore())
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
  <n-drawer
    v-model:show="visible"
    :width="350"
    :show-mask="false"
    :auto-focus="false"
    :mask-closable="false"
  >
    <n-drawer-content title="主题设置" closable :native-scrollbar="false" footer-class="!py-8">
      <n-flex vertical align="center" class="w-full">
        <n-flex vertical class="w-full">
          <n-divider dashed>
            导航模式
          </n-divider>
          <n-el class="w-full flex items-center justify-center gap-15">
            <n-tooltip v-for="item in layoutList" :key="item.value" trigger="hover">
              <template #trigger>
                <div :class="layoutType === item.value ? `current-layout ${item.class}` : item.class">
                  <span class="i-carbon:CheckmarkOutline layout-icon" />
                </div>
              </template>
              <div>{{ item.label }}</div>
            </n-tooltip>
          </n-el>
        </n-flex>
        <n-flex vertical align="center" class="w-full">
          <n-divider dashed>
            主题设置
          </n-divider>
          <ColorPicker
            :theme="isDark ? 'dark' : 'light'"
            sucker-hide
            :colors-default="presetColors"
            :color="primaryColor"
            class="w-full"
            :size="300"
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

<style lang="scss" scoped>
.layout-defaults,
.layout-head,
.layout-mixing {
  width: 70px;
  height: 50px;
  overflow: hidden;
  background: var(--card-color);
  border-radius: var(--n-border-radius);
  box-shadow: var(--box-shadow-1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px 12px 0;
  cursor: pointer;
  position: relative;
  transition: box-shadow 0.2s, border 0.2s, background 0.2s;
  border: 2px solid transparent;

  &:hover {
    box-shadow: var(--box-shadow-1);
    border: 2px solid var(--primary-color, var(--n-primary-color));
    background: var(--n-color-hover, var(--card-color));
  }

  .layout-icon {
    position: absolute;
    right: 2px;
    bottom: 2px;
    color: var(--n-text-color-disabled);
    transition: color 0.2s;
  }
}

.current-layout {
  border: 2px solid var(--primary-color, var(--n-primary-color));
  box-shadow: var(--box-shadow-1);

  .layout-icon {
    color: var(--primary-color, var(--n-primary-color));
  }
}

.layout-defaults {
  &::before {
    position: absolute;
    left: 0;
    width: 15px;
    height: 100%;
    content: "";
    background: var(--inverted-color);
    border-radius: var(--n-border-radius) 0 0 var(--n-border-radius);
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 15px);
    height: 15px;
    content: "";
    background: var(--placeholder-color);
    border-radius: 0 var(--n-border-radius) 0 0;
  }
}

.layout-head {
  &::before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 15px;
    content: "";
    background: var(--placeholder-color);
    border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
  }
}

.layout-mixing {
  &::before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 15px;
    content: "";
    background: var(--placeholder-color);
    border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
  }

  &::after {
    position: absolute;
    top: 15px;
    left: 0;
    width: 15px;
    height: calc(100% - 15px);
    content: "";
    background: var(--placeholder-color);
    border-radius: 0 0 0 var(--n-border-radius);
  }
}
</style>
