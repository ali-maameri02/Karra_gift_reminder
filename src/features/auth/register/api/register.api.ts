import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { RegisterRequest, RegisterResponse } from "../model/types";

export const register = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
    console.log("API REGISTER PAYLOAD:", payload);
  const response = await http.post<RegisterResponse>(
    ENDPOINTS.users.register,
    payload
  );

  return response.data;
};
