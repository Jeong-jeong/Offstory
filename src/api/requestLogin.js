const API_END_POINT = 'http://13.209.30.200'

const requestSignup = async ({ email, password }) => {
	const result = await fetch(`${API_END_POINT}/login`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
		}),
	})
		.then(res => res.json())
		.catch(error => alert(error))
	return result
}

export default requestSignup
