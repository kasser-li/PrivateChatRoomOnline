<template>
  <div>
    <Dialog title="创建房间" v-model="dialog" width="300" :berforeClose="initData">
      <div v-if="step == 1">
        <!-- 创建房间 -->
        <el-button type="primary" size="small" @click="updateState(2, 1)">创建房间</el-button>
        <!-- 加入房间 -->
        <el-button type="primary" size="small" @click="updateState(2, 2)">加入房间</el-button>
      </div>
      <div v-else>
        <el-form v-if="joinOrCreate == 1" :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item label="房间名字">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" />
          </el-form-item>
        </el-form>
        <div v-if="joinOrCreate == 2">
          <!-- 搜索房间号 -->
          <el-input v-model="roomInfo" placeholder="请输入房间号"></el-input>
          <!-- 搜索结果 -->
          <div>
            <div v-for="item in chatList" :key="item.id">
              {{ item.name }}
              {{ item.description }}
              <el-button type="primary" size="small" @click="joinRoom(item.id)">
                加入房间
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer" v-if="step == 2">
          <el-button type="primary" size="small" @click="initData"> 返回 </el-button>
          <el-button type="primary" size="small" @click="confrim"> 确定 </el-button>
          <el-button @click="dialog = false" size="small">取消</el-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, useAttrs } from 'vue'
import Dialog from '@/components/dialog.vue'
import { createChatRoom } from '@/api/chatRoom/index.ts'

const props = defineProps({
  // title: {
  //   type: [String],
  //   default: '',
  // },
})
const step = ref(1)
const joinOrCreate = ref(0)
const updateState = (s: number = 1, j: number = 0) => {
  step.value = s
  joinOrCreate.value = j
}

const emits = defineEmits(['getNewRoomList'])
// const attrs = useAttrs()
const dialog = ref(false)
function openDialog() {
  dialog.value = true
}
// 创建房间
const form = ref({
  name: '',
  description: '',
})
const confrim = async () => {
  // emits('comfrim', '传递给父组件的数据')
  // nextTick(() => {
  //   dialog.value = false
  // })
  console.log('调用创建房间接口')

  let res = await createChatRoom(form.value)
  console.log(res)
  if (res.code === 200) {
    dialog.value = false
    // 回调函数
    if (res.code === 200) {
      // 初始化数据
      initData()
      // 更新房间列表
      emits('getNewRoomList', res.data)
    }
  }
}
// 搜索房间
import { joinChatRoom, searchChatRoom } from '@/api/chatRoom/index.ts'
import type { chatRoomParams } from '@/api/chatRoom/types.ts'
import { throttle } from 'lodash'
import { watch } from 'vue'
const roomInfo = ref('')
let chatList = ref<chatRoomParams[]>([])
const searchChatRoomList = async (keyword: string) => {
  let res = await searchChatRoom(keyword)
  console.log(res)
  if (res.code === 200 && res.data !== null && res.data !== undefined) {
    if (Array.isArray(res.data)) {
      chatList.value = res.data as chatRoomParams[]
    } else {
      console.error('Invalid data format:', res.data)
    }
  }
}
// // 节流搜索
const throttleSearch = throttle(async (query: string) => {
  if (query.length < 1) {
    chatList.value = []
    return
  }
  searchChatRoomList(roomInfo.value)
}, 1000)
watch(
  () => roomInfo.value,
  (newVal) => {
    throttleSearch(newVal)
  },
)
// 加入房间
const joinRoom = async (id: string) => {
  let res = await joinChatRoom(id)
  console.log(res)
  // 回调函数
  if (res.code === 200) {
    dialog.value = false
    // 初始化数据
    initData()

    // 更新房间列表
    emits('getNewRoomList', res.data)
  }
}
// 初始化数据
const initData = () => {
  form.value = {
    name: '',
    description: '',
  }
  roomInfo.value = ''
  chatList.value = []
  updateState(1, 0)
}

defineExpose({ openDialog })
</script>
<style lang="less"></style>
