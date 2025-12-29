export type Role = "admin" | "vendor" | "delivery";

export interface LoginRequest {
  email?: string;
  password?: string;
  role: Role;
}

export type LoginResponse = {
  token: string;
  role: Role;
  user?: any; // optional for now
};