import { create } from 'zustand';
import { UserInterface } from '@/types/common/user.types';
import * as authApi from '@/services/api/auth.api';

type AuthStates = {
  user: UserInterface | null;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
};

type AuthActions = {
  checkAuth: () => void;
};

export const useAuthStore = create<AuthStates & AuthActions>((set) => ({
  user: null,
  isCheckingAuth: true,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const response = await authApi.checkAuth();
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
