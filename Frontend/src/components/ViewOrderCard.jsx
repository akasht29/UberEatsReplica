import React, { useEffect } from "react";

const ViewOrderCard = ({
  orderKey,
  OrderItems,
  customer_id,
  order_status,
  delivery_status,
}) => {
  useEffect(() => {
    console.log("ok", orderKey);
    console.log("oi", OrderItems);
  }, [orderKey]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">

        <div>
          <strong>Ordered:</strong>
        </div>
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
          <label className="fw-bold">Order Status: {order_status}</label>
        </div>

        <div className="mb-2">
          <label className="fw-bold">Delivery Status: {delivery_status}</label>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderCard;
