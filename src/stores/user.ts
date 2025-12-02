import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, type User } from '@/api/user'

const TOKEN_KEY = 'token'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

  const isLoggedIn = computed(() => !!token.value && !!user.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem(TOKEN_KEY, newToken)
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function checkAuth() {
    if (!token.value) return false
    
    try {
      const res = await getUserInfo()
      user.value = res.data
      return true
    } catch {
      clearAuth()
      return false
    }
  }

  function setUser(userData: User) {
    user.value = userData
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isLoggedIn,
    setToken,
    clearAuth,
    checkAuth,
    setUser
  }
})