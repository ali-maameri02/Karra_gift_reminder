import { useMutation } from "@tanstack/react-query";
import { createClient } from "../api/createclient.api";
import type { CreateClientRequest } from "./types";

export const useCreateClientMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateClientRequest) =>
      createClient(payload),
  });
};
