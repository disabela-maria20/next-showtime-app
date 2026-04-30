import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  },
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function handleRequest<T>(
  promise: Promise<{ data: T }>
): Promise<T> {
  try {
    const { data } = await promise;
    return data;
  } catch (error: any) {
    console.error('API error:', error?.response?.data || error.message);
    throw error?.response?.data || new Error('Erro na requisição');
  }
}
