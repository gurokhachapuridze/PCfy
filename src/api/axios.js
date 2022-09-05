import axios from 'axios';

const baseUrl = 'https://pcfy.redberryinternship.ge/api';
axios.defaults.baseURL = baseUrl;

const api = axios.create({
	baseUrl,
});

export default api;
