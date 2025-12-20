import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { ResetPasswordRequest } from "../model/types";

export const resetPassword = (payload: ResetPasswordRequest) => {
  return http.post(ENDPOINTS.users.resetPassword, payload);
};
