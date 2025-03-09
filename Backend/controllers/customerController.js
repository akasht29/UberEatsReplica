const bcrypt = require("bcryptjs");
const { Customer, Restaurant, Favourite, Cart } = require("../models");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

// Customer Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Customer registered successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Customer Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    console.log(customer);
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.customerId = customer.customer_id;
    console.log("req.session.customerId", req.session.customerId);
    res.status(200).json({ message: "Login successful", customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    console.log("Session destroyed");
    res.clearCookie("connect.sid"); //for testing
    res.status(200).json({ message: "Logout successful" });
  });
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.session.customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, country, state } = req.body;
    await Customer.update(
      { name, country, state },
      { where: { customer_id: req.session.customerId } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Multer storage for profile picture
const storage = multer.diskStorage({
  destination: "/uploads/",
  filename: (req, file, cb) => {
    cb(null, $date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Update Profile Picture
exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = `/uploads/${req.file.filename}`;
    await Customer.update(
      { profile_picture: filePath },
      { where: { customer_id: req.session.customerId } }
    );
    console.log(req.session.customerId);
    res.json({ message: "Profile picture uploaded successfully", filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Restaurants
exports.getRestaurants = async (req, res) => {
  try {
    console.log("in get restaurants");
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { dish_id, quantity } = req.body;
    await Cart.create({
      customer_id: req.session.customerId,
      dish_id,
      quantity,
    });

    res.json({ message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View Cart
exports.viewCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { customerId: req.session.customerId },
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Checkout
exports.checkout = async (req, res) => {
  try {
    await Cart.destroy({ where: { customerId: req.session.customerId } });
    res.json({ message: "Checkout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to Favourites
exports.addToFavourites = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await Favourite.create({
      customerId: req.session.customerId,
      restaurantId,
    });

    res.json({ message: "Added to favourites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Favourites
exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.findAll({
      where: { customerId: req.session.customerId },
    });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
