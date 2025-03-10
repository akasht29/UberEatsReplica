import React from "react";
import OrderCard from "../components/OrderCard";

const ordersData = [
  {
    id: 1,
    customer: { id: 101, name: "John Doe", image: "" },
    orders: ["burger", "fries", "smoothie"],
    status: "New",
    deliveryStatus: "Preparing",
  },
  {
    id: 2,
    customer: { id: 102, name: "Jane Smith", image: "" },
    orders: ["pizza", "sprite"],
    status: "Delivered",
    deliveryStatus: "Delivered",
  },
];

const Orders = () => {
  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      {ordersData.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
};

export default Orders;
