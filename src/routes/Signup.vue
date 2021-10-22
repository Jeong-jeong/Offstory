<template>
  <div class="sign-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <Form class="sign-form" @submit="submitSignup">
            <Field
              v-model="email"
              name="email"
              type="email"
              rules="required|email"
              placeholder="이메일"
            />
            <ErrorMessage name="email" />

            <Field
              v-model="password"
              name="password"
              type="password"
              rules="required|between:8,30|password"
              placeholder="비밀번호 (영문, 숫자, 특수문자 8 ~ 30자)"
            />
            <ErrorMessage name="password" />

            <Field
              name="confirmation"
              type="password"
              class="checkPassword"
              rules="required|confirmed:@password"
              placeholder="비밀번호 확인"
            />
            <ErrorMessage name="confirmation" />

            <Field
              v-model="fullName"
              type="text"
              name="name"
              rules="required|between:2,30"
              placeholder="이름 (2 ~ 30자)"
            />
            <ErrorMessage name="name" />

            <button>회원가입</button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import requestSignup from '~/api/requestSignup'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
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
