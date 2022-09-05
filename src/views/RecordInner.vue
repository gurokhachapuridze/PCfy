<template>
	<div class="record-inner">
		<router-link to="/records" class="back pointer">
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
		<div class="records__title">ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</div>
		<div class="container">
			<div class="grid grid-col-2 grid-gap-60 border-bottom">
				<img class="picture__png" 			:src="'https://pcfy.redberryinternship.ge' + laptopData.image"
 :alt="laptopData.name" />
				<div class="text-row-cont">
					<div class="flex" v-for="data in userInfo" :key="data.title">
						<p>{{data.title}}:</p> 
						<p>{{data.value}}</p> 
					</div>
				</div>
			</div>
			<div class="grid border-bottom">
				<div class="grid grid-col-2 grid-gap-60">
					<div class="text-row-cont">
						<div class="flex" v-for="data in laptopInfo.row1" :key="data.title">
							<p>{{data.title}}:</p> 
							<p>{{data.value}}</p> 
						</div>
					</div>
					<div class="text-row-cont">

						<div class="flex text-row-cont" v-for="data in laptopInfo.row2" :key="data.title">
						<p>{{data.title}}:</p> 
						<p>{{data.value}}</p> 
						</div>
					</div>
				</div>
			</div>
			<div class="grid">
				<div class="grid grid-col-2 grid-gap-60">
					<div class="text-row-cont">
						<div class="flex" v-for="data in laptopInfo.row3" :key="data.title">
							<p>{{data.title}}:</p> 
							<p>{{data.value}}</p> 
						</div>
					</div>
					<div class="text-row-cont">

						<div class="flex text-row-cont" v-for="data in laptopInfo.row4" :key="data.title">
						<p>{{data.title}}:</p> 
						<p>{{data.value}}</p> 
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { computed, onMounted } from 'vue';
	import { useStore } from '@/store';
	import { useRoute } from 'vue-router';	

	export default {
		setup() {
			const store = useStore();
			const route = useRoute();
			const positions = computed(() => store.positions);
			const teams = computed(() => store.teams);
			const brands = computed(() => store.brands);


			const userData = computed(() => store.laptopInner.user);
			const laptopData = computed(() => store.laptopInner.laptop);

			const getPositionWithId = (id) => {
				const position = positions.value.find(position => position.id === id);
				return position && position.name;
			};
			const getTeamWithId = (id) => {
				const team = teams.value.find( team => team.id === id);
				return team && team.name;
			};
			const getBrandWithId = (id) => {
				const brand = brands.value.find( brand => brand.id === id);
				return brand && brand.name;
			};
			const userInfo = computed(() => ([
				{
					title: 'სახელი',
					value: `${userData.value.name} ${userData.value.surname}`
				},
				{
					title: 'თიმი',
					value: getTeamWithId(userData.value.team_id)
				},
				{
					title: 'პოზიცია',
					value: getPositionWithId(userData.value.position_id)
				}
			]));

			const laptopInfo = computed(() => (
				{
				row1: [
						{
						title: 'ლეპტოპის სახელი',
						value: laptopData.value.name
					},
					{
						title: 'ლეპტოპის ბრენდი',
						value: getBrandWithId(laptopData.value.brand_id)
					},
					{
						title: 'RAM',
						value: laptopData.value.ram
					},
					{
						title: 'მეხსიერების ტიპი',
						value: laptopData.value.hard_drive_type
					},
				],
				row2: [
						{
						title: 'CPU',
						value: laptopData.value.cpu && laptopData.value.cpu.name
					},
					{
						title: 'CPU-ს ბირთვი',
						value: laptopData.value.cpu && laptopData.value.cpu.cores
					},
					{
						title: 'CPU-ს ნაკადი',
						value: laptopData.value.cpu && laptopData.value.cpu.threads
					},
				],
				row3: [
								{
						title: 'ლეპტოპის მდგომარეობა',
						value: laptopData.value.state
					},
					{
						title: 'ლეპტოპის ფასი',
						value: laptopData.value.price
					},
				]	,
				row4: [
					{
						title: 'შეძენის რიცხვი',
						value: laptopData.value.purchase_date
					},
				]
				}
			));

			store.getPositions();
			store.getTeams();
			store.getBrands();

			onMounted(() => store.getLaptopInner(route.params.id));


			return {
				userInfo,
				userData,
				laptopInfo,
				laptopData
			};
		},
	};
</script>

<style lang="scss" scoped>
	.record-inner {
		.back {
			display: flex;
			position: absolute;
			left: 50px;
			top: 50px;
		}

		.grid-col-2 {
			@media (max-width: 1280px) {
				grid-template-columns: 1fr;

			}
		}
		.records__title {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 97px;
			margin-top: 79px;
			color: #000000;
			font-style: normal;
			font-weight: 700;
			font-size: 34px;
			line-height: 21px;
		}
		img {
			width: 577px;
			height: 342px;
		}
		.border-bottom {
			border-bottom: 1px solid #A5A5A5;
			padding-bottom: 84px;
			margin-bottom: 84px;
		}
		.text-row-cont {
				p {
					width: 280px;
					text-align: left;
					font-weight: 400;
					font-size: 22px;
					line-height: 27px;
					color: #797979;
					&:first-child {
						margin-right: 15px;
						font-weight: 500;
						color: #2E2E2E;
					}
				}

		}
		.flex {
			display: flex;
			align-items: center;
			margin-bottom: 30px;
		}
	}
</style>
