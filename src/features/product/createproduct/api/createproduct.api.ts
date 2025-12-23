import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { CreateProductRequest } from "../model/types";

export const createProduct = (
  payload: CreateProductRequest
) => {
  return http.post(ENDPOINTS.products.base, payload);
};
