import axios from 'axios';
import { authApi } from './auth';
//import { store } from '../store/store';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await authApi.refresh();
                localStorage.setItem('accessToken', response.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch({ type: 'auth/logout' });
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;