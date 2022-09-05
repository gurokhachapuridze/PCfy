<template>
	<div class="form-container">
		<div class="form-container__form grid grid-gap-50">
			<div
				class="form-container__form-image flex-center pointer"
				:class="{ error: v$.laptop_image.$errors.length }"
			>
				<input
					@change="uploadImage($event)"
					type="file"
					accept="image/*"
					class="pointer"
				/>
				<svg
					v-if="v$.laptop_image.$errors.length"
					width="38"
					height="34"
					viewBox="0 0 38 34"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M24.3201 3.04653L37.052 24.1286C38.8817 27.1565 37.983 31.1402 35.0437 33.0253C34.0572 33.6604 32.9073 33.9988 31.732 34H6.26622C2.80631 34 0 31.11 0 27.5418C0 26.3348 0.328701 25.1543 0.946203 24.1286L13.68 3.04653C15.5078 0.0186215 19.3725 -0.90883 22.3118 0.976296C23.125 1.49763 23.8128 2.20597 24.3201 3.04653ZM19.0001 26.4444C19.504 26.4444 19.9872 26.2454 20.3436 25.8911C20.6999 25.5369 20.9001 25.0564 20.9001 24.5555C20.9001 24.0545 20.6999 23.5741 20.3436 23.2198C19.9872 22.8656 19.504 22.6666 19.0001 22.6666C18.4961 22.6666 18.0129 22.8656 17.6565 23.2198C17.3002 23.5741 17.1 24.0545 17.1 24.5555C17.1 25.0564 17.3002 25.5369 17.6565 25.8911C18.0129 26.2454 18.4961 26.4444 19.0001 26.4444ZM19.0001 9.44425C18.4961 9.44425 18.0129 9.64326 17.6565 9.9975C17.3002 10.3517 17.1 10.8322 17.1 11.3332V18.8888C17.1 19.3897 17.3002 19.8702 17.6565 20.2244C18.0129 20.5787 18.4961 20.7777 19.0001 20.7777C19.504 20.7777 19.9872 20.5787 20.3436 20.2244C20.6999 19.8702 20.9001 19.3897 20.9001 18.8888V11.3332C20.9001 10.8322 20.6999 10.3517 20.3436 9.9975C19.9872 9.64326 19.504 9.44425 19.0001 9.44425Z"
						fill="#C9CB52"
					/>
				</svg>

				<p class="form-container__form-text">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
				<button class="btn">ატვირთე</button>
				<img v-if="imageValue" :src="imageValue.src" :alt="imageValue.name" />
			</div>
			<div
				class="grid grid-col-2 grid-gap-60 j-btw al-center"
				v-if="imageValue"
			>
				<div class="upload-info">
					<svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z"
							fill="#BED918"
						/>
					</svg>
					<p class="upload-info__name">{{ imageValue.name }}</p>
					<p class="upload-info__size">{{ imageValue.size }} mb</p>
				</div>
				<button class="btn upload-img-btn">
					<input
						@change="uploadImage($event)"
						type="file"
						accept="image/*"
					/>თავიდან ატვირთე
				</button>
			</div>
			<div class="grid grid-col-2 grid-gap-60 al-center border-bottom">
				<Input
					v-model="state.laptop_name"
					:name="'ლეპტოპის სახელი'"
					:hint="'ლათინური ასოები, ციფრები, !@#$%^&*()_+= '"
					:errors="v$.laptop_name.$errors"
					@update:modelValue="updateValue('laptop_name', $event)"
				/>
				<Dropdown
					v-model="state.laptop_brand_id"
					title="ლეპტოპის ბრენდი"
					:list="brands"
					:errors="v$.laptop_brand_id.$errors"
					@update:modelValue="updateValue('laptop_brand_id', $event)"
				/>
			</div>
			<div class="grid grid-col-3 grid-gap-25 al-center">
				<Dropdown
					v-model="state.laptop_cpu"
					title="CPU"
					:list="cpus"
					:errors="v$.laptop_cpu.$errors"
					@update:modelValue="updateValue('laptop_cpu', $event)"
				/>
				<Input
					:name="'CPU-ს ბირთვი'"
					:hint="'მხოლოდ ციფრები'"
					type="number"
					:errors="v$.laptop_cpu_cores.$errors"
					@update:modelValue="updateValue('laptop_cpu_cores', $event)"
				/>
				<Input
					:name="'CPU-ს ნაკადი'"
					:hint="'მხოლოდ ციფრები'"
					type="number"
					:errors="v$.laptop_cpu_threads.$errors"
					@update:modelValue="updateValue('laptop_cpu_threads', $event)"
				/>
			</div>
			<div class="grid grid-col-2 grid-gap-60 al-center border-bottom">
				<Input
					:name="'ლეპტოპის RAM (GB)'"
					:hint="'მხოლოდ ციფრები'"
					type="number"
					:errors="v$.laptop_ram.$errors"
					@update:modelValue="updateValue('laptop_ram', $event)"
				/>
				<Radio
					title="მეხსიერების ტიპი"
					:inputItems="memory"
					:errors="v$.laptop_hard_drive_type.$errors"
					@update:modelValue="updateValue('laptop_hard_drive_type', $event)"
				/>
			</div>
			<div class="grid grid-col-2 grid-gap-60 al-center">
				<Input
					:name="'შეძენის რიცხვი (არჩევითი)'"
					:hint="'მხოლოდ ციფრები'"
					type="date"
					@update:modelValue="updateValue('laptop_purchase_date', $event)"
				/>

				<Input
					:name="'ლეპტოპის ფასი'"
					:hint="'მხოლოდ ციფრები'"
					type="number"
					:errors="v$.laptop_price.$errors"
					@update:modelValue="updateValue('laptop_price', $event)"
				/>
			</div>
			<div class="grid grid-gap-60 al-center">
				<Radio
					title="ლეპტოპის მდგომარეობა"
					:inputItems="condition"
					:errors="v$.laptop_state.$errors"
					@update:modelValue="updateValue('laptop_state', $event)"
				/>
			</div>
			<div class="grid grid-col-2 grid-gap-60 al-center j-btw">
				<router-link class="back" to="/">უკან</router-link>
				<button class="btn" @click.prevent="submit">დამახსოვრება</button>
			</div>
		</div>
	</div>
	<Teleport to="body">
		<SuccessModal v-if="success" />
	</Teleport>
