export type Response<T = unknown> = {
  code: number
  message: string | null
  data: T
}

export type PageResponse<T = unknown> = Response<{
  list: T[]
  total: number
}>

export type PageForm<T = unknown> = {
  page: number
  size: number
} & T
