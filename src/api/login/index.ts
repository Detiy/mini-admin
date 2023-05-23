import axios from '@/api/request'
import type * as Login from "@/api/login/login"

// 登录
const login = {
  login(params:Login.IloginRequestData) {
    return axios.get('api/pc/login', { params })
  }
}
export default login