<template>
  <el-card v-if="showHide" class="card-cpntainer fixed p-2_5 w-40" :style="{ left: x, top: y }">
    <div class="flex flex-col">
      <span
        class="pt-1_5 pb-1_5 pl-2_5 pr-2_5 text-lg cursor-default span-hover"
        @mouseenter="handleMoveIn(index)"
        @mouseleave="handleRemove"
        @click="handleEmitFirstLevel(index, item)"
        v-for="(item, index) in props.list"
        :key="index"
      >
        {{ item.text }}
      </span>
    </div>
  </el-card>
  <el-card
    v-if="childShowHide"
    class="fixed p-2_5 w-40"
    :style="{ left: childX, top: childY }"
    @mouseenter="handleMoveInChild"
  >
    <div class="flex flex-col">
      <span
        class="pt-1_5 pb-1_5 pl-2_5 pr-2_5 text-lg cursor-default span-hover"
        @click="handleEmitSecondaryDirectory(index, item)"
        v-for="(item, index) in props.list![childIndex].child"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineModel, defineProps } from 'vue'
interface ListType {
  id: number | string
  text: string
  child?: Array<string>
}
type locationType = 'Right' | 'RightBottom' | 'LeftBottom' | 'Bottom' | 'none'

/** 子组件触发父组件一二级目录选择 */
const emit = defineEmits(['first-level-directory', 'secondary-directory'])
/** 父传子双向绑定 */
const showHide = defineModel({
  type: Boolean,
})
/** 父传子传参 */
const props = defineProps({
  target: String,
  list: Array<ListType>,
  iconList: Array<String>,
  firstStartIndex: Number,
  secondaryStartIndex: Number,
})
/** 判断菜单当前在那个位置 */
const location = ref<locationType>('none')
/** 菜单距离屏幕的xy轴距离 */
const x = ref('0px')
const y = ref('0px')
/** 子菜单隐藏显示 */
const childShowHide = ref(false)
/** 子菜单距离屏幕的xy轴距离 */
const childX = ref('0px')
const childY = ref('0px')
/** 一级菜单下标 */
const Index = ref(0)
/** 二级菜单下标 */
const childIndex = ref(0)
const firstStartIndex = ref(props.firstStartIndex == undefined ? 0 : props.firstStartIndex)
const secondaryStartIndex = ref(
  props.secondaryStartIndex == undefined ? 0 : props.secondaryStartIndex,
)
/** 隐藏子菜单定时器任务 */
let timeOut = setTimeout(() => {}, 0)

// 移入清除定时器 让子菜单不消失
const handleMoveInChild = () => {
  clearInterval(timeOut)
}

// 移出等待0.1s触发事件
const handleRemove = () => {
  timeOut = setTimeout(() => {
    childShowHide.value = false
  }, 100)
}

// 点击一级组件触发
const handleEmitFirstLevel = (index: number, item: ListType) => {
  emit('first-level-directory', {
    index: index,
    itemData: item,
    contents: firstStartIndex.value + index + '',
  })
}

// 点击二级组件触发
const handleEmitSecondaryDirectory = (index: number, item: string) => {
  emit('secondary-directory', {
    index: index,
    itemData: item,
    contents: firstStartIndex.value + Index.value + '-' + (index + secondaryStartIndex.value),
  })
}

// 移入触发事件
const handleMoveIn = (index: number) => {
  Index.value = index
  if (props.list![index].child) {
    childIndex.value = index
    childShowHide.value = true
    if (location.value == 'Right') {
      childX.value = parseInt(x.value.slice(0, x.value.length - 2)) - 160 + 'px'
      childY.value = parseInt(y.value.slice(0, y.value.length - 2)) + index * 20 + 'px'
    } else if (location.value == 'Bottom') {
      if (props.list!.length < props.list![index].child.length) {
        childX.value = parseInt(x.value.slice(0, x.value.length - 2)) - 160 + 'px'
        childY.value =
          parseInt(y.value.slice(0, y.value.length - 2)) -
          (props.list![index].child.length - props.list!.length + index) * 20 -
          20 +
          'px'
      }
    } else {
      childX.value = parseInt(x.value.slice(0, x.value.length - 2)) + 160 + 'px'
      childY.value = parseInt(y.value.slice(0, y.value.length - 2)) + index * 20 + 'px'
    }
  }
}

// 右键触发事件
document.addEventListener('contextmenu', function (event) {
  event.preventDefault()
  // event.stopPropagation()
  if (!props.list) {
    return
  }
  showHide.value = false
  childShowHide.value = false
  location.value = 'none'
  let clickNode = event.target as Element
  let targetNode = event.target as Element
  // 查询最近的一个父元素 data-target 属性值等于 target 的元素
  while (clickNode) {
    if (clickNode.getAttribute('data-target') == props.target || !clickNode.parentElement) {
      break
    }
    targetNode = clickNode.parentElement!
    clickNode = targetNode
  }
  const cardHeight = props.list!.length * 40 + 20
  const cardWidth = 160
  setTimeout(() => {
    if (targetNode.getAttribute('data-target') == props.target) {
      showHide.value = true
      if (event.x >= window.innerWidth - cardWidth) {
        x.value = event.x - cardWidth + 'px'
        y.value = event.y + 'px'
        location.value = 'Right'
      } else if (event.y >= window.innerHeight - cardHeight) {
        x.value = event.x + 'px'
        y.value = event.y - cardHeight + 'px'
        location.value = 'Bottom'
      } else {
        x.value = event.x + 'px'
        y.value = event.y + 'px'
      }
    }
  }, 1)
})

// 单机单机触发事件
document.addEventListener('click', function (event) {
  showHide.value = false
  childShowHide.value = false
})
</script>

<style lang="less" scoped>
.card-cpntainer {
  background-color: @bgColor2 !important;
}
:deep(.el-card__body) {
  padding: 0px !important;
  background-color: @bgColor2 !important;
  color: @bgColor4;
}
.fixed {
  position: fixed;
  z-index: 999;
}
.p-2_5 {
  padding: 0.625rem !important;
}
.w-40 {
  // width: 10rem !important;
}
.pt-1_5 {
  padding-top: 0.375rem !important;
}
.pb-1_5 {
  padding-bottom: 0.375rem !important;
}
.pl-2_5 {
  padding-left: 0.625rem !important;
}
.pr-2_5 {
  padding-right: 0.625rem !important;
}
.text-lg {
  font-size: 1.125rem !important;
}
.cursor-default {
  cursor: pointer !important;
}
.span-hover:hover {
  background-color: @bgColor7 !important;
  color: @bgColor7_font;
}

// flex flex-col
.flex {
  display: flex;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
</style>
