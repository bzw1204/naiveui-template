declare module 'color-kit'{
  export interface IThemeColor {
    hex: string
    hsv: {
      h: number
      s: number
      v: number
    }
    rgba: {
      r: number
      g: number
      b: number
      a: number
    }
  }
}
