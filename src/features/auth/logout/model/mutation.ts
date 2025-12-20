import { useMutation } from "@tanstack/react-query";
import {
  logout,
  logoutAll,
  logoutOthers,
} from "../api/logout.api";
import type {
  LogoutRequest,
  LogoutAllRequest,
  LogoutOthersRequest,
} from "./types";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: (payload: LogoutRequest) => logout(payload),
  });
};

export const useLogoutAllMutation = () => {
  return useMutation({
    mutationFn: (payload: LogoutAllRequest) => logoutAll(payload),
  });
};

export const useLogoutOthersMutation = () => {
  return useMutation({
    mutationFn: (payload: LogoutOthersRequest) =>
      logoutOthers(payload),
  });
};
