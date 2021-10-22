import axios from 'axios'
import { setInterceptors } from './common/interceptors'

const API_END_POINT = 'http://13.209.30.200:5000'

function createInstance() {
  const instance = axios.create({
    baseURL: API_END_POINT, //process.env.API_ENDPOINT
  })

  return setInterceptors(instance)
}

const instance = createInstance()

function registerUser() {
  return axios.post(API_END_POINT) //어떤서버로 요청할지 url
}

function loginUser(userData) {
  return instance.post('login', userData)
}

//loginForm
export { registerUser, loginUser }
