import axios, { type AxiosRequestConfig } from 'axios'

function createInstance(baseURL: string) {
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
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
        const { code, message } = res
        if (code === 200) {
          return res
        } else {
          return Promise.reject(new Error(message))
        }
      })
}

const request = createInstance('/talearc/api')

export default request
