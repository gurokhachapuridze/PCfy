<template>
	<div class="default-input" :class="{ error: errors.length }">
		<p class="default-input__name">{{ name }}</p>
		<input
			class="input"
			:value="modelValue"
			:type="type"
			@input="handleInput"
		/>
		<p class="default-input__hint" v-if="!errors.length">{{ hint }}</p>
		<div class="input-errors" v-for="error of errors" :key="error.$uid">
			<div class="error-msg">{{ error.$message }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: {
				type: [String, Number],
				default: '',
			},
			name: {
				type: String,
				default: '',
			},
			hint: {
				type: String,
				default: '',
			},
			type: {
				type: String,
				default: 'text',
			},
			errors: {
				type: Array,
				default: () => [],
			},
		},
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const handleInput = (event) => {
				let trimmedValue = event.target.value.trim();
				if (props.type === 'number') trimmedValue = parseInt(trimmedValue);
				emit('update:modelValue', trimmedValue);
			};
			return {
				handleInput,
			};
		},
	};
</script>

<style lang="scss">
	.default-input {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		&.error {
			input {
				border: 2px solid #e52f2f;

				&:focus-visible {
					border: 2px solid #e52f2f;
					outline-color: #e52f2f;
				}
				&:active {
					border: 2px solid #e52f2f;
				}
			}
			.default-input__name {
				color: #e52f2f;
			}
		}
		input {
			width: 100%;
			height: 60px;
			font-style: normal;
			font-weight: 400;
			font-size: 16px;
			line-height: 21px;
			border: 1.8px solid #8ac0e2;
			border-radius: 8px;
			padding: 0px 16px;
			margin: 10px 0;
		}
		.input-errors {
			.error-msg {
				font-weight: 300;
				font-size: 14px;
				line-height: 21px;
				color: #e52f2f;
			}
		}
		&__name {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			color: #000000;
		}
		&__hint {
			font-style: normal;
			font-weight: 300;
			font-size: 14px;
			line-height: 21px;
		}
	}
</style>
