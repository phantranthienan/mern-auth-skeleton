import axios from '@/services/api/axios.config';

import {
  RegisterRequestBody,
  LoginRequestBody,
} from '@/types/api/requests/auth.requests';
import {
  RegisterResponseData,
  LoginResponseData,
  CheckAuthResponseData,
} from '@/types/api/responses/auth.responses';
import { ApiResponse } from '@/types/api/responses/response.types';

export const register = async (
  registerData: RegisterRequestBody
): Promise<ApiResponse<RegisterResponseData>> => {
  const response = await axios.post<ApiResponse<RegisterResponseData>>(
    '/auth/register',
    registerData
  );
  return response.data;
};

export const login = async (
  loginData: LoginRequestBody
): Promise<ApiResponse<LoginResponseData>> => {
  const response = await axios.post<ApiResponse<LoginResponseData>>(
    '/auth/login',
    loginData
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/auth/logout');
};

export const checkAuth = async (): Promise<
  ApiResponse<CheckAuthResponseData>
> => {
  const response =
    await axios.get<ApiResponse<CheckAuthResponseData>>('/auth/check');
  return response.data;
};
