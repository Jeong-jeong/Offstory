<template>
  <div>
    <Header />
    <PersonalActivity />
  </div>
</template>

<script>
import Header from './components/Header'
import PersonalActivity from './routes/PersonalActivity.vue'
export default {
  components: { Header, PersonalActivity },
  mounted() {
    // this.$store.dispatch('address/initialCityFetch')
  },
}
</script>

<style lang="scss" scoped></style>
