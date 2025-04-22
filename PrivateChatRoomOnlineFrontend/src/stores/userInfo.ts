import { defineStore } from 'pinia'
import type { UserInfo } from '../api/userInfo/userInfo'

export const userInfoStore = defineStore('userInfo', {
  persist: true, // 持久化存储
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'userInfo',
  //       storage: localStorage,
  //     },
  //   ],
  //   // paths: ['userInfo'], // 只存储 userInfo 属性
  // }, // 开启持久化存储
  //  存储数据
  state: () => {
    return {
      userInfo: {} as Partial<UserInfo>,
    }
  },
  // 修改数据复杂逻辑
  actions: {
    // 修改用户信息
    setUserInfo(userInfo: any) {
      // userInfo 可以不全部修改
      // 只修改部分属性
      console.log('userInfo', userInfo)
      this.$state.userInfo = {
        ...this.$state.userInfo,
        ...userInfo,
      }
    },
    loginOut() {
      this.$state.userInfo = {}
      localStorage.removeItem('token')
    },
  },
  // state 简单数据操作
  getters: {
    getUserInfo(state) {
      return state.userInfo.userInfo
    },

    getUserName(state) {
      return state.userInfo.userInfo?.name
    },
    getToken(state) {
      return state.userInfo?.token
    },
    // maxSum(state){
    //     return state.sum * 10
    // },
    // upperName:state=>state.name.toUpperCase()
  },
})
