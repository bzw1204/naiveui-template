declare module 'auth' {
  interface IAuth {
    token: string
    permissions: string[]
    useInfo: IUserInfo
  }
  interface ILoginForm {
    username: string
    password: string
  }
  interface IUserInfo {
    id: number
    account: string
    mobile: string
    role?: string
  }
}
