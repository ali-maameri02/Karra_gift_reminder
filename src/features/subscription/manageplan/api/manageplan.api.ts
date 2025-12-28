import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { ManagePlanRequest } from "../model/types";

export const managePlan = (
  payload: ManagePlanRequest
) => {
  return http.post(
    ENDPOINTS.subscriptions.managePlan,
    payload
  );
};
