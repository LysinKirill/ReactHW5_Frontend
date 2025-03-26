import axios from 'axios';
import {ICategoryProps} from '../components/ProductList/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthConfig = () => {
    const token = localStorage.getItem('accessToken');
    return {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const categoryApi = {
    getAll: async () => axios.get<ICategoryProps[]>(`${API_BASE}/categories`, getAuthConfig()),
    create: async (category: Omit<ICategoryProps, 'id'>) =>
        axios.post<ICategoryProps>(`${API_BASE}/categories`, {
            ...category,
            allowed_groups: category.allowed_groups || ['admin']
        }, getAuthConfig()),
    update: async (id: number, category: ICategoryProps) => axios.put<ICategoryProps>(`${API_BASE}/categories/${id}`, {
        ...category,
        allowed_groups: category.allowed_groups || ['admin']
    }, getAuthConfig()),
    delete: async (id: number) => axios.delete<void>(`${API_BASE}/categories/${id}`, getAuthConfig()),
};
