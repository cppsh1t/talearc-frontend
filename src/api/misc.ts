import request from '@/utils/request'
import type { Response, PageResponse, PageForm } from './type'

export interface Misc {
  id: number
  userId: number
  worldViewId: number
  name: string | null
  description: string | null
  type: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateMiscRequest {
  worldViewId: number
  name: string
  description?: string
  type?: string
}

export interface UpdateMiscRequest {
  name?: string
  description?: string
  type?: string
}

export type MiscQuery = PageForm<{
  worldViewId?: number
}>

export function getMiscList(params: MiscQuery) {
  return request<PageResponse<Misc>>({
    url: '/misc',
    method: 'GET',
    params,
  })
}

export function createMisc(data: CreateMiscRequest) {
  return request<Response<Misc>>({
    url: '/misc',
    method: 'POST',
    data,
  })
}

export function getMiscDetail(id: number) {
  return request<Response<Misc>>({
    url: `/misc/${id}`,
    method: 'GET',
  })
}

export function updateMisc(id: number, data: UpdateMiscRequest) {
  return request<Response<Misc>>({
    url: `/misc/${id}`,
    method: 'PUT',
    data,
  })
}

export function deleteMisc(id: number) {
  return request<Response<null>>({
    url: `/misc/${id}`,
    method: 'DELETE',
  })
}
