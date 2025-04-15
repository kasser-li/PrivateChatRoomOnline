<template>
  <div class="chatMembers-container">
    <div class="member-list">
      <div class="mermber" v-for="(userInfo, index) in members" :key="index">
        <!-- 头像 -->
        <UserAvatar :chatRoomInfo="userInfo" :showName="true"></UserAvatar>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'

// 组件
import UserAvatar from '@/components/chatList/chatItem.vue'
import chatItem from './chatItem.vue'
import { chatRoomList } from '@/api/chatRoom/index.ts'
import type { chatRoomParams } from '@/api/chatRoom/types.ts'

const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },
})

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
.chatMembers-container {
  // position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: @bgColor1;
  // padding: 10px;
  // padding-bottom: 50px;
  overflow-y: hidden;
}

.member-list {
  height: 100%;
  width: 100%;
  min-width: 50px;
  overflow-y: auto;
  overflow-x: hidden;
}

.mermber {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
