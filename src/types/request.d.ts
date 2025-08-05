declare module 'alova-request' {
  interface R<T> {
    err_no: number
    msg: string
    data: T
  }
}
