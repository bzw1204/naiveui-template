import type { ITheme } from 'store-types'

export default defineStore('themes', {
  state: (): ITheme => ({
    layoutType: 'layoutDefaults',
    primaryColor: '#FF0000'
  }),
  persist: true
})
