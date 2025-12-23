import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const getPlans = () => {
  return http.get(ENDPOINTS.subscriptions.plans);
};

export const getSubscriptionById = (
  subscriptionId: string
) => {
  return http.get(
    ENDPOINTS.subscriptions.byId(subscriptionId)
  );
};

export const getSubscriptions = (params?: {
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  return http.get(
    ENDPOINTS.subscriptions.all,
    { params }
  );
};

export const getUserSubscription = (
  userId: string
) => {
  return http.get(
    ENDPOINTS.subscriptions.byUser(userId)
  );
};
