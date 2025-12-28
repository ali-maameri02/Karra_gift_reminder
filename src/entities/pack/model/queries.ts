import { useQuery } from "@tanstack/react-query";
import {
  getPacks,
  getPackById,
} from "../api/pack.api";

export const usePacksQuery = (params?: {
  vendorId?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["packs", params],
    queryFn: () => getPacks(params),
  });

export const usePackQuery = (packId: string) =>
  useQuery({
    queryKey: ["pack", packId],
    queryFn: () => getPackById(packId),
    enabled: !!packId,
  });
