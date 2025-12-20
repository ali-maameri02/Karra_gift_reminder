import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type {
  LogoutRequest,
  LogoutAllRequest,
  LogoutOthersRequest,
} from "../model/types";

export const logout = (payload: LogoutRequest) => {
  return http.post(ENDPOINTS.users.logout, payload);
};

export const logoutAll = ({ userId }: LogoutAllRequest) => {
  return http.post(ENDPOINTS.users.logoutAll(userId));
};

export const logoutOthers = (payload: LogoutOthersRequest) => {
  return http.post(ENDPOINTS.users.logoutOthers(payload.userId), payload);
};
