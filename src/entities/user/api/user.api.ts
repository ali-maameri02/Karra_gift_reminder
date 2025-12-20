import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getUserById = (userId: string) => {
  return http.get(ENDPOINTS.users.getById(userId));
};

export const getUserProfile = (userId: string) => {
  return http.get(ENDPOINTS.users.profile.get(userId));
};

export const getUserSessions = (userId: string) => {
  return http.get(ENDPOINTS.users.sessions(userId));
};
