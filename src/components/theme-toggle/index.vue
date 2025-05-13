<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
  type?: 'icon' | 'normal'
}
const { size, type } = withDefaults(defineProps<Props>(), {
  size: 'small',
  type: 'icon'
})
// 确保使用双向绑定
const isDark = defineModel<boolean>()
</script>

<template>
  <n-button
    quaternary
    :circle="type === 'icon'"
    :size="size"
    :focusable="false"
    class="theme-toggle-btn"
    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <template #icon>
      <div
        :class="[
          `i-carbon-${isDark ? 'moon' : 'sun'}`,
          { 'sun-rotate': !isDark, 'moon-appear': isDark },
        ]"
      />
    </template>
  </n-button>
</template>

<style scoped>
/* 主题切换按钮效果 */
.theme-toggle-btn {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 10; /* 确保按钮在最上层 */
  will-change: transform;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

/* 旋转太阳图标动画 */
.sun-rotate {
  animation: rotate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  transform-origin: center;
  filter: drop-shadow(0 0 8px rgba(255, 160, 0, 0.7));
  will-change: transform, opacity;
}

/* 月亮出现动画 */
.moon-appear {
  animation: appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  filter: drop-shadow(0 0 8px rgba(140, 170, 255, 0.7));
  will-change: transform, opacity;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.5);
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}
</style>
