<template>
  <div class="chat-container">
    <div class="chat-list">
      <!-- 聊天室列表 -->
      <chatItem
        v-for="chatRoomInfo in chatList"
        :chatRoomInfo="chatRoomInfo"
        @checkIntoRoom="checkIntoRoom"
      >
      </chatItem>
    </div>
    <!-- 新增/创建聊天室 -->
    <div class="add-chat-room">
      <el-button type="primary" circle>+</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'

import chatItem from './chatItem.vue'
import { chatRoomList } from '@/api/chatRoom/index.ts'
import type { chatRoomParams } from '@/api/chatRoom/types.ts'

let chatList = ref<chatRoomParams[]>([])
const getChatRoomList = async () => {
  let res = await chatRoomList()
  console.log(res)
  if (res.code === 200) {
    if (Array.isArray(res.data.list)) {
      chatList.value = res.data.list as chatRoomParams[]
    } else {
      console.error('Invalid data format:', res.data.list)
    }
  }
}
getChatRoomList()

const checkIntoRoom = (chatRoomInfo: chatRoomParams) => {
  console.log(chatRoomInfo.id)
  // 携带id 跳转
  // router.push({ path: 'chatRoom', query: { chatRoomId: chatRoomInfo.id } })
  router.push({ path: '/chatRoom/' + chatRoomInfo.id })
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
