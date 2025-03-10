import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Making request to fetch orders...");
        const response = await axios.get(
          "http://localhost:3000/restaurant/orders",
          {
            withCredentials: true,
          }
        );

        console.log("Orders Response:", response.data.orders);
        console.log("Orders id Response:", response.data.orders[0].id);

        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response && err.response.status === 401) {
          setError("You are not authenticated. Please log in.");
          navigate("/restaurantlogin");
        } else {
          setError("Failed to fetch orders. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Orders</h1>
      {/* <h2>Orders</h2>
      {ordersData.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))} */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="col-md-4" key={order.id}>
                <OrderCard {...order} orderKey={order.id} />
              </div>
            ))
          ) : (
            <p>No restaurants available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
