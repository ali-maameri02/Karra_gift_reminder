import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { CreateVendorRequest } from "../model/types";

export const createVendor = (
  payload: CreateVendorRequest
) => {
  return http.post(
    ENDPOINTS.vendors.base,
    payload
  );
};
