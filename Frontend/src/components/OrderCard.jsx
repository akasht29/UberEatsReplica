import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const OrderCard = ({ orderKey, OrderItems, customer_id, status }) => {
  console.log("orderKey", orderKey);
  console.log("OrderItems", OrderItems);
  console.log("customer_id", customer_id);
  console.log("status", status);
  const [customerInfo, setCustomerInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurant/order/${orderKey}/customer/`)
      .then((response) => {
        console.log("customerInfo", response.data);
        setCustomerInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, [orderKey]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          Customer ID: {customerInfo.customer.customer_id}
        </h5>
        <p className="card-text">
          Name: {customerInfo.customer.name}
          <br />
          Email: {customerInfo.customer.email}
        </p>
        <p className="card-text"></p>
        <ul className="card-text">
          {OrderItems?.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{customerInfo.customer.name}</span>
              <span>
                {item.Dish.name} (x{item.quantity})
              </span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="card-text">Status: {status}</p>
      </div>
    </div>
  );
};

export default OrderCard;
