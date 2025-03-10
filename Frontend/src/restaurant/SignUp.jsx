import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after signup

const Signup = () => {
  const [restaurant_name, setRestaurant_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate() for routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:3000/restaurant/signup",
        {
          restaurant_name,
          email,
          password,
          location,
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError("Error during signup");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className=" text-center mb-4">SignUp</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  name="restaurant_name"
                  type="text"
                  className="form-control"
                  id="restaurant_name"
                  required
                  placeholder="Enter Restaurant Name"
                  value={restaurant_name}
                  onChange={(e) => setRestaurant_name(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
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
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  name="location"
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn text-white btn-dark">
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Signup;
