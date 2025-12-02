<template>
  <div>
    <h2>首页</h2>
    <div v-if="userStore.user">
      <p>欢迎，{{ userStore.user.name }}!</p>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.clearAuth()
  router.push({ name: 'login' })
}
</script>