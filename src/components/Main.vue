<template>
	<div class="main-page">
		<img class="redberry" src="@/assets/imgs/redbery-LOGO.png" />
		<img class="main_img" src="@/assets/imgs/main-logo.png" alt="" />
		<img class="mobile-main_img" src="@/assets/imgs/mobileLanding.png" alt="" />

		<router-link to="/newrecord" class="btn pointer mb-20 flex-center"
			>ᲩᲐᲜᲐᲬᲔᲠᲘᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</router-link
		>
		<router-link to="/records" class="btn pointer flex-center"
			>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</router-link
		>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		props: {
			msg: String,
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.main-page {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding-top: 79px;
		@media (max-width: 767px) {
			padding-top: 0px;
			height: 100vh;
		}
		.main_img,
		.mobile-main_img {
			margin-bottom: 10vh;
			margin-top: 5vh;
			max-height: 50vh;
		}
		.main_img {
			display: block;
			@media (max-width: 767px) {
				display: none;
			}
		}
		.mobile-main_img {
			display: none;
			@media (max-width: 767px) {
				display: block;
				margin-bottom: 10vh;
				margin-top: 20vh;
			}
		}
		.mb-20 {
			margin-bottom: 20px;
		}
	}
</style>
