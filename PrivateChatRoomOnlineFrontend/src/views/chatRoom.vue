<template>
  <!-- <div class="chatRoom-body"> -->
  <!-- <chatRoom /> -->
  <RouterView />
  <!-- </div> -->
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
// import chatRoom from '@/components/chatRoom/index.vue'

// export default defineComponent({
//   components: {
//     chatRoom,
//   },
// })
</script>

<style scoped lang="less">
.chatRoom-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
</style>
