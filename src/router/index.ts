import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { Component } from 'vue'
import WorldviewsIcon from '@/components/icons/WorldviewsIcon.vue'
import WritersIcon from '@/components/icons/WritersIcon.vue'
import PipeIcon from '@/components/icons/PipeIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'

interface MenuRoute {
  name: string
  path: string
  label: string
  icon: Component
}

export const menuRoutes: MenuRoute[] = [
  {
    name: 'worldviews',
    path: '/worldviews',
    label: '世界观',
    icon: WorldviewsIcon,
  },
  {
    name: 'writers',
    path: '/writers',
    label: '写手',
    icon: WritersIcon,
  },
  {
    name: 'pipe',
    path: '/pipe',
    label: '管道',
    icon: PipeIcon,
  },
  {
    name: 'settings',
    path: '/settings',
    label: '设置',
    icon: SettingsIcon,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/worldviews',
    },
    ...menuRoutes.map((route) => ({
      path: route.path,
      name: route.name,
      component: () => import(`@/views/${route.name}/index.vue`),
      meta: { requiresAuth: true },
    })),
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/index.vue'),
      meta: { requiresAuth: true },
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
