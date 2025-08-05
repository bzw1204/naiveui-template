import type { Emitter, EventType, Handler } from 'mitt'
import type { MenuOption } from 'naive-ui'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import mitt from 'mitt'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { convertRouteToTree, renderIcon } from '@/utils'

// 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
export class RouteListener {
  latestRoute: RouteLocationNormalized | null = null
  emitter: Emitter<Record<EventType, unknown>> = mitt()
  key: any = Symbol('ROUTE_CHANGE')
  private static _instance: RouteListener
  static getInstance() {
    if (!RouteListener._instance) {
      RouteListener._instance = new RouteListener()
    }
    return RouteListener._instance
  }

  static on(handler: (route: RouteLocationNormalized) => void, immediate = true) {
    const instance = RouteListener.getInstance()
    if (immediate && instance.latestRoute) {
      handler(instance.latestRoute)
    }
    instance.emitter.on(instance.key, handler as Handler)
  }

  static emit(to: RouteLocationNormalized) {
    const instance = RouteListener.getInstance()
    instance.emitter.emit(instance.key, to)
    instance.latestRoute = to
  }

  static destroyed() {
    const instance = RouteListener.getInstance()
    instance.emitter.off(instance.key)
  }
}

export function sortRoutes(routes: RouteRecordRaw[]) {
  // 简化排序逻辑 - 不需要检查 meta 存在性，因为使用了 ?? 操作符
  routes.sort((a, b) => (a.meta?.order ?? 0) - (b.meta?.order ?? 0))

  // 递归处理子路由，直接在 forEach 中处理
  routes.forEach((route) => {
    if (route.children?.length) {
      sortRoutes(route.children)
    }
  })

  return routes
}

/* 生成侧边菜单的数据 */
export function createMenus(userRoutes: RouteRecordRaw[]) {
  // filter menus that do not need to be displayed
  const visibleMenus = userRoutes.filter(route => !(route.meta?.hide ?? false))
  // generate side menu
  const menus = transformAuthRoutesToMenus(visibleMenus)
  const tree = convertRouteToTree<MenuOption, 'key', 'children'>(menus)
  return tree
}

// render the returned routing table as a sidebar
function transformAuthRoutesToMenus(userRoutes: RouteRecordRaw[]): MenuOption[] {
  function renderMenu({ meta, path, children }: RouteRecordRaw): MenuOption {
    const isDir = !meta?.menuType || meta?.menuType === 'page'
    const menuItem: MenuOption = {
      label: () => (isDir ? h(RouterLink, { to: { path } }, { default: () => meta?.title }) : meta?.title),
      key: path,
      icon: meta?.icon ? renderIcon(meta.icon) : undefined
    }

    // 处理子路由
    if (children && children.length > 0) {
      // 过滤掉隐藏的子路由
      const visibleChildren = children.filter(child => !(child.meta?.hide ?? false))
      if (visibleChildren.length > 0) {
        menuItem.children = transformAuthRoutesToMenus(visibleChildren)
      }
    }

    return menuItem
  }
  return sortRoutes(userRoutes)
  // Filter out side menus without permission
  // .filter(i => hasPermission(i.meta.permission))
  //  Sort the menu according to the order size

    // Convert to side menu data structure
    .map(renderMenu)
}
/**
 * 净化Redirect
 * @param path 需要重定向的路由path
 */
export function cleanseRedirect(path: string) {
  return ['/dashboard', '/login'].includes(path) ? {} : { redirect: path }
}
// 为父级菜单添加自动 redirect
export function addRedirect<T extends RouteRecordRaw>(routes: T[]) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      // 如果父级路由没有设置 redirect，则自动设置为第一个子路由
      if (!route.redirect) {
        route.redirect = route.children[0].path
      }
      // 递归处理子路由
      addRedirect(route.children)
    }
  })
}
