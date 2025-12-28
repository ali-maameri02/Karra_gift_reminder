import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
} from "../api/product.api";

export const useProductsQuery = (params?: {
  categoryId?: string;
  vendorId?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });

export const useProductQuery = (productId: string) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
