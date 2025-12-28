import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

/**
 * Get packs list
 */
export const getPacks = (params?: {
  vendorId?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(ENDPOINTS.packs.base, {
    params,
  });
};

/**
 * Get pack by id
 */
export const getPackById = (packId: string) => {
  return http.get(ENDPOINTS.packs.byId(packId));
};
