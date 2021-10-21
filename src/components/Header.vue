<template>
	<form @submit.prevent="">
		<input
			:value="userAddress"
			placeholder="'서울 강남'을 입력해 보세요"
			ref="input"
			@keyup.enter="parseAddress"
		/>
		<button>submit</button>
	</form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	computed: {
		...mapState('address', ['cityList', 'countyList']),
	},
	methods: {
		...mapActions('address', ['fetchCounty']),
		async parseAddress() {
			const userCity = this.cityList.find(city =>
				this.$refs.input.value.includes(city.name),
			)

			await this.fetchCounty(userCity.code)

			const userCounty = this.countyList.find(county => {
				const countyNameWithoutGu = county.name.replace(/구$/, '')
				return this.$refs.input.value.includes(countyNameWithoutGu)
			})

			//for debug
			console.log('userCounty', userCounty)

			this.$refs.input.value = ''
		},
	},
}
</script>

<style scoped lang="scss">
$color: red;
h1 {
	color: $color;
}
</style>
