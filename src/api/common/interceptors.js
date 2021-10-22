import store from '~/store/index'
export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      console.log(store.state.Login.token)
      const APITOKEN = store.state.Login.token
      console.log(config)
      config.headers.Autorization = APITOKEN
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )
  return instance
}
