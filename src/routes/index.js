import { createRouter, createWebHistory } from 'vue-router'
import Login from './Login'
export default createRouter({
	history: createWebHistory(),
	scrollBehavior: () => ({ top: 0 }),
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
	],
})
