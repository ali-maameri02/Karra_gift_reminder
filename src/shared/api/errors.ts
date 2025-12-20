import { AxiosError } from "axios";

export interface ApiError {
  status: number;
  message: string;
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError && error.response) {
    return {
      status: error.response.status,
      message:
        (error.response.data as any)?.message ||
        "Something went wrong",
    };
  }

  return {
    status: 500,
    message: "Unexpected error",
  };
};
