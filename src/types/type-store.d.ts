declare module 'store-types' {
  import type { GlobalTheme } from 'naive-ui'
  import type { MenuProps } from 'vue-router'

  interface ISettings {
    name: string
    showBreadcrumb: boolean
    showTabs: boolean
    menuWidth: number
    isDark: boolean
    globalTheme: GlobalTheme | null
    menus: MenuProps[]
  }
  interface IAuth {
    token: string
    permissions: string[]
    useInfo?: Record<string, any>
  }
}
