import { useMutation } from "@tanstack/react-query";
import { verifyUser } from "../api/verify.api";
import type { VerifyUserRequest } from "./types";

export const useVerifyUserMutation = () => {
  return useMutation({
    mutationFn: (payload: VerifyUserRequest) =>
      verifyUser(payload.userId, payload),
  });
};
