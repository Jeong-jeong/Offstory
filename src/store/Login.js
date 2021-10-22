export default {
  namespaced: true,
  state() {
    return {
      username: '',
      token: '',
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
    setToken(state, token) {
      state.token = token
    },
  },

  actions: {},
}
