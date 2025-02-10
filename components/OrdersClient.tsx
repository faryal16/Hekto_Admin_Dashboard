"use client";

import { Order } from "@/sanity.types";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { useState } from "react";

const OrdersClient = ({ orders: initialOrders }: { orders: Order[] }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

      Swal.fire("Deleted", "Your order has been deleted successfully!", "success");
    } catch  {
      Swal.fire("Error", "Failed to delete order!", "error");
    }
  };

  return (
    <>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.orderDate}</td>
          <td>{order.customerName}</td>
          <td>{order.email}</td>
          <td>{order.totalPrice}</td>
          <td>{order.status}</td>
          <td>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(order._id);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrdersClient;
