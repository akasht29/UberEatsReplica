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
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/customer/restaurant/dishes/${restaurant_id}`)
      .then((response) => {
        console.log("dishes", response.data);
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, [restaurant_id]);

  const handleAddToCart = async (dish_id) => {
    const qty = quantity[dish_id] || 1;
    console.log("dishId:", dish_id);
    console.log("qty:", qty);

    try {
      const response = await axios.post(
        "http://localhost:3000/customer/cart/add",
        {
          dish_id,
          qty,
        }
      );
      alert("Dish added to cart successfully!");
    } catch (error) {
      console.error("Error adding dish to cart:", error);
      alert("Failed to add dish to cart.");
    }
  };

  const handleQuantityChange = (e, dishId) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity((prev) => ({ ...prev, [dishId]: value }));
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={images ? `http://localhost:3000${images}` : "/restaurant.jpg"}
            alt="Restaurant"
            className="mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{restaurant_name}</h5>
            <p className="card-text">{description}</p>

            <div className="d-flex justify-content-between mb-2">
              <p className="card-text">Location: {location}</p>
              <p className="card-text">Contact: {contact_info}</p>
              <p className="card-text">Hours: {timings}</p>
            </div>

            <h6 className="mt-4">Dishes:</h6>
            <ul>
              {dishes.length > 0 ? (
                dishes.map((dish) => (
                  <li key={dish.dish_id}>
                    <strong>{dish.name}</strong> - ${dish.price}
                    <div className="d-flex align-items-center mt-2">
                      <input
                        type="number"
                        value={quantity[dish.dish_id] || 1}
                        onChange={(e) => handleQuantityChange(e, dish.dish_id)}
                        min="1"
                        style={{ width: "50px" }}
                      />
                      <button
                        className="btn btn-primary ml-2"
                        onClick={() => handleAddToCart(dish.dish_id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No dishes available for this restaurant.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
