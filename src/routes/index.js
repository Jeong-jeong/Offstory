import { createRouter, createWebHistory } from 'vue-router'
import Main from './Main'
import Signup from '~/routes/Signup'
import Login from './Login'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      name: 'Main',
      path: '/',
      component: Main,
    },
    {
      name: 'Signup',
      path: '/signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
})
