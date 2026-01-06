import request from '@/utils/request'
import type { Response } from './type'

export interface Novel {
  id: number
  userId: number
  worldViewId: number
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateNovelRequest {
  worldViewId: number
  title: string
  description?: string
}

export interface UpdateNovelRequest {
  title: string
  description?: string
}

export type NovelQuery = {
  worldViewId?: number
}

export function getNovelList(params?: NovelQuery) {
  return request<Response<Novel[]>>({
    url: '/novel',
    method: 'GET',
    params,
  })
}

export function createNovel(data: CreateNovelRequest) {
  return request<Response<Novel>>({
    url: '/novel',
    method: 'POST',
    data,
  })
}

export function getNovelDetail(id: number) {
  return request<Response<Novel>>({
    url: `/novel/${id}`,
    method: 'GET',
  })
}

export function updateNovel(id: number, data: UpdateNovelRequest) {
  return request<Response<Novel>>({
    url: `/novel/${id}`,
    method: 'PUT',
    data,
  })
}

export function deleteNovel(id: number) {
  return request<Response<null>>({
    url: `/novel/${id}`,
    method: 'DELETE',
  })
}
