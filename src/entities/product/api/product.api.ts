import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * Get products list
 */
export const getProducts = (params?: {
  categoryId?: string;
  vendorId?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.products.base, {
    params,
  });
};

/**
 * Get product by id
 */
export const getProductById = (productId: string) => {
  return http.get(ENDPOINTS.products.byId(productId));
};
