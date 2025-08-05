import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { cleanseRedirect, createMenus, RouteListener } from '@/utils/route'
import dynamicRoute from './dynamic-route'
import staticRoute from './static-route'
// @unocss-include
// https://www.whidy.net/unocss-dynamic-icon-not-show
// https://unocss-study-examples.netlify.app/#/CSSIcon
function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw {
  return {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    redirect: routes.filter(route => route.meta?.isHome)[0]?.path,
    children: routes
  }
}
const dynamicRoutes = dynamicRoute()
// 生成菜单并存储
export const menus = createMenus(dynamicRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    setupLayouts(dynamicRoutes),
    ...staticRoute
  ]
})

router.beforeEach((to, from, next) => {
  window.$loadingBar?.start()
  // 判断是否登录
  const { isLogin } = storeToRefs(useAuthStore())
  if (isLogin.value) {
    to.name === 'Login' ? next({ path: '/dashboard' }) : next()
  } else if (to.name === 'Login') {
    next()
  } else {
    next({ name: 'Login', query: cleanseRedirect(from.path) })
  }
  RouteListener.emit(to)
})

router.afterEach(() => window.$loadingBar?.finish())
export default router
