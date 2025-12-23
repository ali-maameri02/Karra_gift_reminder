import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { CreateOrderRequest } from "../model/types";

export const createOrder = (
  payload: CreateOrderRequest
) => {
  return http.post(ENDPOINTS.orders.base, payload);
};
