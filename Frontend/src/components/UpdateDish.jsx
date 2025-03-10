import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditDish = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null); // To store the file object
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // to get the dishId passed in state
  const { id } = location.state; // assuming `id` is passed as state

  useEffect(() => {
    // Fetch the existing dish data to pre-populate the form
    axios
      .get(`http://localhost:3000/restaurant/dish/${id}`)
      .then((response) => {
        const dish = response.data;
        setName(dish.name);
        setDescription(dish.description);
        setPrice(dish.price);
        setCategory(dish.category);
        setIngredients(dish.ingredients);
        setImage(dish.image || "");
      })
      .catch((error) => {
        console.error("Error fetching dish:", error);
        setError("Failed to fetch dish data.");
      });
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the dish data and the image
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("ingredients", ingredients);
    if (image) {
      formData.append("file", image); // Append the image file to FormData
    }

    setLoading(true);

    try {
      // Send the updated dish data (including the image) to the backend
      await axios.put(`http://localhost:3000/restaurant/dish/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Dish updated successfully!");
      navigate("/restaurantprofile"); // Redirect to the menu or another page
    } catch (error) {
      console.error("Error updating dish:", error);
      setError("Failed to update the dish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Dish</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Dish Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Salad">Salad</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Dish"}
        </button>
      </form>
    </div>
  );
};

export default EditDish;
