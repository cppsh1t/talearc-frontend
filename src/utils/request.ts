import axios, { type AxiosRequestConfig } from 'axios'

function createInstance(baseURL: string) {
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  return <T = any>(config: AxiosRequestConfig): Promise<T> =>
    instance(config)
      .then(({ data }) => data)
      .then((res) => {
        if (typeof res === 'string') {
          return Promise.reject(new Error(res))
        }
        const { msg, success } = res
        if (success) {
          return res
        } else {
          return Promise.reject(new Error(msg))
        }
      })
}

const request = createInstance('/talearc')

export default request
