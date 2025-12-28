import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { UpdateStockRequest } from "../model/types";

export const updateProductStock = (
  productId: string,
  payload: UpdateStockRequest
) => {
  return http.patch(
    ENDPOINTS.products.stock(productId),
    payload
  );
};
