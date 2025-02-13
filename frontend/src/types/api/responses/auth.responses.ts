// Type definitions for responses related to authentication
import { UserInterface } from '@/types/common/user.types';
export interface RegisterResponseData {
  user: UserInterface;
}
export interface LoginResponseData {
  accessToken: string;
  user: UserInterface;
}

export interface CheckAuthResponseData {
  user: UserInterface;
}

export interface RefreshTokenResponseData {
  accessToken: string;
}
