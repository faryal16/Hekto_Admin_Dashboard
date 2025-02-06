import { client } from "./client";

export const getMyOrders = async () => {
//   if (!username) {
//     throw new Error("Username is required");
//   }

  const MY_ORDERS_QUERY = `*[_type == "order" ] | order(orderDate desc){
    ..., products[] {
      ..., product->
    }
  }`;

  try {
    const orders = await client.fetch(MY_ORDERS_QUERY, );
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
