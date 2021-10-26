import { createRouter, createWebHistory } from 'vue-router'
import Main from './Main'
import Signup from './Signup'
import PostContent from './PostContent'
import Login from './Login'
import CreateNewPost from './CreateNewPost'
import PersonalActivity from './PersonalActivity'
import Chat from './Chat'
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
      path: '/newpost',
      name: 'CreateNewPost',
      component: CreateNewPost,
    },
    {
      path: '/postContent',
      name: 'PostContent',
      component: PostContent,
      props: true,
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
      name: 'Chat',
      path: '/chat',
      component: Chat,
    },
  ],
})
