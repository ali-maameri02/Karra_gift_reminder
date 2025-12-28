import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/updateorderstatus.api";
import type { UpdateOrderStatusRequest } from "./types";

export const useUpdateOrderStatusMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateOrderStatusRequest) =>
      updateOrderStatus(payload),
  });
};
