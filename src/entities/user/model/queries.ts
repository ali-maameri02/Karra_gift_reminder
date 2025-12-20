import { useQuery } from "@tanstack/react-query";
import {
  getUserById,
  getUserProfile,
  getUserSessions,
} from "../api/user.api";

export const useUserQuery = (userId: string) =>
  useQuery({
    queryKey:["user",userId],
    queryFn:() => getUserById(userId),
  })

export const useUserProfileQuery = (userId: string) =>
  useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId),
  });

export const useUserSessionsQuery = (userId: string) =>
  useQuery({
    queryKey: ["user-sessions", userId],
    queryFn: () => getUserSessions(userId),
  });
