<template>
  <div class="sign-page">
    <div class="container">
      <Deemed />
      <div class="row">
        <div class="col-lg-8">
          <form class="sign-form" @submit.prevent="submitSignup">
            <input v-model="email" type="email" required />
            <input ref="pw" v-model="password" type="password" required />
            <input
              ref="checkPw"
              type="password"
              class="checkPassword"
              required
            />
            <input v-model="fullName" type="text" class="name" required />

            <button>회원가입</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requestSignup from '~/api/requestSignup'

export default {
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
    }
  },

  methods: {
    async submitSignup() {
      const res = await requestSignup({
        email: this.email,
        password: this.password,
        fullName: this.fullName,
      })
      console.log(res)
    },
  },
}
</script>

<style lang="scss" scoped></style>
