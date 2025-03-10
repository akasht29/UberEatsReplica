// src/customer/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after signup

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate() for routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:3000/customer/signup",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        navigate("/customerlogin");
      }
    } catch (err) {
      setError("Error during signup");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div>
          <h1 className="text-center mb-4">Customer Signup</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark w-100">
              Sign Up
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <a href="/customerlogin">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
