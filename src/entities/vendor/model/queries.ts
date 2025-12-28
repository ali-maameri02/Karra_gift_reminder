import { useQuery } from "@tanstack/react-query";
import {
  getVendors,
  getVendorById,
  getVendorOrders,
} from "../api/vendor.api";

export const useVendorsQuery = (params?: {
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["vendors", params],
    queryFn: () => getVendors(params),
  });

export const useVendorQuery = (vendorId: string) =>
  useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: () => getVendorById(vendorId),
    enabled: !!vendorId,
  });

export const useVendorOrdersQuery = (
  vendorId: string,
  params?: {
    status?: string;
    page?: number;
    pageSize?: number;
  }
) =>
  useQuery({
    queryKey: ["vendor-orders", vendorId, params],
    queryFn: () =>
      getVendorOrders(vendorId, params),
    enabled: !!vendorId,
  });
