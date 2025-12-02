import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home/index',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login/index',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth) {
    const isAuthenticated = await userStore.checkAuth()
    if (!isAuthenticated) {
      return { name: 'login' }
    }
  }
})

export default router
