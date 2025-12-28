export interface CreateVendorRequest {
  userId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}
