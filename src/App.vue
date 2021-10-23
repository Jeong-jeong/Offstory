<template>
  <Header @toggleSidebar="onProfileClick" />
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
  },
  mounted() {
    // this.$store.dispatch('address/initialCityFetch')
  },
}
</script>

<style lang="scss" scoped></style>
