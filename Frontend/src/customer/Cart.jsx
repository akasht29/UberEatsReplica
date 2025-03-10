// components/Cart.js
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [checkoutStatus, setCheckoutStatus] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/customer/cart");

        const customerResponse = await axios.get(
          "http://localhost:3000/api/customer"
        );
        console.log("customerResponse", customerResponse.data.customerId);

        setCustomerId(customerResponse.data.customerId);

        const cartData = Object.keys(response.data.data).map((key) => {
          return {
            customerId: customerResponse.data.id,
            restaurantId: key,
            ...response.data.data[key],
          };
        });

        setCart(cartData);
        console.log("cartData", cartData);

        cartData.forEach((restaurant) => {
          console.log(
            `Dishes from ${restaurant.restaurantName}:`,
            restaurant.dishes
          );
        });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [checkoutStatus]);

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

      setCheckoutStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error("Error checking out:", error);
      alert("Failed to checkout.");
    }
  };

  const updateCart = async (dishId, quantity) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/customer/cart/update",
        {
          dish_id: dishId,
          quantity: quantity,
        }
      );
      console.log("Cart updated:", response.data);
      setCheckoutStatus((prevStatus) => !prevStatus);
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          {cart.length > 0 ? (
            cart.map((restaurant) => (
              <CartCard
                key={restaurant.restaurantId}
                restaurant={restaurant}
                handleCheckout={handleCheckout}
                updateCart={updateCart}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
