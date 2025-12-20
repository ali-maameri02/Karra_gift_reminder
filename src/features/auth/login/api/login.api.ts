import { http } from "@/shared/api/http";
import { LoginRequest } from "../model/types";
import { ENDPOINTS } from "@/shared/api/endpoints";



export const login = (payload: LoginRequest) => {
    return http.post(ENDPOINTS.users.login,payload);
}