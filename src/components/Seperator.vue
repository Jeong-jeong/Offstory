<template>
	<hr
		:style="{
			border: 'none',
			margin: dir === 'row' ? `0 ${margin}px` : `${margin}px 0`,
			backgroundColor: color,
			width: `${width}px`,
			height: `${height}px`,
		}"
	/>
</template>

<script>
export default {
	props: {
		dir: {
			type: String,
			default: 'column',
		},
		width: {
			type: [Number, String],
			defalut: 10,
		},
		height: {
			type: [Number, String],
			default: 1,
		},
		color: {
			type: String,
			default: '#cccccc',
		},
		margin: {
			type: [Number, String],
			default: 10,
		},
	},
}
</script>
