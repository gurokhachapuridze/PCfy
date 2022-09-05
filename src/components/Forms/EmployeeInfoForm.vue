<template>
	<div class="form-container">
		<div class="form-container__form grid grid-gap-60">
			<div class="grid grid-col-2 grid-gap-60">
				<Input
					v-model="state.name"
					:name="'სახელი'"
					:hint="'მინიმუმ 2 სიმბოლო, ქართული ასოები'"
					:errors="v$.name.$errors"
					@update:modelValue="updateValue('name', $event)"
				/>

				<Input
					v-model="state.surname"
					:name="'გვარი'"
					:hint="'მინიმუმ 2 სიმბოლო, ქართული ასოები'"
					:errors="v$.surname.$errors"
					@update:modelValue="updateValue('surname', $event)"
				/>
			</div>
			<div class="grid grid-col-1">
				<Dropdown
					v-model="state.team_id"
					:list="teams"
					:title="'თიმი'"
					:errors="v$.team_id.$errors"
					@update:modelValue="updateValue('team_id', $event)"
				/>
			</div>
			<div class="grid grid-col-1">
				<Dropdown
					v-model="state.position_id"
					:list="positions"
					:title="'პოზიცია'"
					:errors="v$.position_id.$errors"
					@update:modelValue="updateValue('position_id', $event)"
				/>
			</div>
			<div class="grid grid-col-1">
				<Input
					v-model="state.email"
					:name="'მეილი'"
					:errors="v$.email.$errors"
					:hint="'უნდა მთავრდებოდეს @redberry.ge-ით'"
					@update:modelValue="updateValue('email', $event)"
				/>
			</div>
			<div class="grid grid-col-1">
				<Input
					v-model="state.phone_number"
					:name="'ტელეფონის ნომერი'"
					:hint="'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს'"
					type="number"
					:errors="v$.phone_number.$errors"
					@update:modelValue="updateValue('phone_number', $event)"
				/>
			</div>

			<div class="grid grid-col-2 grid-gap-60 al-center j-btw">
				<router-link class="back" to="/"></router-link>
				<button @click.prevent="submit" class="btn">შემდეგი</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { reactive, computed, ref, watch, onMounted } from 'vue';
	import useVuelidate from '@vuelidate/core';
	import { required, email, minLength, helpers } from '@vuelidate/validators';
	import { useStore } from '@/store';
	import Dropdown from './Inputs/Dropdown.vue';
	import Input from './Inputs/Input.vue';
	export default {
		props: {
			clickedNext: {
				type: Boolean,
			}
		},
		components: { Input, Dropdown },
		emits: ['next'],
		setup(props, { emit }) {
			const store = useStore();
			const teams = computed(() => store.teams.map((team) => ({ ...team})))
			const fieldLength = ref(2);
			const state = ref({
				name: '',
				surname: '',
				email: '',
				team_id: '',
				position_id: '',
				phone_number: '',
			});
			const positions = computed(() => {
				if (state.value.team_id) {
					// state.value.position_id = null;
					return store.positions.filter(
						(position) => position.team_id === state.value.team_id
					);
				} else return store.positions.map((pos) => ({ ...pos}));

			});

			//georgian check validation
			const isGeorgian = (value) => {
				if (value.length) {
					const patt = new RegExp('^[\u10D0-\u10F1]+$');
					if (patt.test(value)) return true;
					else return;
				}
			};

			// specific email validation
			const isRedberryEmail = (email) => {
				if (/@redberry.ge\s*$/.test(email)) return true;
				else return false;
			};
			// Georgian phone validation
			const isGeorgianPhone = (phone) => {
				if (/^(\+?995)?(79\d{7}|5\d{8})$/.test(phone)) return true;
				else return false;
			};

			const defaultInputValidations = {
				required: helpers.withMessage('ველი აუცილებელია', required),
				minLength: helpers.withMessage(
					'მინიმუმ 2 სიმბოლო',
					minLength(fieldLength)
				),
				isGeorgian: helpers.withMessage('ქართული ასოები', isGeorgian),
			};

			const rules = {
				name: defaultInputValidations, // Matches state.value.name
				surname: defaultInputValidations, // Matches state.value.surname
				email: {
					email: helpers.withMessage('უნდა იყოს ვალიდური იმეილი', email),
					isRedberryEmail: helpers.withMessage(
						'უნდა მთავრდებოდეს @redberry.ge-ით',
						isRedberryEmail
					),
				},
				team_id: { required },
				position_id: { required },
				phone_number: {
					isGeorgianPhone: helpers.withMessage(
						'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს',
						isGeorgianPhone
					),
					required: helpers.withMessage('ველი აუცილებელია', required),
				},
			};

			const v$ = useVuelidate(rules, state);

			const updateValue = (fieldName, event) => {
				chang
				state.value[fieldName] = event;
			};

			const submit = async () => {
				const result = await v$.value.$validate();
				if (!result) {
					// notify user form is invalid
					return;
				} else {
					store.employeeData = state.value;
					emit('next');
				}
			};

			store.getTeams();
			store.getPositions();
			onMounted(() => {
					const employeeData = localStorage.getItem('employeeData');
					console.log(employeeData,'employeeData')
					if (employeeData) {
						state.value = JSON.parse(employeeData)
					}
					console.log(state.value,'state')

			}),
			watch(
				() => props.clickedNext,
				(value) => {
					if (value) {
						submit();
					}
				}
			);
			watch(
				() => state.value,
				(value) => {
					console.log(value);
					// Put the object into storage
					localStorage.setItem('employeeData', JSON.stringify(value));

					// Retrieve the object from storage
					const retrievedObject = localStorage.getItem('employeeData');

					console.log('retrievedObject: ', JSON.parse(retrievedObject));
				}, {deep: true}
			);


			return {
				teams,
				state,
				v$,
				updateValue,
				submit,
				positions,
			};
		},
	};
</script>

<style lang="scss">
	.form-container {
		&__form {
			padding: 69px 0;
		}
	}
</style>
