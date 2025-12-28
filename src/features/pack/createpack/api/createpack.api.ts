import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { CreatePackRequest } from "../model/types";

export const createPack = (
  payload: CreatePackRequest
) => {
  return http.post(ENDPOINTS.packs.base, payload);
};
