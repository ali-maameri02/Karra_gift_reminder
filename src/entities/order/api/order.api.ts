import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * Get orders list
 */
export const getOrders = (params?: {
  userId?: string;
  vendorId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.orders.base, {
    params,
  });
};

/**
 * Get order by id
 */
export const getOrderById = (orderId: string) => {
  return http.get(ENDPOINTS.orders.byId(orderId));
};

/**
 * Track order
 */
export const trackOrder = (orderId: string) => {
  return http.get(ENDPOINTS.orders.track(orderId));
};
