import axios from 'axios';
import config from '../config/config';

const apiClient = axios.create({
    baseURL: config.baseURL,
});

apiClient.interceptors.request.use((req) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export function apimanUrl(path) {
    return `/apiman-gateway/default${path}?apikey=${config.apikey}`;
}

export default apiClient;
