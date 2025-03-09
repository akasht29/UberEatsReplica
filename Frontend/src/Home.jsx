import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/homebg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
          zIndex: -1,
        }}
      ></div>

      <div
        className="d-flex justify-content-center flex-column"
        style={{
          position: "absolute",
          top: 0,
          left: 100,
          right: 1000,
          bottom: 0,
          height: "100vh",
        }}
      >
        <h1 className="text-left text-white mb-4 ">Order delivery near you</h1>

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
