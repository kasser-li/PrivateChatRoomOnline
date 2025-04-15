import './assets/main.less'
import '@/assets/style/mixin.less'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from '@/stores'
import ElementPlus from 'element-plus'

import App from '@/App.vue'
import router from './router'
// mock
// const { mockRequest } = await import('./mocks')
// mockRequest()
// 数据集管理

const app = createApp(App)
// const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
