import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/createorder.api";
import type { CreateOrderRequest } from "./types";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateOrderRequest) =>
      createOrder(payload),
  });
};
