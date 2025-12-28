import { useMutation } from "@tanstack/react-query";
import { assignDelivery } from "../api/assigndelivery.api";
import type { AssignDeliveryRequest } from "./types";

export const useAssignDeliveryMutation = () => {
  return useMutation({
    mutationFn: (payload: AssignDeliveryRequest) =>
      assignDelivery(payload),
  });
};
