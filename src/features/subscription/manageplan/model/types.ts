export interface ManagePlanRequest {
  managePlanRequest: {
    adminId: string;
    name: {
      value: string;
    };
    description?: string;
    price: number;
    durationInMonths: number;
    maxRecipients: number;
    action: number; // enum on backend
    planId?: string;
  };
}
