import { defineStore } from 'pinia'
// import type { UserInfo } from '../api/userInfo/userInfo'

export const roomListStore = defineStore('roomList', {
  persist: true, // 持久化存储
  //  存储数据
  state: () => {
    return {
      roomList: [] as any[],
      //   as Partial<UserInfo>,
    }
  },
  // 修改数据复杂逻辑
  actions: {
    // 更新房间列表
    setRoomList(roomList: any) {
      this.$state.roomList = roomList
    },
    // 删除房间
    delRoom(roomId: string) {
      this.$state.roomList = this.$state.roomList.filter((item: any) => item._id !== roomId)
    },
    // 添加房间
    addRoom(room: any) {
      this.$state.roomList = [...this.$state.roomList, room]
    },
  },
  // state 简单数据操作
  getters: {
    // 获取房间列表
    getRoomList(state): any[] {
      return state.roomList
    },
  },
})
