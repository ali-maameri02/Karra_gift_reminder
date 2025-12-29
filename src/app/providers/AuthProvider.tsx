'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLoginMutation } from '@/features/auth/login/model/mutation';
import type { LoginRequest } from '@/features/auth/login/model/types';
import { useAuthStore } from '../store/auth.store';

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: 'admin' | 'vendor' | 'delivery' | null;
  login: (payload: LoginRequest) => Promise<void>;
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
  const { mutateAsync, isPending, error } = useLoginMutation();
  const { isAuthenticated, role, setAuth, logout } = useAuthStore();

  const login = async (payload: LoginRequest) => {
    const data = await mutateAsync(payload);
    setAuth(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole: role,
        login,
        logout,
        isLoading: isPending,
        error: error ? String(error) : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
