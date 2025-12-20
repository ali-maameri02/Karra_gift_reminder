import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/reset-password.api";
import type { ResetPasswordRequest } from "./types";

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      resetPassword(payload),
  });
};
