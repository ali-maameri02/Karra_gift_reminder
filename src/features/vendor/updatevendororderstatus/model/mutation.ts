import { useMutation } from "@tanstack/react-query";
import { vendorUpdateOrderStatus } from "../api/updatevendororderstatus.api";
import type { VendorUpdateOrderStatusRequest } from "./types";

export const useVendorUpdateOrderStatusMutation =
  () => {
    return useMutation({
      mutationFn: (
        payload: VendorUpdateOrderStatusRequest
      ) => vendorUpdateOrderStatus(payload),
    });
  };
