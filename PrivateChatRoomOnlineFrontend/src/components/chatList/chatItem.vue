<template>
  <div
    class="chat-item"
    :title="chatRoomInfo.roomName"
    @click="$emit('checkIntoRoom', chatRoomInfo)"
  >
    <div class="avatar">
      <el-avatar :shape="shapeType" v-if="chatRoomInfo.avatar" :src="chatRoomInfo.avatar" />
      <el-avatar :shape="shapeType" v-else="chatRoomInfo.avatar">{{ firstChar }}</el-avatar>
    </div>
    <!-- 用户名字/房间名字 -->
    <div class="name" v-if="showName">
      <div class="user-name" v-if="chatRoomInfo.roomName">{{ chatRoomInfo.roomName }}</div>
      <div class="user-name" v-else>{{ chatRoomInfo.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue'
import { computed } from 'vue'
const props = defineProps({
  chatRoomInfo: {
    type: Object,
    default() {
      return {}
    },
  },
  shapeType: {
    type: String,
    default() {
      return 'square'
    },
  },
  showName: {
    type: Boolean,
    default() {
      return false
    },
  },
})
// 计算属性，用于获取 chatRoomInfo.name 的第一个字符
const firstChar = computed(() => {
  if (props.chatRoomInfo.roomName) {
    return props.chatRoomInfo.roomName.charAt(0)
  } else if (props.chatRoomInfo.name) {
    return props.chatRoomInfo.name.charAt(0)
  } else {
    return ''
  }
})
</script>
<style lang="less" scoped>
.chat-item {
  margin: 5px 0;
  cursor: pointer;
  display: flex;

  .avatar {
    height: 40px;
    width: 40px;
  }

  .name {
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: @bgColor4;
    font-size: 14px;
  }
}
</style>
