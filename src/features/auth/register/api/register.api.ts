import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { RegisterRequest } from "../model/types";

export const register = (payload: RegisterRequest) => {
  return http.post(ENDPOINTS.users.register, payload);
};
