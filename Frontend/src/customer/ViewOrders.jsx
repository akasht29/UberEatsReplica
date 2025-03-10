import React, { useState, useEffect } from "react";
import ViewOrderCard from "../components/ViewOrderCard";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const ViewOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Making request to fetch orders...");
        const response = await axios.get(
          "http://localhost:3000/customer/orders",
          {
            withCredentials: true,
          }
        );

        console.log("Orders Response:", response.data.order);

        if (response.status === 200) {
          setOrders(response.data.order);
          setFilteredOrders(response.data.order);
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

  const filterOrdersByStatus = (status) => {
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.order_status === status);
      setFilteredOrders(filtered);
    }
  };


  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Orders</h1>

      {/* Buttons for filtering */}
      <div className="text-center mb-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => filterOrdersByStatus("New")}
        >
          New
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => filterOrdersByStatus("Delivered")}
        >
          Delivered
        </button>
        <button
          className="btn btn-danger"
          onClick={() => filterOrdersByStatus("Cancelled")}
        >
          Cancelled
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => filterOrdersByStatus("All")}
        >
          All Orders
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div className="col-md-4" key={order.id}>
                <ViewOrderCard
                  {...order}
                  orderKey={order.id}
                />
              </div>
            ))
          ) : (
            <p>No orders available for the selected status.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
