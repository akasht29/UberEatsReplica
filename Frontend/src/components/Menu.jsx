import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurant/dish")
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, []);

  const handleDelete = (dishId) => {
    console.log("Deleting dish with ID:", dishId);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dish?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/restaurant/dish/${dishId}`)
        .then(() => {
          axios
            .get("http://localhost:3000/restaurant/dish")
            .then((response) => {
              setDishes(response.data);
              alert("Dish deleted successfully!");
            })
            .catch((error) => {
              console.error("Error fetching dishes:", error);
              alert("Failed to fetch updated dishes list.");
            });
        })
        .catch((error) => {
          console.error("Error deleting dish:", error);
          alert("Failed to delete the dish. Please try again.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dish Management App</h1>
      <h2 className="text-center mb-5">Dish List</h2>

      <div className="row g-4">
        {dishes.map((dish) => (
          <div className="col-md-4" key={dish.dish_id}>
            <div className="card shadow-lg border-0 rounded-3">
              <img
                src={
                  dish.image
                    ? `http://localhost:3000${dish.image}`
                    : "fallback-image.jpg"
                }
                alt="Dish"
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{dish.name}</h5>
                <p className="card-text">
                  <strong>ID:</strong> {dish.dish_id}
                </p>
                <p className="card-text">{dish.description}</p>
                <p className="card-text">
                  <strong>Price:</strong> ${dish.price}
                </p>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/updateDish", { state: { id: dish.dish_id } })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(dish.dish_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
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
