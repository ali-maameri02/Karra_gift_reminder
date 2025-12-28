import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getNotifications = (params?: {
  clientId?: string;
  vendorId?: string;
  deliveryId?: string;
  orderId?: string;
  isRead?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.notifications.base, {
    params,
  });
};
