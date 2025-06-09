<script setup lang="ts">
import type { BreadcrumbProps } from 'vue-router'
import { RouteListener } from '@/utils/route'
import IconHome from '~icons/carbon/Home'

const breadcrumbs = ref<BreadcrumbProps[]>([])

const home = {
  key: 'home',
  path: '/',
  label: '首页',
  icon: IconHome
}
onMounted(() => {
  RouteListener.on((route) => {
    console.log('route.matched', route.matched)
    // 过滤并映射路由，确保没有重复的路径
    const routeBreadcrumbs = route.matched
      .filter(x => !x.meta.isLayout && x.path !== '/') // 过滤掉布局路由和根路径
      .map((x) => {
        return {
          key: x.path || x.name?.toString() || Math.random().toString(), // 确保有唯一key
          path: x.path,
          label: x.meta.title,
          icon: x.meta.icon
        }
      })

    // 去重处理，基于路径去重
    const uniqueBreadcrumbs = routeBreadcrumbs.filter((item, index, arr) =>
      arr.findIndex(x => x.path === item.path) === index
    )

    // 判断是否需要添加首页，只有当不是首页路由且没有首页项目时才添加
    if (route.path !== '/' && !uniqueBreadcrumbs.some(x => x.path === '/')) {
      breadcrumbs.value = [home, ...uniqueBreadcrumbs]
    }
    else {
      breadcrumbs.value = uniqueBreadcrumbs
    }
  })
})
onUnmounted(() => {
  RouteListener.destroyed()
})
</script>

<template>
  <n-breadcrumb class="animated-breadcrumb">
    <TransitionGroup
      name="breadcrumb"
      tag="div"
      class="breadcrumb-container"
    >
      <n-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.key"
        :style="{
          '--index': index,
        }"
        class="breadcrumb-item"
      >
        <div class="breadcrumb-content">
          <n-icon
            v-if="breadcrumb.icon"
            :component="breadcrumb.icon"
            class="breadcrumb-icon"
          />
          <span class="breadcrumb-label">{{ breadcrumb.label }}</span>
        </div>
      </n-breadcrumb-item>
    </TransitionGroup>
  </n-breadcrumb>
</template>

<style scoped>
.animated-breadcrumb {
  --primary-color: #18a058;
  --transition-duration: 250ms;
  --transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 0;
}

.breadcrumb-item {
  position: relative;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all var(--transition-duration) var(--transition-ease);
}

.breadcrumb-icon {
  font-size: 14px;
  transition: all var(--transition-duration) var(--transition-ease);
}

.breadcrumb-label {
  font-size: 14px;
  line-height: 1.4;
  transition: all var(--transition-duration) var(--transition-ease);
}

/* 核心进入/离开动画 */
.breadcrumb-enter-active {
  transition: all 300ms var(--transition-ease);
  transition-delay: calc(var(--index) * 60ms);
}

.breadcrumb-leave-active {
  transition: all 200ms ease-in;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(-12px);
}

.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.breadcrumb-move {
  transition: transform 300ms var(--transition-ease);
}

/* 优雅的悬停效果 */
.breadcrumb-item:hover .breadcrumb-content {
  background-color: rgba(24, 160, 88, 0.08);
  transform: translateY(-1px);
}

.breadcrumb-item:hover .breadcrumb-icon {
  color: var(--primary-color);
  transform: scale(1.05);
}

.breadcrumb-item:hover .breadcrumb-label {
  color: var(--primary-color);
}

/* 链接样式优化 */
.breadcrumb-item:not(:last-child) .breadcrumb-content {
  cursor: pointer;
}

.breadcrumb-item:not(:last-child):active .breadcrumb-content {
  transform: translateY(0);
  background-color: rgba(24, 160, 88, 0.12);
}

/* 最后一个项目（当前页面）的样式 */
.breadcrumb-item:last-child .breadcrumb-label {
  font-weight: 500;
  color: var(--primary-color);
}

.breadcrumb-item:last-child .breadcrumb-icon {
  color: var(--primary-color);
}

/* 分隔符优化 */
.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 8px;
  color: #d1d5db;
  font-size: 12px;
  transition: color var(--transition-duration) var(--transition-ease);
}

.breadcrumb-item:not(:last-child):hover::after {
  color: #9ca3af;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .breadcrumb-content {
    gap: 4px;
    padding: 3px 6px;
  }

  .breadcrumb-label {
    font-size: 13px;
  }

  .breadcrumb-icon {
    font-size: 13px;
  }

  .breadcrumb-item:not(:last-child)::after {
    margin: 0 6px;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .breadcrumb-item:hover .breadcrumb-content {
    background-color: rgba(24, 160, 88, 0.12);
  }

  .breadcrumb-item:not(:last-child)::after {
    color: #6b7280;
  }

  .breadcrumb-item:not(:last-child):hover::after {
    color: #9ca3af;
  }
}
</style>
