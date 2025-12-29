'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLoginMutation } from '@/features/auth/login/model/mutation';
import type { LoginRequest } from '@/features/auth/login/model/types';
import { useAuthStore } from '../store/auth.store';
import { RegisterRequest } from '@/features/auth/register/model/types';
import { useRegisterMutation } from '@/features/auth/register/model/mutation';
// import { getRoleFromToken } from '@/shared/lib/jwt';

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: 'admin' | 'vendor' | 'delivery' | null;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const { isAuthenticated, role, setAuth, logout } = useAuthStore();

  const login = async (payload: LoginRequest) => {
  const data = await loginMutation.mutateAsync(payload);

  // const role = getRoleFromToken(data.accessToken);

  setAuth({
    token: data.accessToken,
    role: "admin",
    user: {
      id: data.userId,
      email: data.email,
    },
  });
};
  const register = async (payload: RegisterRequest) => {
    await registerMutation.mutateAsync(payload);
    // setAuth(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole: role,
        login,
        register,
        logout,
        isLoading: loginMutation.isPending || registerMutation.isPending,
        error: loginMutation.error ? String(loginMutation.error) : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
