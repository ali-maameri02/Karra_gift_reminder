import { useMutation } from "@tanstack/react-query";
import { managePlan } from "../api/manageplan.api";
import type { ManagePlanRequest } from "./types";

export const useManagePlanMutation = () => {
  return useMutation({
    mutationFn: (payload: ManagePlanRequest) =>
      managePlan(payload),
  });
};
