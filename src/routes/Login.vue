<template>
  <div class="container">
    <div class="login-page">
      <div class="row">
        <div class="col-lg-6">
          <Form class="login-form" @submit="submitForm">
            <header class="login-header">
              <div class="logo-area">
                <img src="../assets/images/logo.svg" alt="로고" />
              </div>
              <h1 class="login-title">Login</h1>
            </header>
            <Field
              class="login-input"
              v-model="email"
              name="email"
              type="text"
              required
              rules="required|email"
              placeholder="이메일"
            />
            <div class="error-message-wrapper">
              <ErrorMessage name="confirmation" class="error-message" />
            </div>
            <input
              class="login-input"
              v-model="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              rules="required|confirmed:@password"
              required
            />
            <div class="error-message-wrapper">
              <ErrorMessage name="confirmation" class="error-message" />
            </div>
            <Button v-bind="{ width: '100%' }" class="login-button"
              >로그인</Button
            >
            <Button v-bind="{ width: '100%' }" @click="isSignup"
              >회원가입</Button
            >
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/designs/Button'
import { loginUser, userDetailInfo } from '../api/index'
import { validateEmail } from '../utils/validation'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookies'
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  components: { Button, Field, Form, ErrorMessage },
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
  position: relative;
  top: $LG_HEADER_HEIGHT;

  .row {
    height: calc(100vh - $LG_HEADER_HEIGHT);
    justify-content: center;

    .login {
      &-header {
        width: 100%;
        .login-title {
          font-size: $FONT_L;
          font-weight: 700;
        }

        .logo-area {
          display: flex;
          justify-content: right;
          img {
            width: 120px;
          }
        }
        margin-bottom: $LG_PADDING_VERTICAL;
      }

      &-form {
        @include flexbox;
        flex-direction: column;
        position: relative;
        top: 50%;
        padding: $LG_PADDING_VERTICAL $LG_PADDING_HORIZONTAL;
        background-color: $COLOR_WHITE;
        box-shadow: $BOX_SHADOW;
        transform: translateY(-50%);

        .login-input {
          @include font;
          width: 100%;
          padding: $INNER_PADDING_VERTICAL $INNER_PADDING_HORIZONTAL;
          border-radius: $BORDER_RADIOUS;
          border: 1px solid $COLOR_GRAY_DARKEN;

          &::placeholder {
            font-weight: 700;
            color: $COLOR_GRAY_LIGHTEN;
          }
        }
      }

      &-button {
        margin-top: 30px;
        margin-bottom: 10px;
      }
    }
    .error-message {
      &-wrapper {
        height: $FONT_XS;
        display: block;
        width: 100%;
        font-size: $FONT_XS;
        color: $COLOR_RED;
      }
    }
  }
}
</style>
