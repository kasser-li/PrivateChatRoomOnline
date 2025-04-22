import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { userInfoStore } from '@/stores/userInfo.ts'
const userStore = userInfoStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页',
        requireAuth: true,
      },
      children: [
        {
          path: 'userInfo',
          name: 'userInfo',
          component: () => import('../views/UserInfoView.vue'),
        },
        {
          // 附带id参数
          // path: 'chatRoom/:id',
          // name: 'chatRoom',
          // component: () => import('../views/chatRoom.vue'),
          path: 'chatRoom/:id',
          name: 'chatRoom',
          component: () => import('../views/chatRoom.vue'),
          children: [
            {
              path: '',
              name: 'chat',
              component: () => import('../components/chatRoom/chatRoom.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requireAuth: true,
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false,
      },
      component: () => import('../views/LoginView.vue'),
    },
  ],
})
// 路由守卫

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth === false) {
    next()
  } else {
    let token = userStore.getToken
    if (!token) {
      console.log('未登录', token)
      if (!to.query || !to.params) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      } else {
        next({
          path: '/login',
        })
      }
    }
    next()
  }
})
export default router
