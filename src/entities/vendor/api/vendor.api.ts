import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getVendors = (params?: {
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.vendors.base, {
    params,
  });
};

export const getVendorById = (vendorId: string) => {
  return http.get(
    ENDPOINTS.vendors.byId(vendorId)
  );
};

export const getVendorOrders = (
  vendorId: string,
  params?: {
    status?: string;
    page?: number;
    pageSize?: number;
  }
) => {
  return http.get(
    ENDPOINTS.vendors.orders(vendorId),
    { params }
  );
};
