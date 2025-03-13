import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div>
      {/* Background Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: "url(/homebg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          zIndex: -1,
        }}
      ></div>

      {/* Content */}
      <div
        className="container d-flex flex-column justify-content-center align-items-start text-white"
        style={{
          minHeight: "100vh",
          paddingTop: "80px", // Adjust for navbar height
          paddingLeft: "5vw", // Responsive padding
        }}
      >
        <h1 className="mb-4">Order delivery near you</h1>

        <div className="d-flex gap-3">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter delivery address"
            style={{ width: "20vw", height: "6vh" }}
          />

          <select className="form-select" style={{ width: "10vw" }}>
            <option value="option1">Deliver Now</option>
            <option value="option2">Schedule for Later</option>
          </select>

          <button className="btn btn-dark text-white" style={{ width: "10vw" }}>
            Search Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
