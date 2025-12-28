import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api/updateproduct.api";
import type { UpdateProductRequest } from "./types";

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateProductRequest;
    }) => updateProduct(productId, data),
  });
};
