import { createRouter, createWebHistory } from 'vue-router'
import Main from './Main'
import Signup from '~/routes/Signup'
import Login from './Login'
import PersonalActivity from './PersonalActivity'
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
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Example',
      path: '/example',
      component: Example,
    },
    {
      name: 'PersonalActivity',
      path: '/personalactivity',
      component: PersonalActivity,
    },
  ],
})
