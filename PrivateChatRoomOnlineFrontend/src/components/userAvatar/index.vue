<template>
  <div class="user-avatar">
    <UserAvatar :chatRoomInfo="userInfo"></UserAvatar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UserAvatar from '@/components/chatList/chatItem.vue'
import { watch } from 'vue'
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
// watch(
//   () => props.userInfo,
//   () => {
//     console.log(props.userInfo)
//   },
// )
</script>
<style lang="less">
.user-avatar {
  // 居中
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