</template>

<script>
	import { reactive, computed, ref, onMounted, onBeforeUnmount } from 'vue';
	import useVuelidate from '@vuelidate/core';
	import { required, email, minLength, helpers } from '@vuelidate/validators';
	import { useStore } from '@/store';
	import Dropdown from './Inputs/Dropdown.vue';
	import Input from './Inputs/Input.vue';
	import Radio from './Inputs/Radio.vue';
	import SuccessModal from './SuccessModal.vue';
	export default {
		components: { Input, Dropdown, Radio, SuccessModal },
		setup() {
			const store = useStore();
			const teams = computed(() => store.teams);
			const brands = computed(() => store.brands);
			const cpus = computed(() =>
				store.cpus.map((cpu) => ({ ...cpu, id: cpu.name }))
			);
			const success = ref(false);
			const memory = [
				{
					title: 'SSD',
					value: 'SSD',
				},
				{
					title: 'HDD',
					value: 'HDD',
				},
			];
			const condition = [
				{
					title: 'ახალი',
					value: 'new',
				},
				{
					title: 'მეორადი',
					value: 'used',
				},
			];

			// validations
			const isEnglish = (value) => {
				if (value.length) {
					const patt = new RegExp('^[a-zA-Z]+$');
					if (patt.test(value)) return true;
					else return;
				}
			};
			const fieldLength = ref(2);
			const state = reactive({
				laptop_image: '',
				laptop_name: '',
				laptop_brand_id: '',
				laptop_cpu: '',
				laptop_cpu_cores: '',
				laptop_cpu_threads: '',
				laptop_ram: '',
				laptop_hard_drive_type: '',
				laptop_state: '',
				laptop_purchase_date: '',
				laptop_price: '',
			});
			const rules = {
				laptop_image: { required },
				laptop_name: {
					required: helpers.withMessage('ველი აუცილებელია', required),
					isEnglish: helpers.withMessage(
						'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ',
						isEnglish
					),
				},
				laptop_brand_id: { required },
				laptop_cpu: { required },
				laptop_cpu_cores: {
					required: helpers.withMessage('ველი აუცილებელია', required),
				},
				laptop_cpu_threads: {
					required: helpers.withMessage('ველი აუცილებელია', required),
				},
				laptop_ram: {
					required: helpers.withMessage('ველი აუცილებელია', required),
				},
				laptop_hard_drive_type: { required },
				laptop_state: { required },
				laptop_purchase_date: '',
				laptop_price: {
					required: helpers.withMessage('ველი აუცილებელია', required),
				},
			};
			const v$ = useVuelidate(rules, state);
			const updateValue = (fieldName, event) => {
				state[fieldName] = event;
			};

			const imageValue = ref(null);
			const bytesToMegaBytes = (bytes) => (bytes / 1024 / 1000).toFixed(2);
			const uploadImage = (image) => {
				const file = image.target.files[0];
				imageValue.value = {
					name: file.name,
					size: bytesToMegaBytes(file.size),
					src: URL.createObjectURL(file),
				};
				state.laptop_image = file;
			};

			const submit = async () => {
				const result = await v$.value.$validate();
				if (!result) {
					return;
				}
				const resultInfo = { ...store.employeeData, ...state };
				success.value = false;
				const res = await store.createLaptop(resultInfo);

				if (res.status === 200) {
					success.value = true;
				}
			};
			store.getBrands();
			store.getCpus();
			onBeforeUnmount(() => {
				success.value = false;
			});

			return {
				brands,
				memory,
				cpus,
				condition,
				imageValue,
				uploadImage,
				submit,
				v$,
				updateValue,
				state,
				success,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.form-container {
		background-color: #ffffff;
		border-radius: 18px;
		&__form {
			max-width: 878px;
			margin: 0 auto;
			padding: 69px 0;

			&-image {
				flex-direction: column;
				width: 100%;
				height: 423px;
				border: 2px dashed #4386a9;
				border-radius: 18px;
				background-color: #f7f7f7;
				margin-top: 50px;
				position: relative;
				&.error {
					border: 2px dashed #e52f2f;
					background-color: #fff1f1;
					svg {
						margin-bottom: 20px;
					}
				}
				img {
					position: absolute;
					width: 95%;
					height: 95%;
					border-radius: 18px;
					z-index: 9991;
					object-fit: cover;
				}
				input {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 999;
					opacity: 0;
				}
			}
			.upload-info {
				display: flex;
				svg {
				}
				&__name {
					margin: 0 18px 0 25px;
					font-weight: 400;
					font-size: 18px;
					line-height: 21px;
					color: #202020;
				}
				&__size {
					font-weight: 400;
					font-size: 18px;
					line-height: 21px;
					color: #5f5f5f;
				}
			}
			.upload-img-btn {
				position: relative;
				input {
					position: absolute;
					width: 100%;
					height: 100%;
					z-index: 999;
					opacity: 0;
					cursor: pointer;
				}
			}
			&-text {
				text-align: center;
				width: 195px;
				color: #4386a9;
				font-style: normal;
				font-weight: 500;
				font-size: 20px;
				line-height: 38px;
				margin-bottom: 65px;
			}
			.border-bottom {
				padding-bottom: 50px;
				border-bottom: 1px solid #c7c7c7;
			}
			.btn {
				min-width: 233px;
			}
			.back {
				font-weight: 500;
				font-size: 18px;
				line-height: 21px;
				color: #62a1eb;
				text-align: left;
			}
		}
	}
</style>
