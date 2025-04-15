import axios from 'axios'
import { getToken } from '@/utils/auth.ts'
// 获取token
const token = getToken()
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 与后端约定的请求头
    'Content-Type': 'application/json;charset=UTF-8',
    // 'token': token
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// request 拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 这里可以添加 token 等请求头
    // console.log('拦截器：', config)
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    if (config.method === 'get') {
      config.params = config.data
    }

    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)
// response 拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
// 处理请求参数

// // get
// request.get = function (url: string, params: any) {
//   return request({
//     method: 'get',
//     url,
//     params,
//   })
// }
// // post
// request.post = function (url: string, data: any) {
//   return request({
//     method: 'post',
//     url,
//     data,
//   })
// }
export default request
