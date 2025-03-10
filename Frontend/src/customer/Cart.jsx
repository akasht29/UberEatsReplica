import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState(null); // Store customerId

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Fetch the cart data
        const response = await axios.get("http://localhost:3000/customer/cart");

        // Fetch the customerId (assuming you have an endpoint that provides this info)
        const customerResponse = await axios.get(
          "http://localhost:3000/api/customer"
        );
        console.log("customerResponse", customerResponse.data.customerId);

        // Save customerId in the state
        setCustomerId(customerResponse.data.customerId);

        // Map the cart data
        const cartData = Object.keys(response.data.data).map((key) => {
          return {
            customerId: customerResponse.data.id, // Add customerId to each restaurant item
            restaurantId: key,
            ...response.data.data[key],
          };
        });

        setCart(cartData);
        console.log("cartData", cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async (restaurantId) => {
    try {
      if (!customerId) {
        alert("Customer not found");
        return;
      }

      console.log("customerId", customerId);
      console.log("restaurantId", restaurantId);

      const response = await axios.post(
        "http://localhost:3000/customer/cart/checkout",
        {
          restaurant_id: restaurantId,
        }
      );

      alert("Checked out successfully!");
    } catch (error) {
      console.error("Error checking out:", error);
      alert("Failed to checkout.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          {cart.map((restaurant) => (
            <div key={restaurant.restaurantId} className="mb-4">
              <h4 className="card-title">{restaurant.restaurantName}</h4>
              <ul className="list-group mt-3">
                {restaurant.dishes.map((item) => (
                  <li
                    key={item.dishName}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {item.dishName} (x{item.quantity})
                    </span>
                    <span>${item.totalPrice.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h5 className="mt-3">
                Total for {restaurant.restaurantName}: $
                {restaurant.totalPrice.toFixed(2)}
              </h5>
              <button
                onClick={() => handleCheckout(restaurant.restaurantId)} // Use restaurantId to checkout
                className="btn btn-primary mt-3"
              >
                Checkout
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
