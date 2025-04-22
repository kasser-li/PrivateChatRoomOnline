<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :modal="modal"
    draggable
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    :before-close="beforeClose"
    @close="dialogColse"
    @closed="dialogColsed"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <slot name="footer" />
      </span>
    </template>
  </el-dialog>
</template>
<script setup name="Dialog">
import { ElDialog } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: [Boolean],
    default: false,
  },
  title: {
    type: [String],
    default: '',
  },
  width: {
    type: [String],
    default: '',
  },
  modal: {
    type: [Boolean],
    default: false,
  },
  beforeClose: [Function],
})
const emits = defineEmits(['update:modelValue', 'onClosed', 'closed'])
function dialogColse() {
  emits('update:modelValue', false)
}
function dialogColsed() {
  emits('onClosed', false)
  emits('closed', false)
}
</script>

<style lang="scss"></style>
