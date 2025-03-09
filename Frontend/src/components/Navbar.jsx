import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="btn bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link
            to="/"
            className="ml-3 text-white"
            style={{
              textDecoration: "none",
              mixBlendMode: "difference",
            }}
          >
            <h1>Uber Eats</h1>
          </Link>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            <div className="d-flex gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/customerlogin">
                    <button
                      className="btn bg-white rounded-5 px-3 py-2"
                      type="button"
                    >
                      Login
                    </button>
                  </Link>

                  <Link to="/customersignup">
                    <button
                      className="btn btn-dark text-white rounded-5 px-3 py-2"
                      type="button"
                    >
                      Signup
                    </button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: "300px" }}
      >
        <div className="offcanvas-body justify-content-center align-items-center h-100">
          {isAuthenticated ? (
            <div>
              <div className="d-flex align-items-center">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div className="ms-3">
                  <h5>Account Name</h5>
                  <Link
                    className="text-decoration-none text-green"
                    to="/customerprofile"
                  >
                    Manage Account
                  </Link>
                </div>
              </div>

              <Link
                className="text-decoration-none  text-black"
                to="/dashboard"
              >
                <h5 className="py-2">Dashboard</h5>
              </Link>
              <Link
                className="text-decoration-none  text-black"
                to="/favorites"
              >
                <h5 className="py-2">Favorites</h5>
              </Link>
              <Link className="text-decoration-none  text-black" to="/cart">
                <h5 className="py-2">Cart</h5>
              </Link>
              <button
                className="btn bg-white"
                type="button"
                onClick={() => setIsAuthenticated(false)}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="w-100 text-center">
              <Link to="/customersignup" className=" w-75 d-block mx-auto">
                <button className="btn btn-dark fw-bolder text-white w-100 p-3 m-2 rounded-2">
                  Sign Up
                </button>
              </Link>
              <Link to="/customerlogin" className="w-75 d-block mx-auto">
                <button className="btn btn-outline-dark  fw-bolder w-100 p-3 m-2 rounded-2">
                  Login
                </button>
              </Link>
              <Link
                to="/customerlogin"
                className="text-black text-decoration-none d-block text-center my-3"
              >
                Create Your Business Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
