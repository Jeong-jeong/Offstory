import { createRouter, createWebHistory } from 'vue-router'
import Main from './Main'
import Signup from './Signup'
import PostContent from './PostContent'
import Login from './Login'
import CreateNewPost from './CreateNewPost'
import PersonalActivity from './PersonalActivity'
import Example from '~/components/designs/Example'
import PersonalInfo from './PersonalInfo'

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
      path: '/newpost',
      name: 'CreateNewPost',
      component: CreateNewPost,
    },
    {
      path: '/postContent',
      name: 'PostContent',
      component: PostContent,
    },
    {
      path: '/example',
      name: 'Example',
      component: Example,
    },
    {
      name: 'PersonalActivity',
      path: '/personalactivity',
      component: PersonalActivity,
    },
    {
      name: 'PersonalInfo',
      path: '/personalinfo',
      component: PersonalInfo,
    },
  ],
})
