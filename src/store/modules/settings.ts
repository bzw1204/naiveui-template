import type { ISettings } from 'store-types'

export default defineStore('settings', {
  state: (): ISettings => ({
    name: 'NaiveUI Admin',
    menuWidth: 220,
    isDark: false,
    globalTheme: null,
    menus: [],
    showBreadcrumb: true,
    showTabs: false,
    layoutType: 'layoutDefaults',
    primaryColor: '#FF0000'
  }),
  persist: true,
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
    }
  }
})
