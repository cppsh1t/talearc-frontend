<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <!-- 标题 -->
        <div class="text-center">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {{ isLogin ? '欢迎登录' : '注册账号' }}
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ isLogin ? '登录后继续使用' : '填写以下信息创建账号' }}
          </p>
        </div>

        <!-- 登录表单 -->
        <el-form v-if="isLogin" ref="loginFormRef" :model="loginForm" :rules="loginRules" @submit.prevent="handleLogin"
          class="space-y-4">
          <el-form-item prop="name">
            <el-input v-model="loginForm.name" placeholder="请输入用户名" size="large" prefix-icon="User" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" prefix-icon="Lock"
              show-password clearable />
          </el-form-item>
          <el-button type="primary" size="large" class="w-full" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form>

        <!-- 注册表单 -->
        <el-form v-else ref="registerFormRef" :model="registerForm" :rules="registerRules"
          @submit.prevent="handleRegister" class="space-y-4">
          <el-form-item prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入用户名" size="large" prefix-icon="User" clearable />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" size="large"
              prefix-icon="Lock" show-password clearable />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" size="large"
              prefix-icon="Lock" show-password clearable />
          </el-form-item>
          <el-form-item prop="registrationKey">
            <el-input v-model="registerForm.registrationKey" placeholder="请输入注册密钥" size="large" prefix-icon="Key"
              clearable>
              <template #append>
                <el-tooltip content="请联系管理员获取注册密钥" placement="top">
                  <el-icon class="cursor-pointer">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
          <div class="text-xs text-gray-500 -mt-2 pl-1">
            <el-icon class="align-middle">
              <InfoFilled />
            </el-icon>
            注册密钥请联系管理员获取
          </div>
          <el-button type="primary" size="large" class="w-full" :loading="loading" @click="handleRegister">
            注册
          </el-button>
        </el-form>

        <!-- 切换登录/注册 -->
        <div class="text-center text-sm">
          <span class="text-gray-600">{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
          <el-button link type="primary" @click="toggleMode" class="ml-1">
            {{ isLogin ? '去注册' : '去登录' }}
          </el-button>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 TaleArc. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInstance, type FormRules } from 'element-plus'
import { QuestionFilled, InfoFilled } from '@element-plus/icons-vue'
import { login, register, type LoginForm, type RegisterForm } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { withDisplay } from '@/utils/displayError'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const isLogin = ref(true)

const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()

const loginForm = reactive<LoginForm>({
  name: '',
  password: ''
})

const registerForm = reactive<RegisterForm & { confirmPassword: string }>({
  name: '',
  password: '',
  confirmPassword: '',
  registrationKey: ''
})

const loginRules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 1, message: '密码不能为空', trigger: 'blur' }
  ]
}

const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const registerRules: FormRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  registrationKey: [
    { required: true, message: '请输入注册密钥', trigger: 'blur' },
    { min: 1, message: '注册密钥不能为空', trigger: 'blur' }
  ]
}

function toggleMode() {
  isLogin.value = !isLogin.value
  // 切换时清空表单
  if (isLogin.value) {
    registerFormRef.value?.resetFields()
  } else {
    loginFormRef.value?.resetFields()
  }
}

async function handleLogin() {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const res = await withDisplay(login(loginForm), '登录成功', '登录失败')
      userStore.setToken(res.data.token)
      userStore.setUser(res.data.user)
      router.push({ name: 'worldviews' })
    } finally {
      loading.value = false
    }
  })
}

async function handleRegister() {
  if (!registerFormRef.value) return

  await registerFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const { confirmPassword, ...formData } = registerForm
      const res = await withDisplay(register(formData), '注册成功', '注册失败')
      userStore.setToken(res.data.token)
      userStore.setUser(res.data.user)
      router.push({ name: 'worldviews' })
    } finally {
      loading.value = false
    }
  })
}
</script>
