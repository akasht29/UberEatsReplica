import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateBook = ({ addBook }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title, author);
    navigate("/"); // Redirect to Home
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
