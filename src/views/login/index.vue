<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">登录</h2>
      </div>
      <el-form @submit.prevent="handleLogin" class="space-y-6">
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名" size="large" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" size="large" prefix-icon="Lock"
            show-password />
        </el-form-item>
        <el-button type="primary" size="large" class="w-full" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login, type LoginForm } from '@/api/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive<LoginForm>({
  name: '',
  password: ''
})

async function handleLogin() {
  loading.value = true
  try {
    const res = await login(form)
    userStore.setToken(res.data.token)
    userStore.setUser(res.data.user)
    ElMessage.success('登录成功')
    router.push({ name: 'home' })
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '登录失败')
  } finally {
    loading.value = false
  }
}
</script>
