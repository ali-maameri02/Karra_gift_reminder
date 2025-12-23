export interface CreateOrderItem {
  packId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  recipientId: string;
  vendorId: string;
  letter?: string;
  scheduledDelivery: string;
  items: CreateOrderItem[];
}
