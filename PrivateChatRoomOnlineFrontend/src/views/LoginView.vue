<template>
  <div style="width: 600px;">
    <el-form :model="form" label-width="auto">
      <el-form-item label="账号/手机">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" @click="signIn">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
// 导入接口
import { userLogin, userRegister } from '@/api/userInfo/index.ts'
import router from '@/router'

// 引入pinia
import { userInfoStore } from '@/stores/userInfo.ts'
const userStore = userInfoStore()
const form = reactive({
  username: 'admin',
  password: '123456',
})

// const router = useRouter()
const onSubmit = async () => {
  let res = await userLogin(form)
  loginInto(res)
}
const signIn = async () => {
  let res = await userRegister(form)
  loginInto(res)
}
const loginInto = (res: any) => {
  if (res.code === 200) {
    const { userInfo, token } = res.data
    userStore.setUserInfo({
      token: token,
      userInfo: userInfo,
    })
    let t = userStore.getToken
    if(t == token){
      // 跳转到首页
      router.push({ path: '/' })
    }    
  }
}
</script>
