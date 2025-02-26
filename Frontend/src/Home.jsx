import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BlankPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Bootstrap in React</h1>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary">Click Me</button>
      </div>
    </div>
  );
};

export default BlankPage;
