export interface VendorUpdateOrderStatusRequest {
  vendorId: string;
  orderId: string;
  status: string;
  notes?: string;
}
