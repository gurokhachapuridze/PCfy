<template>
	<div class="default-radio" :class="{ error: errors.length }">
		<div class="default-radio__name">{{ title }}</div>
		<div class="default-radio__list">
			<div
				class="default-radio__item pointer"
				v-for="(radio, index) in inputItems"
				:key="index"
			>
				<input
					type="radio"
					:id="radio.value"
					:name="title"
					:value="radio.value"
					@input="handleInput"
				/>
				<label class="ml-10" :for="radio.value"> {{ radio.title }} </label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: {
				type: Object,
				default: () => ({}),
			},
			title: {
				type: String,
				default: '',
			},
			inputItems: {
				type: Array,
				default: () => [],
			},
			errors: {
				type: Array,
				default: () => [],
			},
		},
		setup(props, { emit }) {
			const handleInput = (event) => {
				const trimmedValue = event.target.value.trim();
				emit('update:modelValue', trimmedValue);
			};
			return {
				handleInput,
			};
		},
	};
</script>

<style lang="scss">
	.default-radio {
		&.error {
			.default-radio__name {
				color: #e52f2f;
			}
		}
		&__name {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			color: #000000;
			text-align: left;
			margin-bottom: 25px;
		}
		&__list {
			display: flex;
		}
		&__item {
			display: flex;
			align-items: center;
			&:not(:last-child) {
				margin-right: 30px;
			}
			label {
				margin-left: 10px;
			}
		}
		input[type='radio'] {
			-webkit-appearance: none;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			margin-top: -4px;
			outline: none;
			box-shadow: 0 0 0 2px #4d9ac3;
		}
		input[type='radio']:before {
			content: '';
			display: block;
			width: 80%;
			height: 80%;
			margin: 10% auto;
			border-radius: 50%;
		}
		input[type='radio']:checked:before {
			background: #036092;
		}
	}
</style>
