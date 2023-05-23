/**
 * 网络请求配置
 */
 import axios from "axios";

 const http = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: process.env.VUE_APP_html_url,
  // withCredentials: true, 后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址啊
  // 60秒超时, 阿里云SLB默认60秒
  timeout: 50 * 1000
})

 /**
  * http request 拦截器
  */
http.interceptors.request.use(
  (config) => {
   // 拿到token 校验
    const token = localStorage.getItem('token')
    // Bearer 票据的意思
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
http.interceptors.response.use(
  (response) => {
    // data 是 API 返回的数据
    const data = response.data.data as any
    console.log(data, 'data');
    // 存放token
    data?.token && localStorage.setItem('token', data.token)
    if (data?.code === 401) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      location.reload()
    }
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
      }).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        errorMessage(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Delete(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        errorMessage(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        errorMessage(err);
        reject(err);
      }
    );
  });
}

// 失败提示
function errorMessage(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

export default http
