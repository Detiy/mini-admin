export interface IloginRequestData {
  // 用户名
  userName: string | 'admin',
  // 密码
  password: string | number
}
export type LoginResponseData = IapiResponseData<{ token: string}>

