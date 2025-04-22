// 引入pinia
import pinia from '@/stores/index.ts'
import { userInfoStore } from '@/stores/userInfo.ts'

// 获取token
export const getToken = async () => {
  const userStore = userInfoStore(pinia)
  // let token = userStore.getToken
  
  return userStore.token || JSON.parse(localStorage.getItem('userInfo')||'{}').token || ''
}
