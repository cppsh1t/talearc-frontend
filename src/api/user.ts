import request from '@/utils/request'
import type { Response } from './type'

export type User = {
  id: number
  name: string
  createAt: string
}

export type LoginForm = {
  name: string
  password: string
}

export type RegisterForm = {
  name: string
  password: string
  secret: string
}

export type LoginResponse = {
  token: string
  user: User
}

export function login(form: LoginForm) {
  return request<Response<LoginResponse>>({
    url: '/user/login',
    method: 'POST',
    data: form,
  })
}

export function register(form: RegisterForm) {
  return request<Response<LoginResponse>>({
    url: '/user/register',
    method: 'POST',
    data: form,
  })
}
