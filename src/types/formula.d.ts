declare module 'formula' {
  export interface IFormula {
    url?: any
    text?: string
    desc?: string
    code?: string
  }

  export interface ICustomFormula {
    title: string
    expression: string
    size?: number
    flexCol?: boolean
    list: {
      title: string
      items: string[]
    }[]
  }
  interface IPresetFormula {
    title: string
    expression: string
    size?: number
    list: IFormula[]
  }
}
