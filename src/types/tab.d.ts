declare module 'tab' {
  interface ITabStore {
    active: string
    pin: RouteLocationNormalized[]
    tabs: RouteLocationNormalized[]
  }
}
