import { cleanseRedirect, generatorMenu, RouteListener } from '@/utils/route'
import { useLocalStorage } from '@vueuse/core'
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import dynamicRoute from './dynamic-route'
import staticRoute from './static-route'

const dynamicRoutes = dynamicRoute()
// 生成菜单并存储
export const menus = generatorMenu(dynamicRoutes, '*')
useLocalStorage('menus', menus)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/new-login.vue')
    },
    ...setupLayouts(dynamicRoutes),
    ...staticRoute
  ]
})

router.beforeEach((to, from, next) => {
  window.$loadingBar!.start()
  // 判断是否登录
  const { isLogin } = storeToRefs(useAuthStore())
  if (isLogin.value) {
    to.name === 'Login' ? next({ path: '/' }) : next()
  }
  else if (to.name === 'Login') {
    next()
  }
  else {
    next({ name: 'Login', query: cleanseRedirect(from.path) })
  }
  RouteListener.emit(to)
})

router.afterEach(() => window.$loadingBar?.finish())
export default router
