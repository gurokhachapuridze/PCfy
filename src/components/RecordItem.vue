<template>
	<div class="record-item">
		<img
			:src="'https://pcfy.redberryinternship.ge' + data.laptop.image"
			:alt="data.laptop.name"
		/>
		<div class="flex">
			<p class="record-item__name">{{ data.user.name }}</p>
			<p class="record-item__type">{{ data.laptop.name }}</p>
			<router-link :to="`/records/${data.laptop.id}`" class="record-item__more" href="">მეტის ნახვა</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {},
			},
		},
	};
</script>

<style lang="scss">
	.record-item {
		display: flex;
		background-color: #eafaff;
		padding: 14px;
		border: 1px solid #aed1ea;
		border-radius: 20px;
		@media (max-width: 767px) {
			border-radius: 10px;
			    padding: 5px;
		}
		img {
			border-radius: 10px;
			width: 266px;
			height: 178px;
			@media (max-width: 767px) {
				width: 164px;
				height: 109px
			}
		}
		.flex {
			text-align: left;
			margin-left: 28px;
		}
		&__type {
			padding-top: 18px;
			padding-bottom: 40px;
			font-style: normal;
			font-weight: 400;
			font-size: 18px;
			line-height: 21px;
			@media (max-width: 767px) {
				padding-top: 10px;
				padding-bottom: 10px;
						font-size: 18px;
				line-height: 21px;
			}

		}
		&__name {
			padding-top: 31px;
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			@media (max-width: 767px) {
				padding-top: 10px;

				font-size: 14px;
line-height: 21px;
			}
		}
		&__more {
			padding-bottom: 39px;
			color: #4386a9;
			font-style: normal;
			font-weight: 400;
			font-size: 16px;
			line-height: 21px;
			@media (max-width: 767px) {
				font-size: 14px;
				line-height: 21px;
			}
		}
	}
</style>
