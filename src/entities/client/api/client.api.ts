import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getClients = (params?: {
  page?: number;
  pageSize?: number;
  isActive?: boolean;
}) => {
  return http.get(ENDPOINTS.clients.base, { params });
};

export const getClientById = (clientId: string) => {
  return http.get(ENDPOINTS.clients.getById(clientId));
};

export const getClientRecipients = (clientId: string) => {
  return http.get(
    ENDPOINTS.clients.recipients.base(clientId)
  );
};
