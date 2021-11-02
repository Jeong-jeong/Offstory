import { createStore } from 'vuex'
import address from './address'
import Login from './Login'
import Loading from './Loading'

export default createStore({
  modules: {
    address,
    Login,
    Loading,
  },
})
