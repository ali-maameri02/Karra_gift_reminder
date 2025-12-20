import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login.api";
import type { LoginRequest } from "./types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
  });
};