import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/update-profile.api";
import type { UpdateProfileRequest } from "./types";

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      updateProfile(payload.userId, payload),
  });
};
