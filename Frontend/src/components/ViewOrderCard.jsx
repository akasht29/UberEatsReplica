import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";

const ViewOrderCard = ({
  orderKey,
  OrderItems,
  order_status,
  delivery_status,
}) => {
  useEffect(() => {
    console.log("ok", orderKey);
    console.log("oi", OrderItems);
  }, [orderKey]);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return <Badge bg="primary">New</Badge>;
      case "delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="card mb-4 shadow-lg border-0 rounded-3">
      <div className="card-header bg-dark text-white text-center">
        <h5 className="mb-0">Order #{orderKey}</h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <h6 className="fw-bold text-primary">Ordered Items:</h6>
          <ul className="list-group">
            {OrderItems?.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.Dish.name} <strong>(x{item.quantity})</strong>
                </span>
                <span className="text-success fw-bold">
                  ${item.price?.toFixed(2) || "0.00"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-2">
          <h6 className="fw-bold">
            Order Status: {getStatusBadge(order_status)}
          </h6>
        </div>

        <div className="mb-2">
          <h6 className="fw-bold">
            Delivery Status: {getStatusBadge(delivery_status)}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderCard;
