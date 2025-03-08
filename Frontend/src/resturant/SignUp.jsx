import React from "react";

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
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
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
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  name="location"
                  type="text"
                  className="form-control"
                  id="location"
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

export default SignUp;
