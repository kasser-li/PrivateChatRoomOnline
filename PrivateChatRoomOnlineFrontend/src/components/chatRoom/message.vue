<template>
  <div class="message-content" :class="{ 'self-message': isSelf }">
    <div class="message-news">
      <div class="message-name" :class="isSelf ? 'tac-right' : 'tac-left'">{{ message.name }}</div>

      <news :message="message.text" :isSelf="isSelf"></news>
    </div>
    <!-- 显示用户头像 -->
    <div class="message-avatar">
      <UserAvatar :chatRoomInfo="message"></UserAvatar>
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
</script>

<style lang="less" scoped>
.message-content {
  display: flex;
  padding: 10px;
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
  // justify-content: flex-end;
}
</style>
