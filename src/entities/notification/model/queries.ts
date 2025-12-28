import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notification.api";

export const useNotificationsQuery = (params?: {
  clientId?: string;
  vendorId?: string;
  deliveryId?: string;
  orderId?: string;
  isRead?: boolean;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["notifications", params],
    queryFn: () => getNotifications(params),
  });
