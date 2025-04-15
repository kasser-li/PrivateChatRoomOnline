<template>
  <div class="chatRoom-container">
    <div class="chat">
      <!-- <p>聊天室ID: {{ chatRoomId }}</p>
            <p>聊天室ID: {{ roomInfo.id }}</p>
            <p>聊天室name: {{ roomInfo.roomName }}</p>
            <p>聊天室成员: {{ filtersNames }}</p> -->
      <chatRoom :roomInfo="roomInfo"></chatRoom>
    </div>

    <div class="merberList">
      <members :members="roomInfo.members"></members>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
// 组件
import chatRoom from './chatRoom.vue'
import members from './members.vue'

const route = useRoute()
import { getChatRoomInfo } from '@/api/chatRoom/index.ts'
// // 获取动态路由
const chatRoomId = ref(route.params.chatRoomId)
let roomInfo = ref({})
// 获取房间信息
const getRoomInfo = async (chatRoomId: string) => {
  let res = await getChatRoomInfo(chatRoomId)
  console.log(res)
  if (res.code === 200) {
    try {
      //  将 res.data.members 扩展到10个
      // TODO 记得删除
      // let m = res.data.members[0]
      // for (let i = 1; i < 10; i++) {
      //     res.data.members.push(m)
      // }
      roomInfo.value = res.data
    } catch (error) {
      console.error('Invalid data format:', res.data)
    }
  }
}
const filtersNames = computed(() => {
  let members = roomInfo.value.members
  console.log(members)

  if (Array.isArray(members)) {
    return members.map((item) => item.name).join(',')
  } else {
    console.error('Invalid data format:', members)
    return ''
  }
})
watch(
  () => route.params.chatRoomId,
  (newVal) => {
    chatRoomId.value = newVal
    getRoomInfo(chatRoomId.value as string)
  },
  { immediate: true },
)
</script>
<style lang="less" scoped>
.chatRoom-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: @bgColor2;
  padding: 10px;
  overflow-y: hidden;
  justify-content: space-between;

  // padding-bottom: 50px;
  .chat {
    flex: 1;
  }

  .merberList {
    width: 150px;
    padding: 10px;
    background-color: @bgColor1;
    border: 1px solid @bgColor16;
    border-radius: 5px;
  }
}
</style>
