import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBook = ({ updateBook }) => {
  const location = useLocation();
  const [id] = useState(location.state?.id || "");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(Number(id), title, author);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Book</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter new author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
