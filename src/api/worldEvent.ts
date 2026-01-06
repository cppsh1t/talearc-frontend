import request from '@/utils/request'
import type { Response, PageResponse, PageForm } from './type'

export interface WorldEvent {
  id: number
  userId: number
  worldViewId: number
  name: string | null
  description: string | null
  happenedAt: string
  endAt: string
  relatedCharacterSnapshotIds: number[] | null
  createdAt: string
  updatedAt: string
}

export interface CreateWorldEventRequest {
  worldViewId: number
  name: string
  description?: string
  happenedAt?: string
  endAt?: string
  relatedCharacterSnapshotIds?: number[]
}

export interface UpdateWorldEventRequest {
  name?: string
  description?: string
  happenedAt?: string
  endAt?: string
  relatedCharacterSnapshotIds?: number[]
}

export type WorldEventQuery = PageForm<{
  worldViewId?: number
}>

export function getWorldEventList(params: WorldEventQuery) {
  return request<PageResponse<WorldEvent>>({
    url: '/world-event',
    method: 'GET',
    params,
  })
}

export function createWorldEvent(data: CreateWorldEventRequest) {
  return request<Response<WorldEvent>>({
    url: '/world-event',
    method: 'POST',
    data,
  })
}

export function getWorldEventDetail(id: number) {
  return request<Response<WorldEvent>>({
    url: `/world-event/${id}`,
    method: 'GET',
  })
}

export function updateWorldEvent(id: number, data: UpdateWorldEventRequest) {
  return request<Response<WorldEvent>>({
    url: `/world-event/${id}`,
    method: 'PUT',
    data,
  })
}

export function deleteWorldEvent(id: number) {
  return request<Response<null>>({
    url: `/world-event/${id}`,
    method: 'DELETE',
  })
}
