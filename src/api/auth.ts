import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const authApi = {
    login: (credentials: { username: string; password: string }) =>
        axios.post(`${API_BASE}/auth/login`, credentials, { withCredentials: true }),

    logout: () =>
        axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true }),

    refresh: () =>
        axios.post(`${API_BASE}/auth/refresh`, {}, { withCredentials: true }),

    register: (userData: {
        username: string;
        email: string;
        password: string;
    }) => axios.post(`${API_BASE}/auth/register`, userData, { withCredentials: true }),
};