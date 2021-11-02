import { getAuthFromCookie, getUserFromCookie } from '../utils/cookies'
export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
    }
  },
  getters: {
    loading(state) {
      return state.isLoading
    },
  },
  mutations: {
    startLoading(state) {
      state.isLoading = true
    },
    endLoading(state) {
      state.isLoading = false
    },
  },
}
