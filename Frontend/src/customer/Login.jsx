import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className="text-center mb-4">Login</h1>
            <form>
              <div className="mb-3">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  id="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn text-white btn-dark">
                  Login
                </button>
              </div>
            </form>
            <Link to="/resturantlogin" className=" text-black">
              resturant login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
