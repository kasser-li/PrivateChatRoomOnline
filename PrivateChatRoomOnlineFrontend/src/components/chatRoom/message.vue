<template>
  <div class="message-content" :class="isSelf ? 'self-message' : 'other-message'">
    <div class="message-news">
      <div class="message-name" :class="isSelf ? 'tac-right' : 'tac-left'">{{ message.name }}</div>
      <news :message="message.message" :isSelf="isSelf"></news>
    </div>
    <!-- 显示用户头像 -->
    <div class="message-avatar">
      <UserAvatar :chatRoomInfo="message.user"></UserAvatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import news from './news.vue'
import UserAvatar from '@/components/chatList/chatItem.vue'
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  // 是否是自己发送的消息
  isSelf: {
    type: Boolean,
    default: false,
  },
})
console.log('props.message', props.message)
// let msg = {
//   userId: '680606abf4dd72dad27866cc',
//   roomId: '68060a4c6f0ad5c635105f07',
//   ctrateTime: '2025-04-21T11:19:18.353Z',
//   message: '123',
//   isDelete: false,
//   user: '680606abf4dd72dad27866cc',
//   blockUser: [],
//   id: '68062a677ec31ee9404cd166',
// }
//     id: userInfo.id,
//     avatar: '',
//     name: userInfo.userInfo.userInfo.name,
//     text: newMessage.value,
//     timestamp: new Date().toLocaleTimeString(),
</script>

<style lang="less" scoped>
.message-content {
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  // border: 1px solid #ccc;
  // border-radius: 5px;
  .message-news {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    .message-name {
      font-size: 12px;
      color: #999;
      padding: 2px 10px;
    }
  }
  .message-avatar {
    // padding: 5px 0;
  }
}
.self-message {
  justify-content: flex-end;
}
.other-message {
  flex-direction: row-reverse;
}
</style>
