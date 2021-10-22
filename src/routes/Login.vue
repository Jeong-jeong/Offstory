<template>
  <div class="Login-container">
    <form @submit.prevent="submitForm">
      <input v-model="email" name="email" type="text" required />
      <input v-model="password" name="password" type="password" required />
      <button :disabled="!isUserNameVaild || !password">로그인</button>
    </form>
    <button @click="isSignup">회원가입</button>
  </div>
</template>

<script>
import { loginUser } from '../api/index'
import { validateEmail } from '../utils/validation'
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookies'
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
        console.log(data.user.image)
        this.$router.push('/')
        this.$store.commit('Login/setUsername', data.user.fullName)
        this.$store.commit('Login/setToken', data.token)
        console.log(data.token)
        saveAuthToCookie(data.token)
        saveUserToCookie(data.user.fullName)
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
.test {
  background: red;
}
</style>
