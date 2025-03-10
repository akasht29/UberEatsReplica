import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [dishes, setDishes] = useState([]); // State to store the list of dishes
  const [error, setError] = useState(""); // State to store any error
  const navigate = useNavigate();

  // Fetch dishes from the backend on component mount
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/restaurant/dish", {
          withCredentials: true, // Ensure credentials are included
        });
        setDishes(response.data); // Update state with the fetched dishes
      } catch (err) {
        setError("Failed to fetch dishes. Please try again.");
        console.error(err);
      }
    };

    fetchDishes(); // Call the function to fetch dishes when the component mounts
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dish Management App</h1>
      <h2 className="text-center">Dish List</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div className="col-md-4" key={dish.dish_id}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">
                    <strong>ID:</strong> {dish.dish_id}
                  </p>
                  <p>{dish.description}</p>
                  <p>Price: ${dish.price}</p>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        navigate("/updatedish", { state: { id: dish.dish_id } })
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        navigate("/deletedish", { state: { id: dish.dish_id } })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No dishes found.</p>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate("/createdish")}
        >
          Create Dish
        </button>
      </div>
    </div>
  );
};

export default Menu;
