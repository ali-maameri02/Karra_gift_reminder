import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { AssignDeliveryRequest } from "../model/types";

export const assignDelivery = (
  payload: AssignDeliveryRequest
) => {
  return http.post(ENDPOINTS.deliveries.assign, payload);
};
