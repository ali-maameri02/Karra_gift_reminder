export type Role = "admin" | "vendor" | "delivery";

export interface LoginRequest {
  email?: string;
  password?: string;
  // role: Role;
}

export type LoginResponse = {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  // role: "admin" | "vendor" | "delivery";
};
