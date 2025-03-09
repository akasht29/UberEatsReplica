import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className=" text-center mb-4">SignUp</h1>
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn text-white btn-dark">
                  SignUp
                </button>
              </div>
            </form>
            <Link to="/resturantsignup" className=" text-black">
              resturant signup
            </Link>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default SignUp;
