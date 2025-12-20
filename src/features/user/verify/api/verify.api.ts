import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { VerifyUserRequest } from "../model/types";

export const verifyUser = (
  userId: string,
  payload: VerifyUserRequest
) => {
  return http.post(ENDPOINTS.users.verify(userId), payload);
};
