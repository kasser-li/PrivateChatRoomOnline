<template>
  <div class="chat-container">
    <div class="chat-history">
      <!-- 聊天记录区域 -->
      <div
        v-for="(message, index) in chatMessages"
        :key="message.id"
        class="message"
        :class="message.userId === userInfo?.id ? 'message-right' : 'message-left'"
      >
        <message :message="message" :isSelf="message.userId == userInfo?.id"></message>
      </div>
      <div class="message-timestamp" v-if="chatMessages?.length > 0">
        {{ chatMessages[chatMessages.length - 1]?.ctrateTime }}
      </div>

      <div>
        <button @click="getMessageList">获取消息列表</button>
        <button @click="exitRoom">退出聊天室</button>
      </div>
    </div>

    <div class="chat-input">
      <!-- 聊天输入框区域 -->
      <input v-model="newMessage" @keyup.enter="send" placeholder="输入消息..." />
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import message from './message.vue'
// 引入pinia
import pinia from '@/stores/index.ts'
import { userInfoStore } from '@/stores/userInfo.ts'
import { sendMessage, getMessages } from '@/api/message/index.ts'
import { onMounted } from 'vue'
import type { messageParams } from '@/api/message/types.ts'
import { watch } from 'vue'
import { exitChatRoom } from '@/api/chatRoom'
const userStore = userInfoStore()
const userInfo = userStore.userInfo
const roomId = ref('')


const chatMessages = ref<messageParams[]>([])
let newMessage = ref('')
// console.log('chatMessages', chatMessages.value)

// 发送消息
const send = () => {
  // 从URL获取房间ID
  let msg = {
    roomId: roomId.value,
    message: newMessage.value,
  }
  sendMessage(msg).then((res) => {
    // console.log('消息发送成功', res.data)
    let newMsg: messageParams = res.data as unknown as messageParams
    // 将新消息添加到消息列表中
    chatMessages.value.push(newMsg)
    // 清空输入框
    newMessage.value = ''
    // 滚动到底部
    // 使用 nextTick 确保 DOM 更新完成后再滚动
    nextTick(() => {
      const chatHistory = document.querySelector('.chat-history') as HTMLElement
      chatHistory.scrollTop = chatHistory.scrollHeight
    })
  })

}
// 获取消息列表
const getMessageList = () => {
  getMessages(roomId.value).then((res) => {
    console.log(res)
    if (Array.isArray(res.data)) {
      chatMessages.value = res.data as messageParams[]
    } else {
      console.error('getMessages 返回的数据不是数组:', res.data)
      chatMessages.value = [] // 确保 chatMessages.value 始终是数组
    }
    console.log('chatMessages', chatMessages.value)
  })
}
// 退出聊天室
import router from '@/router'
// const emits = defineEmits(['exitRoom'])
const exitRoom = () => {
  exitChatRoom(roomId.value).then((res) => {
    // console.log('退出聊天室成功', res)
    if (res.code == 200) {
      // 调用父组件方法，刷新房间列表
      // emits('exitRoom', res.data?.id)
      router.push('/')
    }
  })
}

const route = useRoute()
// 修改房间ID
const updateRoomId = async () => {
  roomId.value = route.params.id as string
}
// 监听路由
watch(
  () => route.path,
  async (newPath, oldPath) => {
    await updateRoomId()
    getMessageList()
  },
)
// 初始化的时候获取消息列表
// 监听路由变化，更新房间ID
onMounted(async () => {
  // 从URL获取房间ID
  await updateRoomId()
  getMessageList()
})
</script>

<style lang="less" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
}

.chat-history {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: @bgColor1;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid @bgColor16;
  border-radius: 4px;
  background-color: @bgColor2;
  color: @bgColor4;
}

.chat-input button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: @bgColor3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.message-timestamp {
  text-align: center;
  color: #999;
}
.message {
  display: flex;
  justify-content: space-between;
}
.message-left {
  justify-content: flex-start;
}
.message-right {
  justify-content: flex-end;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  margin-left: 10px;
  flex-shrink: 0;
}
</style>
