import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/main.scss';
'./assets/css/font.css';
import { createPinia } from 'pinia';
const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('#app');
