<template>

    <div class="user-avatar" >
        <UserAvatar :chatRoomInfo="userInfo"></UserAvatar>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import UserAvatar from '@/components/chatList/chatItem.vue'
  const userInfo = ref({
    avatar: '',
    name: '张三',
    id:'1'
  })
  
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
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