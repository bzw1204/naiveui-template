declare module 'settings' {
  type LayoutType = 'layoutDefaults' | 'layoutHead' | 'layoutMixing'
  type ThemeType = 'dark' | 'light' | 'followSystem'
  type AnimationMode = 'fade-scale' | 'fade-slide' | 'fade' | 'fade-bottom' | 'zoom-fade' | 'zoom-out'
  interface IHeader {
    height: number
    /** Multilingual */
    multilingual: {
      /** Whether to show the multilingual */
      visible: boolean
    }
  }
  /** Sider */
  interface ISider {
    /** Whether to collapse the sider */
    collapsed: boolean
    /** Whether to accordion the sider */
    accordion: boolean
    /** Inverted sider */
    inverted: boolean
    /** Sider width */
    width: number
    /** Collapsed sider width */
    collapsedWidth: number
    /** Collapsed sider icon size */
    collapsedIconSize: number
    /** Sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
    mixWidth: number
    /** Collapsed sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
    mixCollapsedWidth: number
    /** Child menu width when the layout is 'vertical-mix' or 'horizontal-mix' */
    mixChildMenuWidth: number
  };

  interface IThemeColor {
    primaryColor: string
    infoColor: string
    successColor: string
    warningColor: string
    errorColor: string
  }
  interface ITab {
    /** Whether to show the tab */
    visible: boolean
    /**
     * Whether to cache the tab
     *
     * If cache, the tabs will get from the local storage when the page is refreshed
     */
    cache: boolean
    /** Tab height */
    height: number
    /** Tab mode */
    mode: UnionKey.ThemeTabMode
  };

  interface ISetting {
    name: string
    header: IHeader
    sider: ISider
    theme: ThemeType
    tab: ITab
    animationMode: AnimationMode
    layoutType: import('pro-naive-ui').ProLayoutMode
    themeColor: IThemeColor
    /** Header breadcrumb */
    breadcrumb: {
      visible: boolean
      icon: boolean
    }
  }
}
