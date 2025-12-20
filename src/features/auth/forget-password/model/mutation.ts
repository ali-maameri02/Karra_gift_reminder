import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forget-password.api";
import type { ForgotPasswordRequest } from "./types";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) =>
      forgotPassword(payload),
  });
};
