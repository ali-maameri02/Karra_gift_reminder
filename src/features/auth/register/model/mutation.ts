import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register.api";
import type { RegisterRequest } from "./types";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
  });
};
