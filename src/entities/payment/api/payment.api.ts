import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * Get payments list
 */
export const getPayments = (params?: {
  orderId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.payments.base, {
    params,
  });
};

/**
 * Get payment by id
 */
export const getPaymentById = (paymentId: string) => {
  return http.get(ENDPOINTS.payments.byId(paymentId));
};
