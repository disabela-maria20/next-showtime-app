import { api, handleRequest } from '@/services/http';
import { SignUpRequest } from '../types';

export const createUser = (payload: SignUpRequest) =>
  handleRequest(api.post('/partner/user/signup', payload));
