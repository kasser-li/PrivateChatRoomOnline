<template>
  <div>
    <el-row>
      <el-col :span="3">
        <div style="height: 60px;width:100%;background-color: cadetblue;">

        </div>
      </el-col>
      <el-col :span="1">
        <!-- 用户头像/个人设置 -->
        <UserAvatar></UserAvatar>
      </el-col>
      <el-button @click="getUserInfo">获取用户信息</el-button>
    </el-row>
    <!-- logo -->


  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UserAvatar from './userAvatar/index.vue'
import { userLogin, userRegister } from '@/api/userInfo/index.ts'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const getUserInfo = () => {
  console.log('获取用户信息')
}

</script>