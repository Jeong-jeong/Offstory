<template>
  <div class="container">
    <div class="row">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: { Header },
  // mounted() {
  //   this.$store.dispatch('address/initialCityFetch')
  // },
}
</script>

<style lang="scss" scoped></style>
