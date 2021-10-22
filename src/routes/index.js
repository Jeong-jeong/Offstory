import { createRouter, createWebHistory } from 'vue-router'
import Main from './Main'
import Signup from '~/routes/Signup'
import Login from './Login'
import Example from '~/components/designs/Example'

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
    {
      path: '/example',
      name: 'Example',
      component: Example,
    },
  ],
})
