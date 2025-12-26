import { ElMessage } from 'element-plus'
import { type Response } from '@/api/type'

export default function displayError(e: any) {
  if (e instanceof Error) {
    ElMessage.error(e.message)
  }
}

export async function withDisplay<T>(
  promise: Promise<Response<T>>,
  success = '操作成功',
  fail?: string,
) {
  return promise.then(
    (result) => {
      ElMessage.success(success)
      return Promise.resolve(result)
    },
    (reason: Error) => {
      ElMessage.error(fail ?? reason.message)
      throw reason
    },
  )
}

export function withDefaultValue<T>(promise: Promise<Response<T>>, defaultValue: Response<T>) {
  return promise.then(
    (result) => {
      return Promise.resolve(result)
    },
    (reason: Error) => {
      console.error(reason)
      return Promise.resolve(defaultValue)
    },
  )
}
