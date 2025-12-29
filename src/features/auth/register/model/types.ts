export type Role = 'admin' | 'vendor' | 'delivery';


export interface Address {
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface RegisterRequest {
  email: string;
  password: string;

  role: Role;

  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;

  address: Address;

  deviceInfo: string | null;
}


export type RegisterResponse = {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
};
