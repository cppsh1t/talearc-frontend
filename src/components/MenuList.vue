<template>
  <div class="h-full w-280px bg-white border-r border-r-solid border-gray-300 shadow-sm flex flex-col">
    <!-- 顶部logo区域 -->
    <div class="h-72px flex items-center px-24px border-b border-gray-200">
      <!-- Logo图标 -->
      <svg class="w-32px h-32px mr-12px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 背景 -->
        <rect width="32" height="32" rx="8" fill="#1E293B" />

        <!-- 羽毛笔主体 -->
        <path d="M20 6C20 6 18 8 16 12C14 16 13 20 13 22" stroke="url(#quill-gradient)" stroke-width="2"
          stroke-linecap="round" />

        <!-- 羽毛笔羽毛纹理 -->
        <path d="M16 12L18 10" stroke="url(#quill-gradient)" stroke-width="1" stroke-linecap="round" opacity="0.6" />
        <path d="M15 15L17 13" stroke="url(#quill-gradient)" stroke-width="1" stroke-linecap="round" opacity="0.6" />
        <path d="M14 18L16 16" stroke="url(#quill-gradient)" stroke-width="1" stroke-linecap="round" opacity="0.6" />

        <!-- 墨水滴 -->
        <circle cx="13" cy="23" r="1.5" fill="#3B82F6" opacity="0.8" />

        <!-- AI星光装饰 -->
        <circle cx="22" cy="8" r="1" fill="#FBBF24" />
        <path d="M22 6.5L22 9.5M20.5 8L23.5 8" stroke="#FBBF24" stroke-width="0.5" stroke-linecap="round" />

        <circle cx="10" cy="24" r="0.8" fill="#A78BFA" />
        <path d="M10 23L10 25M9 24L11 24" stroke="#A78BFA" stroke-width="0.4" stroke-linecap="round" />

        <!-- 装饰性弧线（表示创作的流动感） -->
        <path d="M8 14C10 13 12 14 14 13" stroke="#64748B" stroke-width="0.5" stroke-linecap="round" opacity="0.3" />
        <path d="M7 18C9 17 11 18 13 17" stroke="#64748B" stroke-width="0.5" stroke-linecap="round" opacity="0.3" />

        <defs>
          <linearGradient id="quill-gradient" x1="20" y1="6" x2="13" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#F8FAFC" />
            <stop offset="50%" stop-color="#E0E7FF" />
            <stop offset="100%" stop-color="#818CF8" />
          </linearGradient>
        </defs>
      </svg>
      <span
        class="text-18px font-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TaleArc</span>
    </div>

    <!-- 菜单列表 -->
    <div class="flex-1 py-16px">
      <div v-for="item in menuRoutes" :key="item.name"
        class="h-48px mx-12px mb-8px px-16px flex items-center cursor-pointer rounded-8px transition-all" :class="[
          currentRoute === item.name
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-50'
        ]" @click="handleMenuClick(item.name)">
        <component :is="item.icon" class="mr-12px" />
        <span class="text-15px">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { menuRoutes } from '@/router'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.name as string)

function handleMenuClick(name: string) {
  router.push({ name })
}
</script>
