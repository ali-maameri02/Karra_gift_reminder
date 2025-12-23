import { useMutation } from "@tanstack/react-query";
import { addRecipient } from "../api/addrecipient.api";
import type { AddRecipientRequest } from "./types";

export const useAddRecipientMutation = () => {
  return useMutation({
    mutationFn: (payload: AddRecipientRequest) =>
      addRecipient(payload.clientId, payload),
  });
};
