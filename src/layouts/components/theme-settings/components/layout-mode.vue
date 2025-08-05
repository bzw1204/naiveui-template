<script setup lang="ts">
import type { ProLayoutMode } from 'pro-naive-ui'

interface LayoutItem {
  value: ProLayoutMode
  label: string
  class: string
}
/**
 * vertical: 竖向布局
 * horizontal: 横向布局
 * sidebar: 侧边栏布局
 * mixed-sidebar: 混合侧边栏布局
 * full-content: 全内容布局
 * two-column: 双栏布局
 * mixed-two-column: 混合双栏布局
 */
const layoutList = reactive<Record<Exclude<ProLayoutMode, 'full-content' | 'sidebar' | 'two-column' | 'mixed-two-column'>, LayoutItem>>({
  'vertical': {
    value: 'vertical',
    label: '垂直布局',
    class: 'layout-vertical'
  },
  'horizontal': {
    value: 'horizontal',
    label: '横向布局',
    class: 'layout-horizontal'
  },
  'mixed-sidebar': {
    value: 'mixed-sidebar',
    label: '双栏布局',
    class: 'layout-mixing'
  }
})
const { layoutType } = storeToRefs(useSettingsStore())
</script>

<template>
  <n-el class="w-full flex items-center justify-center gap-15">
    <n-tooltip v-for="item in layoutList" :key="item.value" trigger="hover">
      <template #trigger>
        <div
          :class="layoutType === item.value ? `current-layout ${item.class}` : item.class"
          @click="() => layoutType = item.value"
        >
          <span class="layout-icon i-carbon:CheckmarkOutline" />
        </div>
      </template>
      <div>{{ item.label }}</div>
    </n-tooltip>
  </n-el>
</template>

<style lang="scss" scoped>
.layout-vertical,
.layout-horizontal,
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

.layout-vertical {
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

.layout-horizontal {
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
