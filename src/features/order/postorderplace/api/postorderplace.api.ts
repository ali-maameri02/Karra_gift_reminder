import { http } from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { PostOrderRequest } from "../model/types";
// import { CreateOrderRequest } from "../../createorder/model/types";

export const placeOrder = (payload: PostOrderRequest) => {
  return http.post(ENDPOINTS.orders.place, payload);
};
