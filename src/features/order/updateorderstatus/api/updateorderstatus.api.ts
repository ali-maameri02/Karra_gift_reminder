import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { UpdateOrderStatusRequest } from "../model/types";

export const updateOrderStatus = (
  payload: UpdateOrderStatusRequest
) => {
  return http.put(ENDPOINTS.orders.status, payload);
};
