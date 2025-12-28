import { useQuery } from "@tanstack/react-query";
import {
  getOrders,
  getOrderById,
  trackOrder,
} from "../api/order.api";

export const useOrdersQuery = (params?: {
  userId?: string;
  vendorId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });

export const useOrderQuery = (orderId: string) =>
  useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });

export const useTrackOrderQuery = (orderId: string) =>
  useQuery({
    queryKey: ["order-track", orderId],
    queryFn: () => trackOrder(orderId),
    enabled: !!orderId,
  });
