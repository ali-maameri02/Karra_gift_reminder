import { useQuery } from "@tanstack/react-query";
import {
  getClients,
  getClientById,
  getClientRecipients,
} from "../api/client.api";

export const useClientsQuery = (params?: {
  page?: number;
  pageSize?: number;
  isActive?: boolean;
}) =>
  useQuery({
    queryKey: ["clients", params],
    queryFn: () => getClients(params),
  });

export const useClientByIdQuery = (clientId: string) =>
  useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  });

export const useClientRecipientsQuery = (clientId: string) =>
  useQuery({
    queryKey: ["client-recipients", clientId],
    queryFn: () => getClientRecipients(clientId),
    enabled: !!clientId,
  });
