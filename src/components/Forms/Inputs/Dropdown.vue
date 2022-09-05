<template>
	<div class="default-dropdown" :class="{ error: errors.length }">
		<div
			class="default-dropdown__title pointer"
			:class="{ open: isOpen }"
			@click="isOpen = !isOpen"
		>
			{{ selectedItem && selectedItem.name || title }}
			<svg
				width="16"
				height="10"
				viewBox="0 0 16 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.16147 1.18955C1.36293 0.988142 1.63614 0.875 1.92101 0.875C2.20588 0.875 2.47909 0.988142 2.68055 1.18955L7.99841 6.5074L13.3163 1.18955C13.5189 0.99385 13.7903 0.885565 14.0719 0.888012C14.3536 0.89046 14.6231 1.00344 14.8223 1.20263C15.0215 1.40182 15.1344 1.67127 15.1369 1.95295C15.1393 2.23463 15.031 2.50601 14.8354 2.70863L8.75795 8.78603C8.55649 8.98743 8.28328 9.10057 7.99841 9.10057C7.71354 9.10057 7.44033 8.98743 7.23887 8.78603L1.16147 2.70863C0.960066 2.50716 0.846924 2.23396 0.846924 1.94909C0.846924 1.66422 0.960066 1.39101 1.16147 1.18955Z"
					fill="#484848"
				/>
			</svg>
		</div>
		<div class="default-dropdown__dropdown" :class="{ open: isOpen }">
			<div
				class="default-dropdown__dropdown-item pointer"
				v-for="(item, index) in list"
				:key="index"
				@click="selectItem(item)"
			>
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>
	import { ref, watch, toRef} from 'vue';

	export default {
		props: {
			modelValue: {
				type: [String, Number],
				default: '',
			},
			title: {
				type: String,
				default: '',
			},
			list: {
				type: Array,
				default: () => [],
			},
			errors: {
				type: Array,
				default: () => [],
			},
		},
		emits: ['update:modelValue'],
		setup(props, { emit }) {
			const isOpen = ref(false);
			const dropdownItems = toRef(props, 'list');

			const selectedItem = ref({
				name: null,
			});
			const selectItem = (item) => {
        		selectedItem.value = item;
				isOpen.value = false;
				emit('update:modelValue', item.id);
			};

			watch(
				() => props.modelValue,
				(value) => {
					if (!value) {
						selectedItem.value.name = props.title;
						emit('update:modelValue', null);
					}
				}
			);
			watch(
				() => dropdownItems.value,
				(value) => {
					if (value.length && props.modelValue) {
						selectedItem.value = value.find(item => item.id === props.modelValue);
					}
				}
			);
			return {
				isOpen,
				selectedItem,
				selectItem,
			};
		},
	};
</script>

<style lang="scss">
	.default-dropdown {
		border: unset;
		border-radius: 8px;
		height: 60px;
		position: relative;
		width: 100%;
		padding: 20px;
		background: #ebebeb;
		&.error {
			border: 2px solid #e52f2f;
		}
		&__title {
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			display: flex;
			justify-content: space-between;
			svg {
				transition: 0.2s ease;
			}
			&.open {
				svg {
					transform: rotate(180deg);
				}
			}
		}
		&__dropdown {
			position: absolute;
			left: 0;
			opacity: 0;
			width: 100%;
			visibility: hidden;
			transition: 0.2s ease;
			text-align: left;
			top: 60px;
			background: white;
			z-index: 999;
			box-shadow: drop-shadow(0px 4px 34px rgba(0, 0, 0, 0.25));
			border-radius: 8px;
			max-height: 200px;
			overflow: auto;
			&-item {
				padding: 10px;
				transition: 0.2s ease;
				font-weight: 400;
				font-size: 18px;
				line-height: 21px;
				&:hover {
					background: #e7f0f8;
				}
			}
			&.open {
				opacity: 1;
				visibility: visible;
			}
		}
	}
</style>
