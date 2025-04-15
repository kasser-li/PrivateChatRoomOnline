<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import Menus from '../components/Menus.vue'
import Header from '../components/Header.vue'
import ChatList from '../components/chatList/index.vue'
</script>

<template>
  <!-- <div class="common-layout"> -->
  <el-container>
    <el-header style="padding: 0">
      <Header />
    </el-header>

    <el-container>
      <el-aside style="width: unset">
        <!-- <Menus /> -->
         <ChatList />
      </el-aside>
      <!-- <el-main style="height: 100vh"> -->
        <el-main style="height: calc(100vh - 60px)">
        <RouterView />
      </el-main>
    </el-container>

  </el-container>
  <!-- </div> -->
</template>
<style></style>