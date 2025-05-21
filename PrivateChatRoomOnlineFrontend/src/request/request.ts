import axios from 'axios'
import { getToken } from '@/utils/auth.ts'
// 引入element-plus的message组件
import { ElMessage } from 'element-plus'
import router from '@/router'

// 获取token
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
  async (config) => {
    // 在发送请求之前做些什么
    // 这里可以添加 token 等请求头
    // // console.log('拦截器：', config)
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    if (config.method === 'get') {
      config.params = config.data
    }
    // 添加token
    const token = await getToken()
    if (token) {
      // config.headers['token'] = token
      // 添加权限
      config.headers['Authorization'] = 'Bearer ' + token
    }
    console.log('发送拦截器：', config)
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
    if (response.status !== 200) {
      ElMessage({
        message: response.data.message || 'server error',
        type: 'error',
        duration: 2000,
      })
    }
    console.log('返回拦截器：', response)
    if (response.status === 200 && response.data.code === 200) {
      // let cookie = response.headers['etag']
      // let cookie = response.headers['set-cookie']
      // console.log('返回拦截器 cookie：', cookie)
      
        return (response.data = response.data.data)
    } else {
      
      return response.data
    }
  },
  (error) => {
    // 对响应错误做点什么   

    console.log('返回拦截器 error：', error);
    const response = error.response
    const { errorCode,message } = response.data.data
    ElMessage.error(message)
      switch(errorCode){
        case 400:
          router.push('/')
          break;

        case 401:
          // ElMessage.error('登录过期，请重新登录')
          router.push('/login')
          break;
        
        case 403:
          // ElMessage.error('权限不足，请联系管理员')
          router.push('/')
          break;
        default:
          ElMessage.error(response.data.message || 'server error')
      }
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
