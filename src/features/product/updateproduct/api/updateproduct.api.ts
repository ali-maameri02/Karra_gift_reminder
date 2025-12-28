import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { UpdateProductRequest } from "../model/types";

export const updateProduct = (
  productId: string,
  payload: UpdateProductRequest
) => {
  return http.put(
    ENDPOINTS.products.byId(productId),
    payload
  );
};
