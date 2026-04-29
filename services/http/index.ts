import { refreshSession } from '@/features/Auth/services';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  },
  // withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshSession();
        useAuthStore.getState().login(data.user, data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// 🔹 helper genérico
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
