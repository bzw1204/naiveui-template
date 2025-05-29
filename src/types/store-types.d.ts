declare module 'store-types' {
  import type { GlobalTheme } from 'naive-ui'
  import type { MenuProps } from 'vue-router'

  type LayoutType = 'layoutDefaults' | 'layoutHead' | 'layoutMixing'
  interface ISettings {
    name: string
    showBreadcrumb: boolean
    showTabs: boolean
    menuWidth: number
    isDark: boolean
    globalTheme: GlobalTheme | null
    menus: MenuProps[]
    layoutType: LayoutType
    primaryColor: string
  }
  interface IAuth {
    token: string
    permissions: string[]
    useInfo?: Record<string, any>
  }
}
