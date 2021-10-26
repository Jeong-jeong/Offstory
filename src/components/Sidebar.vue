<template>
  <div class="wrapper">
    <div class="top">
      <button
        class="option personal-info"
        @click="$router.push('/personalinfo')"
      >
        내 정보 변경
      </button>
      <button
        class="option personal-activity"
        @click="$router.push('/personalactivity')"
      >
        내 활동목록
      </button>
    </div>
    <div class="bottom">
      <button class="option logout" @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script>
import { deleteCookie } from '~/utils/cookies'

export default {
  methods: {
    logout() {
      this.$store.commit('Login/clearUsername')
      this.$store.commit('Login/clearToken')
      deleteCookie('off_auth')
      deleteCookie('off_user')
      this.$router.push('/')
      return alert('logout!')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/variables';

.wrapper {
  position: absolute;
  top: $LG_HEADER_HEIGHT;
  right: 0;

  .top {
    display: flex;
    flex-direction: column;
  }
}
</style>
