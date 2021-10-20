<template>
	<div class="Login-container">
		<form @submit.prevent="Login">
			<input v-model="email" name="email" type="text" required />
			<input v-model="password" name="password" type="password" required />
			<button>로그인</button>
		</form>
		<button>회원가입</button>
	</div>
</template>

<script>
import requestLogin from '../api/requestLogin'
export default {
	data() {
		return {
			email: '',
			password: '',
			errorMessage: '',
		}
	},
	components: {},
	methods: {
		async Login() {
			const result = requestLogin({
				email: this.email,
				password: this.password,
			})

			console.log(result)
		},
	},
}
</script>

<style lang="scss" scoped>
.test {
	background: red;
}
</style>
