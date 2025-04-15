<template>
    <div class="menus-container">
        <div class="expand-switch" @click="switchMenus">
            <el-icon class="change-animation" :class="!menusState.isCollapse ? 'expendBtn' : ''">
                <DArrowRight style="width: 1em; height: 1em;" />
            </el-icon>
        </div>
        <el-menu default-active="2" class="menu-vertical" :collapse="menusState.isCollapse" @open="handleOpen"
            @close="handleClose">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
    </div>



</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    DArrowRight,
    DArrowLeft,
} from '@element-plus/icons-vue'


const menusState = reactive({
    isCollapse: false,
})
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
/**
 * 切换菜单的展开和折叠状态
 */
const switchMenus = () => {
    menusState.isCollapse = !menusState.isCollapse
}
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.change-animation {
    transition: all 0.3s;
}

.expendBtn {
    // 旋转180度
    transform: rotate(180deg);
}

.menus-container {
    height: 100%;
    position: relative;
    padding-right: 15px;
    overflow: hidden;


    .menu-vertical {
        height: 100%;
    }


    .expand-switch {
        cursor: pointer;
        position: absolute;
        right: 0;
        background-color: #fff;
    }
}
</style>