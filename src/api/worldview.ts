import request from '@/utils/request'
import type { Response, PageResponse, PageForm } from './type'

export interface WorldView {
  id: number
  userId: number
  characterIds: number[] | null
  miscIds: number[] | null
  worldEventIds: number[] | null
  name: string | null
  description: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateWorldViewRequest {
  name?: string | null
  description?: string | null
  notes?: string | null
}

export interface UpdateWorldViewRequest {
  name?: string | null
  description?: string | null
  notes?: string | null
}

export function getWorldViewPage(params: PageForm) {
  return request<PageResponse<WorldView>>({
    url: '/world-view',
    method: 'GET',
    params,
  })
}

export function createWorldView(data: CreateWorldViewRequest) {
  return request<Response<WorldView>>({
    url: '/world-view',
    method: 'POST',
    data,
  })
}

export function getWorldViewDetail(id: number) {
  return request<Response<WorldView>>({
    url: `/world-view/${id}`,
    method: 'GET',
  })
}

export function updateWorldView(id: number, data: UpdateWorldViewRequest) {
  return request<Response<WorldView>>({
    url: `/world-view/${id}`,
    method: 'PUT',
    data,
  })
}

export function deleteWorldView(id: number) {
  return request<Response<null>>({
    url: `/world-view/${id}`,
    method: 'DELETE',
  })
}
