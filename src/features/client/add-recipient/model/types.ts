export interface AddRecipientRequest {
  clientId: string;

  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  specialDate?: string;
  relationshipType?: string;
}
