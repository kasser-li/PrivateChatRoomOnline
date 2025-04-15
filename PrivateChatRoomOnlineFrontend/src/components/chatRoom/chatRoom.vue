<template>
  <div class="chat-container">
    <div class="chat-history">
      <!-- 聊天记录区域 -->
      <div
        v-for="(message, index) in chatMessages"
        :key="message.id"
        class="message"
        :class="message.id === userStore.id ? 'message-right' : 'message-left'"
      >
        <message :message="message" :isSelf="message.id == userStore.id"></message>
      </div>
      <div class="message-timestamp" v-if="chatMessages.length > 0">
        {{ chatMessages[chatMessages.length - 1]?.timestamp }}
      </div>
    </div>
    <div class="chat-input">
      <!-- 聊天输入框区域 -->
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import message from './message.vue'
// 引入pinia
import pinia from '@/stores/index.ts'
import { userInfoStore } from '@/stores/userInfo.ts'
const userStore = userInfoStore(pinia)

let chatMessages = ref([])
let newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatMessages.value.push({
      id: userStore.id,
      avatar: '',
      name: userStore.name,
      text: newMessage.value,
      timestamp: new Date().toLocaleTimeString(),
    })
    newMessage.value = ''
  }
}
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
