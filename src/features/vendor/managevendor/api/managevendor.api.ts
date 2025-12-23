import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { VendorUpdateOrderStatusRequest } from "../model/types";

export const vendorUpdateOrderStatus = ({
  vendorId,
  orderId,
  status,
  notes,
}: VendorUpdateOrderStatusRequest) => {
  return http.put(
    ENDPOINTS.vendors.updateOrderStatus(
      vendorId,
      orderId
    ),
    { status, notes }
  );
};
