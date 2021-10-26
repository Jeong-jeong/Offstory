<template>
  <div class="container">
    <div class="wrapper">
      <form @submit.prevent="submitForm">
        <input v-model="email" name="email" type="text" required />
        <input v-model="password" name="password" type="password" required />
        <button :disabled="!isUserNameVaild || !password">로그인</button>
      </form>
      <button @click="isSignup">회원가입</button>
    </div>
  </div>
</template>

<script>
import { loginUser, userDetailInfo } from '../api/index'

import { validateEmail } from '../utils/validation'
import {
  saveUserIdToCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '../utils/cookies'
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  components: {},
  computed: {
    isUserNameVaild() {
      return validateEmail(this.email)
    },
  },
  methods: {
    async submitForm() {
      //alert('f')
      try {
        const userData = {
          email: this.email,
          password: this.password,
        }
        const { data } = await loginUser(userData)
        console.log(data.user)
        this.$router.push('/')
        this.$store.commit('Login/setToken', data.token)
        this.$store.commit('Login/setUsername', data.user.fullName)
        this.$store.commit('Login/setUserId', data.user._id)
        console.log(data.token)
        saveUserIdToCookie(data.user._id)
        saveAuthToCookie(data.token)
        saveUserToCookie(data.user.fullName)

        const userDetaildata = await userDetailInfo(
          this.$store.getters['Login/getUserId'],
        )
        console.log(userDetaildata)
        console.log(userDetaildata.image)
        this.$store.commit('Login/setprofileImage', userDetaildata.image)
      } catch (error) {
        //에러 핸들링 코드
        console.log(error.response.data)
        alert(error.response.data)
      }
    },
    isSignup() {
      this.$router.push('/signup')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  @include flexbox;
  width: 100vw;
  height: 100vh;
}
</style>
