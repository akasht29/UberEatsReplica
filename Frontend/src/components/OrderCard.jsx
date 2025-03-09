import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ customer, orders, status, deliveryStatus }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card mb-4 shadow-sm" 
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/customer/${customer.id}`)} 
    >
      <div>
        <div >
          <img
            src={customer.image}
            alt="profilepicture"
          />
        </div>
        <div >
          <div className="card-body">
            <h5 className="card-title">{customer.name}</h5>
            <ul className="card-text">
              {orders.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>

            <div className="d-flex justify-content-between">
              <p className="card-text">Status: {status}</p>
              <p className="card-text">Delivery: {deliveryStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
