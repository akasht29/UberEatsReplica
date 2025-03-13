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
  refetchFavorites,
}) => {
  const [dishes, setDishes] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/customer/restaurant/dishes/${restaurant_id}`)
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });

    axios
      .get("http://localhost:3000/customer/favorites")
      .then((response) => {
        const favorites = response.data;
        const isFav = favorites.some(
          (favorite) => favorite.restaurant_id === restaurant_id
        );
        setIsFavorite(isFav);
      })
      .catch((error) => {
        console.error("Error checking favorites:", error);
      });
  }, [restaurant_id]);

  const handleAddToCart = async (dish_id) => {
    const qty = quantity[dish_id] || 0;
    if (qty > 0) {
      try {
        await axios.post("http://localhost:3000/customer/cart/add", {
          dish_id,
          quantity: qty,
        });
      } catch (error) {
        console.error("Error adding dish to cart:", error);
      }
    }
  };

  const handleQuantityChange = (e, dishId) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity((prev) => ({ ...prev, [dishId]: value }));
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete("http://localhost:3000/customer/favorites", {
          data: { restaurant_id },
        });
        setIsFavorite(false);
      } else {
        await axios.post("http://localhost:3000/customer/favorites", {
          restaurant_id,
        });
        setIsFavorite(true);
      }

      refetchFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="flex flex-col">
        <div className="mb-3 w-100">
          <img
            src={images ? `http://localhost:3000${images}` : "/restaurant.jpg"}
            alt="Restaurant"
            className="card-img-top"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%", // Full width to ensure consistency
              height: "200px", // Set fixed height
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{restaurant_name}</h5>
          <p className="card-text">Description: {description}</p>

          <div className="d-flex justify-content-between mb-2">
            <p className="card-text">Location: {location}</p>
            <p className="card-text">Contact: {contact_info}</p>
          </div>
          <p className="card-text">Timings: {timings}</p>
          <button
            className={`btn ${isFavorite ? "btn-danger" : "btn-primary"} ml-2`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <h6 className="mt-4">Dishes:</h6>
          <ul>
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <li key={dish.dish_id}>
                  <strong>{dish.name}</strong> - ${dish.price}
                  <br />
                  Ingredients: {dish.ingredients}
                  <div className="d-flex align-items-center mt-2">
                    <input
                      type="number"
                      value={quantity[dish.dish_id] || 0}
                      onChange={(e) => handleQuantityChange(e, dish.dish_id)}
                      min="0"
                      style={{ width: "50px" }}
                    />
                    <button
                      className="btn btn-dark ml-2"
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
  );
};

export default RestaurantCard;
