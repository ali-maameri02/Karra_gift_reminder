import { useQuery } from "@tanstack/react-query";
import {
  getPlans,
  getSubscriptionById,
  getSubscriptions,
  getUserSubscription,
} from "../api/subscription.api";

export const usePlansQuery = () =>
  useQuery({
    queryKey: ["subscription-plans"],
    queryFn: getPlans,
  });

export const useSubscriptionQuery = (
  subscriptionId: string
) =>
  useQuery({
    queryKey: ["subscription", subscriptionId],
    queryFn: () =>
      getSubscriptionById(subscriptionId),
    enabled: !!subscriptionId,
  });

export const useSubscriptionsQuery = (
  params?: {
    isActive?: boolean;
    page?: number;
    pageSize?: number;
  }
) =>
  useQuery({
    queryKey: ["subscriptions", params],
    queryFn: () =>
      getSubscriptions(params),
  });

export const useUserSubscriptionQuery = (
  userId: string
) =>
  useQuery({
    queryKey: ["user-subscription", userId],
    queryFn: () =>
      getUserSubscription(userId),
    enabled: !!userId,
  });
