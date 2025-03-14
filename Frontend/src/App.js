import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserType, resetUserType } from "./redux/actions/userActions";

import CustomerLogin from "./customer/Login";
import CustomerSignUp from "./customer/SignUp";
import CustomerProfile from "./customer/Profile";
import Dashboard from "./customer/Dashboard";
import Favorites from "./customer/Favorites";
import Cart from "./customer/Cart";
import RestaurantProfile from "./restaurant/Profile";
import RestaurantSignUp from "./restaurant/SignUp";
import RestaurantLogin from "./restaurant/Login";
import ViewOrders from "./customer/ViewOrders";
import Orders from "./restaurant/Orders";
import Home from "./Home";
import Navbar from "./components/Navbar";
import CreateDish from "./components/CreateDish";
import UpdateDish from "./components/UpdateDish";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType) {
      dispatch(setUserType(userType));
    } else {
      dispatch(resetUserType());
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div className="container ">
          <Routes>
            {/* <Route path="/" element={<Home dishs={dishs} />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/customerlogin" element={<CustomerLogin />} />
            <Route path="/restaurantlogin" element={<RestaurantLogin />} />
            <Route path="/customersignup" element={<CustomerSignUp />} />
            <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
            <Route path="/customerprofile" element={<CustomerProfile />} />
            <Route path="/restaurantprofile" element={<RestaurantProfile />} />
            <Route path="/createdish" element={<CreateDish />} />
            <Route path="/updatedish" element={<UpdateDish />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/vieworders" element={<ViewOrders />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
