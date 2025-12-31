<template>
  <div class="w-full h-100vh flex box-border relative overflow-hidden">
    <MenuList v-if="isLoggedIn" class="shrink-0" />
    <div class="w-full h-full">
      <Transition name="page">
        <RouterView />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import MenuList from '@/components/MenuList.vue'

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  position: absolute;
  width: 100%;
}
</style>
