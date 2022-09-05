<template>
	<div class="success-modal">
		<div class="success-modal__content">
			<img src="@/assets/imgs/success.png" alt="success" />
			<p class="text">ჩანაწერი დამატებულია!</p>
			<router-link tag="button" to="/records" class="button pointer flex-center"
				>სიაში გადაყვანა</router-link
			>
			<router-link class="main" to="/">მთავარი</router-link>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	.success-modal {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: #4a4a4a;
		z-index: 999999;
		&__content {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 847px;
			height: 537px;
			background: #ffffff;
			border-radius: 8px;
		}
		.text {
			font-style: normal;
			font-weight: 700;
			font-size: 25px;
			line-height: 31px;
			color: #292929;
			margin-bottom: 79px;
		}

		.button {
			color: #ffffff;
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			width: 297px;
			height: 60px;
			background: #62a1eb;
			border-radius: 8px;
			margin-bottom: 28px;
			border: none;
		}
		.main {
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			color: #0089a7;
			margin-bottom: 44px;
		}
	}
</style>
