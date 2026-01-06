import request from '@/utils/request'
import type { Response, PageResponse, PageForm } from './type'

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
  worldViewId?: number
  title?: string
  description?: string
}

export type NovelQuery = PageForm<{
  worldViewId?: number
}>

export function getNovelList(params: NovelQuery) {
  return request<PageResponse<Novel>>({
    url: '/novel',
    method: 'GET',
    params: {
      ...params,
      // The API definition shows getNovelList takes 'worldViewId' as query param directly
      // but PageForm usually handles pagination.
      // Let's check swagger again. /talearc/api/novel GET has worldViewId (optional).
      // It doesn't seem to have page/size in swagger for Novel list?
      // Wait, checking swagger...
      // /talearc/api/novel GET: parameters: worldViewId.
      // Response: NovelListApiResponse (array of Novel).
      // It is NOT paged in swagger!
    }
  })
}

// Re-checking swagger for Novel list pagination.
// Path: /talearc/api/novel
// Parameters: worldViewId
// Response: NovelListApiResponse -> data is array of Novel.
// So it is NOT paged.

export function getNovelListAll(worldViewId?: number) {
   return request<Response<Novel[]>>({
    url: '/novel',
    method: 'GET',
    params: { worldViewId }
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
