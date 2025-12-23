import { useMutation } from "@tanstack/react-query";
import { createPack } from "../api/createpack.api";
import type { CreatePackRequest } from "./types";

export const useCreatePackMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePackRequest) =>
      createPack(payload),
  });
};
