export {}

declare global {
  /** 所有接口返回的响应式数据 */
  interface IapiResponseData<T> {
    data: T,
    message: string
  }
}