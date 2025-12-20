import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { ForgotPasswordRequest } from "../model/types";

export const forgotPassword = (payload: ForgotPasswordRequest) => {
  return http.post(ENDPOINTS.users.forgotPassword, payload);
};
