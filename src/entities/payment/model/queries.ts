import { useQuery } from "@tanstack/react-query";
import {
  getPayments,
  getPaymentById,
} from "../api/payment.api";

export const usePaymentsQuery = (params?: {
  orderId?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["payments", params],
    queryFn: () => getPayments(params),
  });

export const usePaymentQuery = (paymentId: string) =>
  useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPaymentById(paymentId),
    enabled: !!paymentId,
  });
