<template>
	<div class="wrapper">
		<Header />
	</div>
</template>

<script>
import Header from './components/Header'
export default {
	components: { Header },
	mounted() {
		this.$store.dispatch('address/initialCityFetch')
	},
}
</script>

<style lang="scss" scoped></style>
