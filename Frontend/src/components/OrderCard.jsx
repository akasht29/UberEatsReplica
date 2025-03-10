import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const OrderCard = ({
  orderKey,
  OrderItems,
  customer_id,
  order_status,
  delivery_status,
  onStatusChange,
}) => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [orderStatus, setOrderStatus] = useState(order_status);
  const [deliveryStatus, setDeliveryStatus] = useState(delivery_status);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/order/${orderKey}/customer/`
        );
        setCustomerInfo(response.data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchCustomerInfo();
  }, [orderKey]);

  const updateStatus = async (type, value) => {
    try {
      const endpoint = type === "order" ? "order-status" : "delivery-status";
      await axios.put(
        `http://localhost:3000/restaurant/orders/${orderKey}/${endpoint}`,
        { [`${type}_status`]: value }
      );

      if (type === "order") {
        setOrderStatus(value);
        onStatusChange(orderKey, value, "order");
      } else if (type === "delivery") {
        setDeliveryStatus(value);
      }
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          Customer ID: {customerInfo?.customer?.customer_id || "N/A"}
        </h5>
        <p className="card-text">
          Name: {customerInfo?.customer?.name || "Unknown"}
          <br />
          Email: {customerInfo?.customer?.email || "Unknown"}
        </p>

        <ul className="card-text">
          {OrderItems?.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.Dish.name} (x{item.quantity})
              </span>
              <span>${item.price?.toFixed(2) || "0.00"}</span>
            </li>
          ))}
        </ul>

        <div className="mb-2">
          <label className="fw-bold">Order Status:</label>
          <select
            className="form-select"
            value={orderStatus}
            onChange={(e) => updateStatus("order", e.target.value)}
          >
            <option value="New">New</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="fw-bold">Delivery Status:</label>
          <select
            className="form-select"
            value={deliveryStatus}
            onChange={(e) => updateStatus("delivery", e.target.value)}
          >
            <option value="Received">Order Received</option>
            <option value="Preparing">Preparing</option>
            <option value="Ontheway">On The Way</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Pickedup">Pickedup</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
