// 引入pinia
import pinia from '@/stores/index.ts'
import { userInfoStore } from '@/stores/userInfo.ts'
const userStore = userInfoStore(pinia)
// 获取token
export const getToken = () => {
  return userStore.token || localStorage.getItem('token') || ''
}
