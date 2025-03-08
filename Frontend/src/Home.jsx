import React from "react";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

const BlankPage = () => {
  return (
    <div className="container mt-5">
      <Navbar></Navbar>
      <h1 className="text-center">Order deliver near you</h1>
    </div>
  );
};

export default BlankPage;
