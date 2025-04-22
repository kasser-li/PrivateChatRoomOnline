import './assets/main.less'
import '@/assets/style/mixin.less'
import 'element-plus/dist/index.css'
// @import 'tailwindcss';

import { createApp } from 'vue'


import pinia from '@/stores/index.ts'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate) //使用持久化插件

import ElementPlus from 'element-plus'

import App from '@/App.vue'
import router from './router'
// mock
// const { mockRequest } = await import('./mocks')
// mockRequest()
// 数据集管理

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
