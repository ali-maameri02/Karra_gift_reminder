import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { LoginRequest, LoginResponse } from "../model/types";

export const login = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
    console.log("API LOGIN PAYLOAD:", payload);
  const response = await http.post<LoginResponse>(
    ENDPOINTS.users.login,
    {email: payload.email, password: payload.password, deviceInfo:"string"} // we will change it after fix it ofc
  );

  return response.data;
};
