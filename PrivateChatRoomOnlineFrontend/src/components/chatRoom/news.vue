<template>
  <div class="message-container" :class="isSelf ? 'message-right' : 'message-left'">
    <!-- 显示消息内容 -->
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  message: {
    type: String,
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
.message-container {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px; // 稍微向左偏移，模仿气泡效果，但不是完全靠左。
  margin-right: auto;
  position: relative;
}
// 模拟气泡
.message-container.message-right {
  background-color: #9eea6a;
  color: #000;
  margin-left: auto; // 向右对齐
  margin-right: 10px; // 稍微向右偏移，模仿气泡效果，但不是完全靠右。
}
.message-container.message-left {
  background-color: #fff;
  color: #000;
}
/* 左侧尖角 */
.message-container.message-left::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 10px;
  border: 6px solid transparent;
  border-right-color: #fff; /* 与背景色一致 */
}

/* 右侧尖角 */
.message-container.message-right::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 10px;
  border: 6px solid transparent;
  border-left-color: #9eea6a; /* 与背景色一致 */
}
</style>
