import { useQuery } from "@tanstack/react-query";
import {
  getDeliveries,
  getDeliveryTracking,
} from "../api/delivery.api";

export const useDeliveriesQuery = (params: {
  status: string;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["deliveries", params],
    queryFn: () => getDeliveries(params),
  });

export const useDeliveryTrackingQuery = (
  deliveryId: string
) =>
  useQuery({
    queryKey: ["delivery-tracking", deliveryId],
    queryFn: () => getDeliveryTracking(deliveryId),
    enabled: !!deliveryId,
  });
