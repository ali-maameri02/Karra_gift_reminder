import { useMutation } from "@tanstack/react-query";
import { createVendor } from "../api/createvendor.api";
import type { CreateVendorRequest } from "./types";

export const useCreateVendorMutation = () => {
  return useMutation({
    mutationFn: (payload: CreateVendorRequest) =>
      createVendor(payload),
  });
};
