// useFetchOrder.ts
import { graphqlClient } from "@/config/graphql-client";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($orderId: String!) {
    order(id: $orderId) {
      id
      packageDescription
      customer
      courier
      distance
      status
      price
      blockHeight
    }
  }
`;

const fetchOrderDetails = async (orderId: string) => {
  const data: any = await graphqlClient.request(GET_ORDER_DETAILS, { orderId });
  return data.order;
};

const useFetchOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderDetails(orderId),
  });
};

export default useFetchOrder;
