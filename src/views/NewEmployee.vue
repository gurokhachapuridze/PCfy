<template>
	<div class="new-employee">
		<router-link to="/" class="back pointer">
			<svg
				width="53"
				height="53"
				viewBox="0 0 53 53"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="26.5" cy="26.5" r="26.5" fill="#D9D9D9" />
				<path
					d="M28.8577 19.3522C29.0832 19.5778 29.2099 19.8837 29.2099 20.2026C29.2099 20.5216 29.0832 20.8275 28.8577 21.053L22.9035 27.0073L28.8577 32.9615C29.0768 33.1883 29.198 33.4922 29.1953 33.8076C29.1926 34.123 29.0661 34.4247 28.843 34.6477C28.62 34.8707 28.3183 34.9972 28.0029 35C27.6875 35.0027 27.3837 34.8815 27.1568 34.6623L20.3522 27.8577C20.1267 27.6321 20 27.3262 20 27.0073C20 26.6883 20.1267 26.3824 20.3522 26.1568L27.1568 19.3522C27.3824 19.1267 27.6883 19 28.0073 19C28.3262 19 28.6321 19.1267 28.8577 19.3522Z"
					fill="#2E2E2E"
				/>
			</svg>
		</router-link>
		<div class="new-employee__tabs">
			<h3
				class="pointer"
				:class="{ active: selectedTab === 'employee' }"
				@click="selectedTab = 'employee'"
			>
				თანამშრომლის ინფო
			</h3>
			<h3
				class="pointer"
				:class="{ active: selectedTab === 'laptop' }"
				@click="selectedTab = 'laptop'"
			>
				ლეპტოპის მახასიათებლები
			</h3>
		</div>
		<div class="container forms">
			<EmployeeInfoForm
				:class="{ show: selectedTab === 'employee' }"
				key="employee"
				@next="selectedTab = 'laptop'"
			/>

			<ComputerInfoForm
				:class="{ show: selectedTab === 'laptop' }"
				key="laptop"
			/>
		</div>
		<img class="footer-logo" src="@/assets/imgs/LOGO.png" alt="logo" />
	</div>
</template>

<script>
	import { ref } from 'vue';
	import ComputerInfoForm from '../components/Forms/ComputerInfoForm.vue';
	import EmployeeInfoForm from '../components/Forms/EmployeeInfoForm.vue';
	export default {
		components: { EmployeeInfoForm, ComputerInfoForm },
		setup() {
			const selectedTab = ref('employee');
			return {
				selectedTab,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.new-employee {
		.back {
			display: flex;
			padding: 50px;
		}
		&__tabs {
			display: flex;
			justify-content: center;
			margin-bottom: 60px;

			h3 {
				position: relative;
				&:first-child {
					margin-right: 40px;
				}
				&::after {
					content: '';
					position: absolute;
					bottom: -10px;
					left: 50%;
					width: 80%;
					height: 2px;
					background-color: #000000;
					transform: translate(-50%, 0%) scaleX(0);
					transition: 0.2s ease;
				}
				&.active {
					&::after {
						transform: translate(-50%, 0%) scaleX(1);
					}
				}
			}
		}
		.footer-logo {
			margin: 55px 0;
		}
		.forms {
			> div {
				display: none;
				&.show {
					display: block;
				}
			}
		}
	}
</style>
