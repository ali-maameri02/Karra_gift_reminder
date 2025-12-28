import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { CreateClientRequest } from "../model/types";

export const createClient = (payload: CreateClientRequest) => {
  return http.post(ENDPOINTS.clients.base, payload);
};
