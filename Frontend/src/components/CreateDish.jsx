import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateDish = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Appetizer");
  const [imageFile, setImageFile] = useState(null); // New state for image
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("price", parseFloat(price));
    formData.append("description", description);
    formData.append("category", category);

    // Append image if selected
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/restaurant/dish",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Dish created successfully!");
        setName("");
        setIngredients("");
        setPrice("");
        setDescription("");
        setCategory("Appetizer");
        setImageFile(null); // Reset image
        navigate("/restaurantprofile");
      }
    } catch (err) {
      setError("Failed to create dish. Please try again.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Create a New Dish</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Dish Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter dish name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Ingredients */}
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                placeholder="Enter dish ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter dish price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter dish description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Appetizer">Appetizer</option>
                <option value="Salad">Salad</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Create Dish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDish;
