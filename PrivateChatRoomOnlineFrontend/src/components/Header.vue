<template>
  <div>
    <el-row>
      <el-col :span="3">
        <div style="height: 60px; width: 100%; background-color: cadetblue"></div>
      </el-col>
      <el-col :span="1">
        <!-- 用户头像/个人设置 -->
        <UserAvatar :userInfo="userInfo"></UserAvatar>
      </el-col>
      <el-button @click="loginOut">退出</el-button>
      <el-button @click="getToken">获取token</el-button>
      <el-button @click="getUserName">getUserName</el-button>
      <el-button @click="getRoomList">房间列表</el-button>
      <el-col :span="10">
        <input type="text" placeholder="搜索" />
      </el-col>
    </el-row>
    <!-- logo -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import UserAvatar from './userAvatar/index.vue'
import { userInfoStore } from '@/stores/userInfo.ts'
import type { AccountInfo } from '@/api/userInfo/userInfo'
import { userLogin, userRegister } from '@/api/userInfo/index.ts'
import { chatRoomList } from '@/api/chatRoom/index.ts'
const userStore = userInfoStore()
const userInfo = ref({} as Partial<AccountInfo>)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const getUserInfo = () => {
  console.log('获取用户信息', userStore.getUserInfo)
  if (userStore.getUserInfo) {
    userInfo.value = userStore.getUserInfo
  }
}
const loginOut = () => {
  userStore.loginOut
  userInfo.value = {}
  console.log('退出登录')
  // 跳转到登录页

  router.push({ path: '/login' })
}
const getToken = () => {
  let t = userStore.getToken
  console.log('ttttttoken', t)
}
const getUserName = () => {
  let t = userStore.getUserName
  console.log('ttttttoken', t)
}

const getRoomList = async () => {
  let res = await chatRoomList()
  console.log(res)
}
import { onMounted } from 'vue'
onMounted(() => {
  getUserInfo()
})
</script>
