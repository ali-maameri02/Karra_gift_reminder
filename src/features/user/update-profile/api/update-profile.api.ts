import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { UpdateProfileRequest } from "../model/types";

export const updateProfile = (
  userId: string,
  payload: UpdateProfileRequest
) => {
  return http.put(ENDPOINTS.users.profile.update(userId), payload);
};
