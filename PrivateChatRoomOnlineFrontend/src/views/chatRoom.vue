<template>
    <div class="chatRoom-body">
        <chatRoom />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import chatRoom from '@/components/chatRoom/index.vue';

export default defineComponent({
    components: {
        chatRoom
    }
});
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
