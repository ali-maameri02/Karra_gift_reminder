import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { ChangePasswordRequest } from "../model/types";

export const changePassword = (
  userId: string,
  payload: ChangePasswordRequest
) => {
  return http.put(ENDPOINTS.users.changePassword(userId), payload);
};
