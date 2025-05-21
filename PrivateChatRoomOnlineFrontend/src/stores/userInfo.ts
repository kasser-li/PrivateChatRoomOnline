import { defineStore } from 'pinia'
import type { AccountInfo } from '../api/userInfo/userInfo'

export const userInfoStore = defineStore('userInfo', {
  persist: true, // 持久化存储
  //  存储数据
  state: () => {
    return {
      userInfo: {} as Partial<AccountInfo>, // 用户信息
      token: '', // 用户 token
    }
  },
  // 修改数据复杂逻辑
  actions: {
    // 修改用户信息
    setUserInfo(data: any) {
      this.$state.userInfo = data.userInfo
      this.$state.token = data.token
    },
    loginOut() {
      this.$state.userInfo = {}
      this.$state.token = ''
      localStorage.removeItem('token')
    },
  },
  // state 简单数据操作
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },

    getUserName(state) {
      return state.userInfo?.name
    },
    getToken(state) {
      return state.token
    },
    // maxSum(state){
    //     return state.sum * 10
    // },
    // upperName:state=>state.name.toUpperCase()
  },
})
