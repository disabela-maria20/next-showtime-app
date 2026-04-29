import { api, handleRequest } from '@/services/http';
import { AuthResponse, SignUpRequest } from '../types';
import { RegisterSchemaType } from '../Register/Register.schema';
import { useAuthStore } from '@/store/authStore';

export const createUser = (
  payload: RegisterSchemaType
): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/signup', payload));

export async function refreshSession() {
  try {
    const { data } = await api.get('/partner/user/me');

    // ⚠️ ajuste dependendo do retorno da sua API
    const user = data.user ?? data;
    const token = data.token ?? null;

    if (!user) throw new Error('No user returned');

    useAuthStore.getState().login(user, token);

    return user;
  } catch (error) {
    useAuthStore.getState().logout();
    throw error;
  }
}
