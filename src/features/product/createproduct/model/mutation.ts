import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/createproduct.api";
import type { CreateProductRequest } from "./types";

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateProductRequest) =>
      createProduct(payload),
  });
};
