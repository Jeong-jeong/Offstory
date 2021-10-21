<template>
	<div class="container">
		<div id="user-info" class="row">
			<div class="user-info col-sm-4 col-lg-9">
				<img src="https://source.unsplash.com/random" alt="" />
				<div class="user-details">
					<div class="user-nickname">wherehows</div>
					<div class="user-introduce">나는 공부하는게 너무 싫습니다</div>
				</div>
			</div>
		</div>
		<div id="category" class="row" :style="{ marginTop: '30px' }">
			<div class="col-sm-4 col-lg-9">
				<div class="category">
					<button class="OffStory">OffStory</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-4 col-lg-9">
				<Seperator />
			</div>
		</div>
		<div class="row">
			<div class="col-sm-4 col-lg-9">
				<div class="activity-filter"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-4 col-lg-9">
				<div class="activity-list"></div>
			</div>
		</div>
	</div>
</template>

<script>
import Seperator from '../components/Seperator'

export default {
	components: { Seperator },
}
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	top: 150px;
	.row {
		@include flexbox;
	}

	#user-info {
		.user-info {
			display: flex;
			img {
				width: 180px;
				height: 180px;
				border-radius: 50%;
			}

			.user-details {
				margin-left: 20px;
			}
		}
	}
}
</style>
