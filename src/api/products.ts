import axios from 'axios';
import { IProductProps } from '../components/ProductList/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const productApi = {
    getAll: async () => axios.get<IProductProps[]>(`${API_BASE}/products`),
    getById: async (id: number) => axios.get<IProductProps>(`${API_BASE}/products?id=${id}`),
    create: async (product: Omit<IProductProps, 'id'>) => axios.post<IProductProps>(`${API_BASE}/products`, product),
    update: async (id: number, product: IProductProps) => axios.put<IProductProps>(`${API_BASE}/products/${id}`, product),
    delete: async (id: number) => axios.delete<void>(`${API_BASE}/products/${id}`)
};