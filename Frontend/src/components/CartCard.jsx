import React, { useState } from "react";

const CartCard = ({ restaurant, handleCheckout, updateCart }) => {
  const [updatedQuantity, setUpdatedQuantity] = useState({});

  const handleQuantityChange = (dishId, newQuantity) => {
    setUpdatedQuantity((prev) => ({
      ...prev,
      [dishId]: newQuantity,
    }));
  };

  const handleUpdateCart = async (dishId, quantity) => {
    console.log("restaurant", restaurant.dishes);
    console.log("dishId", dishId);
    console.log("quantity", quantity);

    if (quantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }
    try {
      await updateCart(dishId, quantity);
      alert("Cart updated successfully!");
    } catch (error) {
      alert("Failed to update cart.");
    }
  };

  return (
    <div className="mb-4">
      <h4 className="card-title">{restaurant.restaurantName}</h4>
      <ul className="list-group mt-3">
        {restaurant.dishes.map((item) => (
          <li
            key={item.dish_id}
            className="list-group-item d-flex justify-content-between"
          >
            <span>
              {item.dishName} (x
              <input
                type="number"
                value={updatedQuantity[item.dish_id] ?? item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.dish_id, Number(e.target.value))
                }
                className="quantity-input"
                min="0"
              />
              )
            </span>
            <span>${item.totalPrice.toFixed(2)}</span>
            <button
              onClick={() =>
                handleUpdateCart(
                  item.dish_id,
                  updatedQuantity[item.dish_id] ?? item.quantity
                )
              }
              className="btn btn-sm btn-success"
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <h5 className="mt-3">
        Total for {restaurant.restaurantName}: $
        {restaurant.totalPrice.toFixed(2)}
      </h5>
      <button
        onClick={() => handleCheckout(restaurant.restaurantId)}
        className="btn btn-primary mt-3"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartCard;
