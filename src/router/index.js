import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/newrecord',
		name: 'NewRecord',
		component: function () {
			return import(/* webpackChunkName: "about" */ '../views/NewRecord.vue');
		},
	},
	{
		path: '/records',
		name: 'Records',
		component: function () {
			return import(/* webpackChunkName: "about" */ '../views/Records.vue');
		},
	},
	{
		path: '/records/:id',
		name: 'RecordInner',
		component: function () {
			return import(/* webpackChunkName: "about" */ '../views/RecordInner.vue');
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
