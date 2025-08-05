import type { ISetting } from 'settings'
import { useFullscreen, useMediaQuery } from '@vueuse/core'
import { transformHoverColor, transformPressedColor } from '@/utils'

const docEle = ref(document.documentElement)
const { isFullscreen, toggle } = useFullscreen(docEle)
const isMobile = useMediaQuery('(max-width: 700px)')

const useSettingsStore = defineStore('settings', {
  state: (): ISetting => ({
    name: '黑匣子运营平台',
    theme: 'light',
    header: {
      height: 64,
      multilingual: {
        visible: true
      }
    },
    breadcrumb: {
      visible: true,
      icon: true
    },
    tab: {
      visible: false,
      cache: true,
      height: 40,
      mode: 'tab'
    },
    sider: {
      collapsed: false,
      accordion: false,
      inverted: false,
      width: 220,
      collapsedWidth: 64,
      collapsedIconSize: 20,
      mixWidth: 220,
      mixCollapsedWidth: 64,
      mixChildMenuWidth: 220
    },
    animationMode: 'fade-scale',
    layoutType: 'vertical',
    themeColor: {
      primaryColor: '#18A058',
      infoColor: '#2080F0',
      successColor: '#18A058',
      warningColor: '#F0A020',
      errorColor: '#d03050'
    }
  }),
  persist: true,
  getters: {
    isDark: state => state.theme === 'dark',
    isMobile() {
      return isMobile.value
    },
    themeColors: ({ themeColor }) => {
      const primary = themeColor.primaryColor
      const info = themeColor.infoColor
      const success = themeColor.successColor
      const warning = themeColor.warningColor
      const error = themeColor.errorColor
      return {
        primaryColor: primary,
        primaryColorHover: transformHoverColor(primary), // 调整色相,
        primaryColorPressed: transformPressedColor(primary),
        primaryColorSuppl: transformHoverColor(primary),
        infoColor: info,
        infoColorHover: transformHoverColor(info),
        infoColorPressed: transformPressedColor(info),
        infoColorSuppl: transformHoverColor(info),
        successColor: success,
        successColorHover: transformHoverColor(success),
        successColorPressed: transformPressedColor(success),
        successColorSuppl: transformHoverColor(success),
        warningColor: warning,
        warningColorHover: transformHoverColor(warning),
        warningColorPressed: transformPressedColor(warning),
        warningColorSuppl: transformHoverColor(warning),
        errorColor: error,
        errorColorHover: transformHoverColor(error),
        errorColorPressed: transformPressedColor(error),
        errorColorSuppl: transformHoverColor(error)
      }
    },
    breadcrumbVisible: state => state.breadcrumb.visible && !['horizontal', 'mixed-two-column', 'mixed-sidebar'].includes(state.layoutType),
    showHorizontalMenu: state => ['horizontal', 'mixed-two-column', 'mixed-sidebar'].includes(state.layoutType),
    fullScreen() {
      return isFullscreen.value
    }
  },
  actions: {
    toggleTheme() {
      this.theme = this.isDark ? 'light' : 'dark'
    },
    /* 切换全屏 */
    toggleFullScreen() {
      toggle()
    }
  }
})
export default useSettingsStore
