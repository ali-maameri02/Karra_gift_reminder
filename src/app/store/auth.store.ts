import { create } from "zustand";

type Role = "admin" | "vendor" | "delivery";

type AuthState = {
  token: string | null;
  user: any | null;
  role: Role | null;
  isAuthenticated: boolean;

  setAuth: (data: { token: string; user?: any; role: Role }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  role: null,
  isAuthenticated: false,

  setAuth: (data) =>
    set({
      token: data.token,
      user: data.user ?? null,
      role: data.role,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
      role: null,
      isAuthenticated: false,
    }),
}));
