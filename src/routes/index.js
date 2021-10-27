import { createRouter, createWebHistory } from 'vue-router'
import store from '~/store/index'
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
      meta: { auth: true }, //인증이 필요한 페이지란 것을 알리는 태그
      //라우터 beforeEnter 가드 함수.
      beforeEnter: function (to, from, next) {
        //인증이 필요한 페이지이고(and), store를 불러와 로그인 상태가 아니라면
        if (to.meta.auth && !store.getters['Login/isLogin']) {
          //next 키워드로 로그인 상태페이지로 보내버린다.
          alert('인증이 필요한 페이지 입니다.')
          next('/login')
          return
        }
        //로그인을 한 상태면 그대로 페이지로 접근시킨다.
        next()
      },
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
