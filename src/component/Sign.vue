<template>
  <div class="sign-page">
    <div class="container">
      <Deemed />
      <div class="row">
        <div class="col-lg-8">
          <form class="sign-form">
            <input v-model="email" type="email" />
            <input v-model="password" type="password" />
            <input type="password" class="checkPw" />
            <input v-model="fullName" type="text" class="name" />

            <button @click.prevent="test">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Deemed from './Deemed.vue'
export default {
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
    }
  },

  components: {
    Deemed,
  },

  methods: {
    test() {
      // console.log(this.email, this.fullName, this.password)
      const API_END_POINT = 'http://13.209.30.200'

      const signup = async ({ email, fullName, password }) => {
        const result = await fetch(`${API_END_POINT}/signup`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            fullName,
            password,
          }),
        }).then(res => res.json())
        console.log(result)
        return result
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
