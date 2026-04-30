import { api, handleRequest } from '@/services/http';
import { AuthResponse } from '../types';
import { RegisterSchemaType } from '../Register/Register.schema';
import { LoginSchemaType } from '../Login/login.schema';

export const createUser = (
  payload: RegisterSchemaType
): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/signup', payload));

export const loginUser = (payload: LoginSchemaType): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/signin', payload));
