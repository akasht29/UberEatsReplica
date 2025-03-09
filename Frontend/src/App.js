import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./customer/Login";
import CustomerSignUp from "./customer/SignUp";
import CustomerProfile from "./customer/Profile";
import Dashboard from "./customer/Dashboard";
import Favorites from "./customer/Favorites";
import Cart from "./customer/Cart";
import ResturantProfile from "./resturant/Profile";
import ResturantSignUp from "./resturant/SignUp";
import ResturantLogin from "./resturant/Login";
import Orders from "./resturant/Orders";
import Home from "./Home";
import Navbar from "./components/Navbar";
import CreateDish from "./components/CreateDish";

const App = () => {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          {/* <Route path="/" element={<Home dishs={dishs} />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/customerlogin" element={<CustomerLogin />} />
          <Route path="/resturantlogin" element={<ResturantLogin />} />
          <Route path="/customersignup" element={<CustomerSignUp />} />
          <Route path="/resturantsignup" element={<ResturantSignUp />} />
          <Route path="/customerprofile" element={<CustomerProfile />} />
          <Route path="/resturantprofile" element={<ResturantProfile />} />
          <Route path="/createdish" element={<CreateDish />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
