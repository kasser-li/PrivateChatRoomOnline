<template>
  <div class="chat-container">
    <div class="chat-list">
      <!-- 聊天室列表 -->
      <chatItem
        :data-target="'folder'"
        v-for="chatRoomInfo in chatList"
        :chatRoomInfo="chatRoomInfo"
        @checkIntoRoom="checkIntoRoom(chatRoomInfo)"
      >
      </chatItem>
    </div>
    <!-- 新增/创建聊天室 -->
    <div class="add-chat-room">
      <el-button type="primary" circle @click="addRoom">+</el-button>
    </div>
    <addChactRoom ref="addChatRoomChild" @getNewRoomList="getNewRoomList" />
    <contextMenus></contextMenus>
    <contextMenus
      v-model="folderPopUpBox"
      target="folder"
      :list="folderList"
      @first-level-directory="handleChatRoom"
    ></contextMenus>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'

import { roomListStore } from '@/stores/roomInfo'

import chatItem from './chatItem.vue'

import { chatRoomList } from '@/api/chatRoom/index.ts'
import type { chatRoomParams } from '@/api/chatRoom/types.ts'
import { getToken } from '@/utils/auth.ts'

const token = getToken()
let chatList = ref<chatRoomParams[]>([])
const roomStore = roomListStore()
const getChatRoomList = async () => {
  let res = await chatRoomList()
  console.log(res)
  if (res.code === 200 && res.data !== null && res.data !== undefined) {
    if (Array.isArray(res.data)) {
      chatList.value = res.data as chatRoomParams[]
      roomStore.setRoomList(res.data as chatRoomParams[])
    } else {
      console.error('Invalid data format:', res.data)
    }
  }
}
watch(
  () => token,
  (newToken) => {
    console.log('token变化了', newToken)
    if (!newToken) {
      console.log('token不存在')
      return
    }
    getChatRoomList()
  },
  { immediate: true },
)

const checkIntoRoom = (chatRoomInfo: chatRoomParams) => {
  console.log(chatRoomInfo)
  // 携带id 跳转
  // router.push({ path: 'chatRoom', query: { chatRoomId: chatRoomInfo.id } })
  router.push({ path: '/chatRoom/' + chatRoomInfo.id })
}

// 创建聊天室
import addChactRoom from '@/components/chatRoom/addRoom.vue'
import type { ComponentPublicInstance } from 'vue'
import { watch } from 'vue'

const addChatRoomChild = ref<ComponentPublicInstance<{ openDialog: () => void }> | null>(null)

const addRoom = () => {
  if (addChatRoomChild.value) {
    addChatRoomChild.value.openDialog()
  } else {
    console.error('addChatRoomChild is null')
  }
}
const getNewRoomList = (data: chatRoomParams) => {
  console.log('父组件收到子组件的数据:', data)
  chatList.value.push(data)
  roomStore.addRoom(chatList.value)
}

// 引入 右键菜单
import contextMenus from '@/components/contextMenus/index.vue'
const folderPopUpBox = ref(false)
const folderList = [
  { id: 1, text: '邀请' },
  { id: 2, text: '设置' },
  { id: 3, text: '退出房间' },
]
const handleChatRoom = (item: any) => {
  console.log(item)
}
</script>
<style lang="less">
.chat-container {
  // position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  width: 100%;
  background-color: @bgColor2;
  // padding: 10px;
  // padding-bottom: 50px;
  overflow-y: hidden;
}

.chat-list {
  // 居中
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(100% - 50px);
  width: 100%;
  min-width: 50px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.add-chat-room {
  position: sticky;
  height: 45px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  background-color: @bgColor2;
}
</style>
