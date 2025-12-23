import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../api/postorderplace.api";
import { PostOrderRequest } from "./types";

export const usePlaceOrderMutation = () => {
  return useMutation({
    mutationFn: (payload: PostOrderRequest) =>
          placeOrder(payload),
  });
};
