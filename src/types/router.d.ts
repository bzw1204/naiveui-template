import type { Raw } from 'vue'

export * from 'vue-router'

declare module 'vue-router' {
  type RouteType = 'route' | 'link' | 'iframe'
  interface LinkProps {
    href: string
    target: '_blank' | 'viewFrame'
  }
  type LinkType = string | LinkProps

  type MenuType = 'dir' | 'page'
  interface RouteMeta {
    title: string
    icon?: Raw<Component> | string
    order?: number
    isHome?: boolean
    isLayout?: boolean
    cache?: boolean
    routeType?: RouteType // 路由类型
    link?: LinkType// 当路由类型为 link | iframe 时需要填写此信息
    permission?: string | string[] // 权限
    description?: string // 描述
    /** 当前路由不在左侧菜单显示，但需要高亮某个菜单的情况 */
    activeMenu?: string
    /** 当前路由是否会被添加到Tab中 */
    withoutTab?: boolean
    hidden?: boolean // 是否隐藏
    /** 当前路由是否会被固定在Tab中,用于一些常驻页面 */
    pinTab?: boolean
    /** 当前路由在左侧菜单是目录还是页面,不设置默认为page */
    menuType?: MenuType
    redirect?: RouteRecordRedirectOption
    /* 是否开启页面缓存 */
    keepAlive?: boolean
  }
  interface BreadcrumbProps {
    key: string
    label: string
    icon?: Component
  }
}
