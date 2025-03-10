import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserType } from "../redux/actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSetUserType = (type) => {
    dispatch(setUserType(type));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/restaurant/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        handleSetUserType("restaurant");
        navigate("/restaurantprofile");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div>
          <h1 className="text-center mb-4">Restaurant Login</h1>

          <form onSubmit={handleSubmit}>
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
              Log In
            </button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account? <a href="/restaurantsignup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
