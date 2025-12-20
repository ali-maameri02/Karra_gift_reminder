import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/change-password.api";
import type { ChangePasswordRequest } from "./types";

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordRequest) =>
      changePassword(payload.userId, payload),
  });
};
