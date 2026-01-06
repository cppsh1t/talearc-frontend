import request from '@/utils/request'
import type { Response, PageResponse, PageForm } from './type'

export interface Character {
  id: number
  userId: number
  worldViewId: number
  snapshotIds: number[] | null
  name: string | null
  description: string | null
  note: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateCharacterRequest {
  worldViewId: number
  name: string
  description?: string
  note?: string
}

export interface UpdateCharacterRequest {
  name?: string
  description?: string
  note?: string
}

export type CharacterQuery = PageForm<{
  worldViewId?: number
}>

export function getCharacterPage(params: CharacterQuery) {
  return request<PageResponse<Character>>({
    url: '/character',
    method: 'GET',
    params,
  })
}

export function createCharacter(data: CreateCharacterRequest) {
  return request<Response<Character>>({
    url: '/character',
    method: 'POST',
    data,
  })
}

export function getCharacterDetail(id: number) {
  return request<Response<Character>>({
    url: `/character/${id}`,
    method: 'GET',
  })
}

export function updateCharacter(id: number, data: UpdateCharacterRequest) {
  return request<Response<Character>>({
    url: `/character/${id}`,
    method: 'PUT',
    data,
  })
}

export function deleteCharacter(id: number) {
  return request<Response<null>>({
    url: `/character/${id}`,
    method: 'DELETE',
  })
}
