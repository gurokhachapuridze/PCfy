import api from '@/api/axios';
import { defineStore } from 'pinia';

// You can name the return value of `defineStore()` anything you want, but it's best to use the name of the store and surround it with `use` and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
	state: () => ({
		teams: [],
		brands: [],
		cpus: [],
		positions: [],
		laptops: [],
		laptopInner: {
			user: [],
			laptop: []
		},
		employeeData: null,
	}),
	actions: {
		async getTeams() {
			const { data } = await api.get('/teams');
			this.teams = data.data;
		},
		async getBrands() {
			const { data } = await api.get('/brands');
			this.brands = data.data;
		},
		async getCpus() {
			const { data } = await api.get('/cpus');
			this.cpus = data.data;
		},
		async getPositions() {
			const { data } = await api.get('/positions');
			this.positions = data.data;
		},
		async getLaptops() {
			const token = '4ba011fac0edd5b21e10e925386b20bf';

			const { data } = await api.get('/laptops', {
				params: {
					token,
				},
			});
			this.laptops = data.data;
		},
		async getLaptopInner(laptop_id) {
			const token = '4ba011fac0edd5b21e10e925386b20bf';

			const { data } = await api.get(`/laptop/${laptop_id}`, {
				params: {
					token,
					id: laptop_id
				},
			});
			this.laptopInner = data.data;
		},
		async createLaptop(payload) {
			payload.token = '4ba011fac0edd5b21e10e925386b20bf';
			payload.phone_number = '+995' + payload.phone_number;
			const formData = new FormData();
			Object.entries(payload).forEach(([key, value]) => {
				formData.append(key, value);
			});
			const data = await api.post('/laptop/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return data;
		},
	},
	// other options...
});
