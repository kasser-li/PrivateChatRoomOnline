// 引入pinia
import pinia from '@/stores/index.ts'
import { userInfoStore } from '@/stores/userInfo.ts'
const userStore = userInfoStore(pinia)
// 获取token
export const getToken = async () => {
  console.log('userStore.userInfo.toekn', userStore.userInfo.token)
  // let token = userStore.getToken
  return userStore.userInfo.token || localStorage.getItem('token') || ''
}
