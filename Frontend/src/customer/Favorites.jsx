import React from "react";
import RestaurantCard from "../components/ResturantCard";
const Favorites = () => {
  const favoriteResturants = [
    {
      id: 1,
      name: "Tasty Bistro",
      location: "123 Flavor Street, Foodie City",
      description: "A cozy restaurant offering a variety of delicious dishes.",
      contactInfo: "+1234567890",
      images: "/images/restaurant1.jpg",
      hours: "Mon-Fri: 9 AM - 9 PM Sat-Sun: 10 AM - 11 PM",
    },
    {
      id: 2,
      name: "Spicy Delights",
      location: "456 Spice Road, Flavor Town",
      description: "Spicy food for those who love heat in their meals.",
      contactInfo: "+9876543210",
      images: "/images/restaurant4.jpg",
      hours: "Mon-Sun: 11 AM - 10 PM",
    },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Favorite Restaurants</h1>

      <div className="row">
        {favoriteResturants.map((restaurant) => (
          <div className="col-md-4" key={restaurant.id}>
            <RestaurantCard {...restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
