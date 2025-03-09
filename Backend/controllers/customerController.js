const bcrypt = require("bcryptjs");
const { Customer, Restaurant, Favourite, Cart, Dish } = require("../models");
const multer = require("multer");
const path = require("path");
const session = require("express-session");


// Customer Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Customer registered successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Customer Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    console.log(customer)
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.customerId = customer.customer_id;
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
      console.log('Session destroyed');
      res.clearCookie('connect.sid'); //for testing
      res.status(200).json({ message: "Logout successful" });
  });
};


// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.session.customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, country, state } = req.body;
    await Customer.update({ name, country, state }, { where: { customer_id: req.session.customerId } });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Multer storage for profile picture
const storage = multer.diskStorage({
  destination:"/uploads/",
  filename: (req, file, cb) => {
    cb(null, $date.now() + file.originalname);
  }
})

const upload = multer({storage: storage});
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
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to Cart
const models = require('../models'); // Import your Sequelize models
const restaurant = require("../models/restaurant");

// Add a dish to the cart
exports.addToCart = async (req, res) => {
  try {
    const { dish_id, quantity } = req.body; 
    const dish = await models.Dish.findByPk(dish_id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    // Check if the dish is already in the cart
    let cartItem = await models.Cart.findOne({
      where: {
        customer_id: req.session.customerId,
        dish_id: dish_id
      }
    });

    // If the dish is already in the cart, update the quantity
    if (cartItem) {
      cartItem.quantity += quantity; // Increment the quantity
      await cartItem.save();
    } else {
      // Otherwise, create a new cart item
      cartItem = await models.Cart.create({
        restaurant_id: dish.restaurant_id,
        customer_id: req.session.customerId,
        dish_id: dish_id,
        quantity,
        price: dish.price // Store the price of the dish at the time of adding to the cart
      });
    }
    res.status(200).json({
      success: true,
      message: 'Dish added to cart successfully',
      cartItem
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
};


// View Cart
// View all items in the customer's cart
exports.viewCart = async (req, res) => {
  try {
    const customerId = req.session.customerId;  // Assuming customer ID is available in the session or JWT

    // Fetch cart items for the specific customer and include related Dish and Restaurant details
    const cartItems = await Cart.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: Dish,
          attributes: ['dish_id', 'name', 'price'],  // Only necessary details
        },
        {
          model: Restaurant,
          attributes: ['restaurant_id', 'restaurant_name'],  // Only necessary details
        },
      ],
    });

    // Group the cart items by restaurant
    const groupedByRestaurant = cartItems.reduce((acc, cartItem) => {
      const { restaurant_id, restaurant_name: restaurantName } = cartItem.Restaurant;
      const { name: dishName, price } = cartItem.Dish;
      const quantity = cartItem.quantity;

      // If restaurant not in accumulator, initialize it
      if (!acc[restaurant_id]) {
        acc[restaurant_id] = {
          restaurantName,
          dishes: [],
          totalPrice: 0,  // Track total price for the restaurant
        };
      }

      // Add dish to the restaurant's list of dishes in the cart
      acc[restaurant_id].dishes.push({
        dishName,
        price,
        quantity,
        totalPrice: price * quantity,  // Price * quantity for total price of the dish
      });

      // Update total price for the restaurant
      acc[restaurant_id].totalPrice += price * quantity;

      return acc;
    }, {});

    // Return the grouped cart items as a response
    return res.status(200).json({
      success: true,
      data: groupedByRestaurant,
    });
  } catch (error) {
    console.error('Error fetching cart items grouped by restaurant:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching cart items grouped by restaurant',
    });
  }
}

// Checkout the cart
exports.checkoutCart = async (req, res) => {
  try {
    const customerId = req.session.customerId; // Get customer ID from session or JWT

    // Start a transaction to ensure atomicity
    const transaction = await models.sequelize.transaction();

    // Fetch all cart items for the customer
    const cartItems = await models.Cart.findAll({
      where: { customer_id: customerId },
      include: [{
        model: models.Dish, // Include dish details
        attributes: ['price', 'name', 'description']
      }],
      transaction // Use the transaction
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    // 1. Create an order in the orders table
    const order = await models.Order.create({
      customer_id: customerId,
      status: 'Pending', // Default status when the order is created
      total_price: 0, // We will calculate this next
    }, { transaction });

    // 2. Add items from the cart to the order_items table
    let totalPrice = 0;
    const orderItems = cartItems.map(cartItem => {
      const price = cartItem.price;
      const quantity = cartItem.quantity;
      totalPrice += price * quantity;

      return {
        order_id: order.id,
        dish_id: cartItem.dish_id,
        quantity,
        price, // Store the price at the time of checkout
      };
    });

    // Insert the order items into the order_items table
    await models.OrderItem.bulkCreate(orderItems, { transaction });

    // 3. Update the order's total price
    await order.update({ total_price: totalPrice }, { transaction });

    // 4. Clear the cart (optional, if you want to empty the cart after checkout)
    await models.Cart.destroy({
      where: { customer_id: customerId },
      transaction
    });

    // Commit the transaction
    await transaction.commit();

    res.status(200).json({
      success: true,
      message: 'Checkout successful',
      order
    });
  } catch (error) {
    console.error('Error during checkout:', error);

    // If there is an error, roll back the transaction
    await transaction.rollback();

    res.status(500).json({
      success: false,
      message: 'Error during checkout'
    });
  }
};

// Add to Favourites
exports.addToFavourites = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await Favourite.create({ customerId: req.session.customerId, restaurantId });

    res.json({ message: "Added to favourites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Favourites
exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.findAll({ where: { customerId: req.session.customerId } });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
