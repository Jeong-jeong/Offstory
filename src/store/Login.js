import { getAuthFromCookie, getUserFromCookie } from '../utils/cookies'
export default {
  namespaced: true,
  state() {
    return {
      username: getUserFromCookie() || '',
      token: getAuthFromCookie() || '',
    }
  },
  getters: {
    isLogin(state) {
      return state.username !== ''
    },
    getUsername(state) {
      return state.username
    },
    getToken(state) {
      return state.token
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },
    clearUsername(state) {
      state.username = ''
    },
    clearToken(state) {
      state.token = ''
    },
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ''
    },
  },

  actions: {},
}
