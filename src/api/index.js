import axios from 'axios'
import { setInterceptors } from './common/interceptors'

const API_END_POINT = 'http://13.209.30.200:5000'

function createInstance() {
  const instance = axios.create({
    // AxiosRequestConfig = axios 공통 설정란
    baseURL: API_END_POINT, //process.env.API_ENDPOINT
  })

  return setInterceptors(instance)
}

const instance = createInstance()

function registerUser(userData) {
  const registerUrl = 'signup'
  return instance.post(`${registerUrl}`, userData) //어떤서버로 요청할지 url
}

function loginUser(userData) {
  return instance.post('login', userData)
}

function createPost(userData) {
  return instance.post('/posts/create', userData)
}

function createChannel(channelData) {
  return instance.post('/channels/create', channelData)
}

function channelsList() {
  return instance.get('/channels')
}

function getAuth() {
  return instance.get('/auth-user')
}

// function channelsList(channelName) {
//   if (instance.get(`/channels/${channelName}`)) {
//     return instance.get(`/channels/${channelName}`)
//   } else {

//   }
// }

//loginForm
export {
  createPost,
  registerUser,
  loginUser,
  channelsList,
  createChannel,
  getAuth,
}
