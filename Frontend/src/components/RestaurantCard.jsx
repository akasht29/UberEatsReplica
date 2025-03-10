import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const RestaurantCard = ({
  restaurant_id,
  restaurant_name,
  location,
  description,
  contact_info,
  images,
  timings,
  onFavorite,
}) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurant/dishes/`)
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch dishes:", error);
      });
  }, [restaurant_id]);

  const handleAddToFavorites = async () => {
    try {
      await axios.post("/customer/favorites", { restaurant_id: restaurant_id });
      alert("Added to favorites!");
      if (onFavorite) onFavorite(restaurant_id);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={images ? `http://localhost:3000${images}` : "/restaurant.jpg"}
            alt="Profile"
            className="mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant_name}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">Location: {location}</p>
            <p className="card-text">Contact: {contact_info}</p>
            <p className="card-text">Hours: {timings}</p>

            <button className="btn btn-primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
