import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getDeliveries = (params: {
  status: string;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.deliveries.base, {
    params,
  });
};

export const getDeliveryTracking = (
  deliveryId: string
) => {
  return http.get(
    ENDPOINTS.deliveries.tracking(deliveryId)
  );
};
