import React from "react";

const Login = () => {
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <h1 className=" text-center mb-4">Login</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
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
                  name="password"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn text-white bg-black">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
