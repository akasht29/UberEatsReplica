import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import axios from "../utils/axiosConfig";

const Favorites = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  const fetchFavorites = async () => {
    try {
      const restaurantResponse = await axios.get(
        "http://localhost:3000/customer/restaurants",
        {
          withCredentials: true,
        }
      );
      const favoritesResponse = await axios.get("/customer/favorites", {
        withCredentials: true,
      });

      const filteredFavorites = restaurantResponse.data.filter((restaurant) =>
        favoritesResponse.data.some(
          (fav) => fav.restaurant_id === restaurant.restaurant_id
        )
      );
      setFavoriteRestaurants(filteredFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Favorite Restaurants</h1>

      <div className="row">
        {favoriteRestaurants.length > 0 ? (
          favoriteRestaurants.map((restaurant) => (
            <div className="col-md-4" key={restaurant.id}>
              <RestaurantCard
                {...restaurant}
                refetchFavorites={fetchFavorites}
              />
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
