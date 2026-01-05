<template>
  <div
    class="h-full bg-white border-r border-r-solid border-gray-300 shadow-sm flex flex-col transition-all duration-300"
    :class="isCollapsed ? 'w-80px' : 'w-280px'">
    <!-- 顶部logo区域 -->
    <div class="h-72px flex items-center border-b border-gray-200 relative"
      :class="isCollapsed ? 'px-12px justify-center' : 'px-24px'">
      <!-- Logo图标和文字 -->
      <template v-if="!isCollapsed">
        <QuillIcon class="flex-shrink-0 mr-12px" />
        <span
          class="text-18px font-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TaleArc</span>
      </template>
      <!-- 收缩按钮 -->
      <button
        class="w-24px h-24px flex items-center justify-center rounded-6px border-none bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        :class="isCollapsed ? '' : 'absolute right-12px'" @click="toggleCollapse">
        <CollapseIcon class="w-16px h-16px text-gray-600 transition-transform duration-300"
          :class="{ 'rotate-180': isCollapsed }" />
      </button>
    </div>

    <!-- 菜单列表 -->
    <div class="flex-1 py-16px">
      <div v-for="item in menuRoutes" :key="item.name"
        class="h-48px mx-12px mb-8px flex items-center cursor-pointer rounded-8px text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        :class="[{ 'is-active': currentRoute === item.name }, isCollapsed ? 'px-0 justify-center' : 'px-16px']"
        @click="handleMenuClick(item.name)">
        <component :is="item.icon" class="flex-shrink-0" :class="isCollapsed ? '' : 'mr-12px'" />
        <span v-show="!isCollapsed" class="text-15px">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import QuillIcon from '@/components/icons/QuillIcon.vue'
import CollapseIcon from '@/components/icons/CollapseIcon.vue'

const router = useRouter()
const route = useRoute()

const isCollapsed = ref(false)
const currentRoute = computed(() => route.name as string)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function handleMenuClick(name: string) {
  router.push({ name })
}
</script>

<style scoped>
.is-active {
  background-color: rgb(239 246 255);
  color: rgb(37 99 235);
}
</style>
