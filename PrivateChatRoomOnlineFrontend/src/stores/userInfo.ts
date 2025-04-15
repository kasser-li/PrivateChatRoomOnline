import { defineStore } from 'pinia'
import type { UserInfo } from '../api/userInfo/userInfo'
export const userInfoStore = defineStore('userInfo', {
  //  存储数据
  state() {
    return {
      userInfo: {} as UserInfo,
      token: '',
    }
  },
  // 修改数据复杂逻辑
  actions: {
    // 修改用户信息
    setUserInfo(userInfo: any) {
      // userInfo 可以不全部修改
      // 只修改部分属性
      this.$state = {
        ...this.$state,
        ...userInfo,
      }
    },
  },
  // state 简单数据操作
  getters: {
    getUserName(state) {
      return state.name
    },
    getToken(state: any) {
      return state.token
    },
    // maxSum(state){
    //     return state.sum * 10
    // },
    // upperName:state=>state.name.toUpperCase()
  },
})
