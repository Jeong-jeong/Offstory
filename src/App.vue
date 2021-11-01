<template>
  <Header
    :isSidebarShowed="isSidebarShowed"
    @toggleSidebar="onProfileClick"
    @closeSidebar="offProfileClick"
  />
  <Sidebar v-if="isSidebarShowed && isLogin" />
  <RouterView />
</template>

<script>
import { mapGetters } from 'vuex'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default {
  components: { Header, Sidebar },
  data() {
    return {
      isSidebarShowed: true,
    }
  },
  computed: {
    ...mapGetters('Login', ['isLogin']),
  },
  methods: {
    onProfileClick() {
      this.isSidebarShowed = !this.isSidebarShowed
    },
    offProfileClick() {
      this.isSidebarShowed = false
    },
  },
  async mounted() {},
}
</script>

<style lang="scss">
html,
body {
  font-family: $FONT_MAIN;
  @include font;
}

input,
button {
  font-family: $FONT_MAIN;
}
</style>
