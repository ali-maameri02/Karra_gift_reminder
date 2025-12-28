export interface PostOrderItem {
  packId: string;
  quantity: number;
}

export interface PostOrderRequest {
  userId: string;
  recipientId: string;
  vendorId: string;
  letter?: string;
  scheduledDelivery: string;
  items: PostOrderItem[];
}
