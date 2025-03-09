import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const dishList = [
  {
    id: 1,
    name: "Margherita Pizza",
    ingredients: "Tomato sauce, mozzarella, fresh basil, olive oil",
    image: "/images/margherita.jpg",
    price: "12.99",
    description:
      "A classic Italian pizza topped with fresh basil and mozzarella.",
    category: "Main Course",
  },
  {
    id: 2,
    name: "Caesar Salad",
    ingredients: "Romaine lettuce, croutons, parmesan cheese, Caesar dressing",
    image: "/images/caesar-salad.jpg",
    price: "9.99",
    description:
      "Crisp romaine lettuce tossed with parmesan, croutons, and creamy Caesar dressing.",
    category: "Salad",
  },
  {
    id: 3,
    name: "Spaghetti Carbonara",
    ingredients: "Spaghetti, eggs, pancetta, parmesan cheese, black pepper",
    image: "/images/carbonara.jpg",
    price: "14.50",
    description:
      "A rich and creamy pasta dish made with eggs, cheese, pancetta, and pepper.",
    category: "Main Course",
  },
];

const Menu = ({ dishes }) => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log("Dish list updated:", dishes);
  //   }, [dishes]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dish Management App</h1>
      <h2 className="text-center">Dish List</h2>

      <div className="row">
        {dishList.map((dish) => (
          <div className="col-md-4" key={dish.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">
                  <strong>ID:</strong> {dish.id}
                </p>
                <p>{dish.description}</p>
                <p>Price: ${dish.price}</p>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/updatedish", { state: { id: dish.id } })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      navigate("/deletedish", { state: { id: dish.id } })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
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
