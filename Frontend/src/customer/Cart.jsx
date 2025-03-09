import React from "react";

const cartData = [
  {
    cartId: 1,
    customer: {
      id: 101,
      name: "John Doe",
      image: "",
    },
    items: [
      { dishId: 301, name: "Burger", quantity: 2, price: 5.99 },
      { dishId: 302, name: "Pizza", quantity: 1, price: 9.99 },
    ],
  },
];

const Cart = () => {
  const cartId = 1;
  const cart = cartData.find((c) => c.cartId === parseInt(cartId));

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <img
              src={cart.customer.image}
              alt={cart.customer.name}
              className="rounded-circle me-3"
              width="80"
            />
            <h2>{cart.customer.name}'s Cart</h2>
          </div>

          <h4 className="mt-3">Items:</h4>
          <ul className="list-group">
            {cart.items.map((item) => (
              <li
                key={item.dishId}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-3">
            Total: $
            {cart.items
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
