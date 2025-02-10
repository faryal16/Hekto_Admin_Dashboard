"use client";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import PriceFormatter from "./PriceFormatter";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { MY_ORDERS_QUERYResult } from "@/sanity.types";

const OrdersComponent = ({ orders: initialOrders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<MY_ORDERS_QUERYResult[number] | null>(null);

  // Function to open order details
  const handleOrderClick = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };

  // Function to delete an order
  const handleDeleteOrder = async (orderId: string) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085D6",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await client.delete(orderId); // Delete from Sanity
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId)); // Update UI

      Swal.fire("Deleted!", "The order has been deleted.", "success");
    } catch  {
      Swal.fire("Error!", "Failed to delete the order.", "error");
    }
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order._id}>
              <TooltipTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-gray-100 h-12">
                  <TableCell className="font-medium" onClick={() => handleOrderClick(order)}>
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate && new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell onClick={() => handleOrderClick(order)}>{order.customerName}</TableCell>
                  <TableCell className="hidden sm:table-cell" onClick={() => handleOrderClick(order)}>
                    {order.email}
                  </TableCell>
                  <TableCell onClick={() => handleOrderClick(order)}>
                    <PriceFormatter amount={order?.totalPrice} className="text-black font-medium" />
                  </TableCell>
                  <TableCell onClick={() => handleOrderClick(order)}>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-base font-semibold ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>
                  {/* Delete Button */}
                  <TableCell>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOrder(order._id);
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white rounded-[8px] p-2">
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>

      {/* Order Details Dialog */}
      <OrderDetailsDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrdersComponent;
