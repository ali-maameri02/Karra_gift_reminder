import { useMutation } from "@tanstack/react-query";
import { updateProductStock } from "../api/updatestock.api";
import type { UpdateStockRequest } from "./types";

export const useUpdateProductStockMutation = () => {
  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateStockRequest;
    }) => updateProductStock(productId, data),
  });
};
