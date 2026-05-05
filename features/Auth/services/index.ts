import { api, handleRequest } from '@/services/http';
import { AuthResponse, User } from '../types';
import { RegisterSchemaType } from '../Register/Register.schema';
import { LoginSchemaType } from '../Login/login.schema';
import { UpdateSchemaType } from '../Update/Update.schema';

export const createUser = (
  payload: RegisterSchemaType
): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/signup', payload));

export const loginUser = (payload: LoginSchemaType): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/signin', payload));

export const updateUser = (payload: UpdateSchemaType): Promise<AuthResponse> =>
  handleRequest(api.post('/partner/user/update', payload));

export const meUser = (): Promise<User> =>
  handleRequest(api.get('/partner/user/me'));
