import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { AddRecipientRequest } from "../model/types";

export const addRecipient = (
  clientId: string,
  payload: AddRecipientRequest
) => {
  return http.post(
    ENDPOINTS.clients.recipients.base(clientId),
    payload
  );
};
