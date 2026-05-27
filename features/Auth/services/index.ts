import { api, handleRequest } from '@/services/http';
import {
  AuthResponse,
  ChangePasswordResponse,
  NewPasswordResponse,
  RecoverPasswordResponse,
  User,
} from '../types';
import { RegisterSchemaType } from '../Register/Register.schema';
import { LoginSchemaType } from '../Login/login.schema';
import { UpdateSchemaType } from '../Update/Update.schema';
import { RecoverPasswordSchemaType } from '../RecoverPassword/recoverPassword.schema';
import { NewPasswordSchemaType } from '../NewPassword/newPassword.schema';
import { ChangePasswordSchemaType } from '../ChangePassword/changePassword.schema';

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

export const updateRecoverPassword = (
  payload: RecoverPasswordSchemaType
): Promise<RecoverPasswordResponse> =>
  handleRequest(api.post('/partner/user/password-recovery', payload));

export const updateNewPassword = (
  payload: NewPasswordSchemaType
): Promise<NewPasswordResponse> =>
  handleRequest(api.post('/partner/user/password-recovery-confirm', payload));

export const updateChangePassword = (
  payload: ChangePasswordSchemaType
): Promise<ChangePasswordResponse> =>
  handleRequest(api.post('/partner/user/change-password', payload));
