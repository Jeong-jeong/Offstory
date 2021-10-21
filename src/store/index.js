import { createStore } from 'vuex'
import post from './post'
import address from './address'

export default createStore({
	modules: {
		post,
		address,
	},
})
