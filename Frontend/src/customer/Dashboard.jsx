import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/ResturantCard";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log("Making request to fetch restaurants...");
        const response = await axios.get(
          "http://localhost:3000/customer/restaurants",
          {
            withCredentials: true,
          }
        );

        console.log("Response:", response.data);
        if (response.status === 200) {
          setRestaurants(response.data);
        }
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        if (err.response && err.response.status === 401) {
          setError("You are not authenticated. Please log in.");
          navigate("/customerlogin");
        } else {
          setError("Failed to fetch restaurants. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard Restaurants</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div className="col-md-4" key={restaurant.id}>
                <RestaurantCard {...restaurant} />
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

export default Dashboard;
