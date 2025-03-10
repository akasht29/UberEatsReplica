const bcrypt = require("bcryptjs");
const {
  Customer,
  Restaurant,
  Favorite,
  Cart,
  Dish,
  Order,
  OrderItem,
} = require("../models");
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
  destination: "./uploads/",
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

exports.getRestaurantDishes = async (req, res) => {
  console.log("in get restaurant dishes");
  try {
    const restaurantId = req.params.id;
    const dishes = await Dish.findAll({
      where: { restaurant_id: restaurantId },
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a dish to the cart
exports.addToCart = async (req, res) => {
  try {
    const { dish_id, quantity } = req.body;
    console.log(req.body);
    const dish = await Dish.findByPk(dish_id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found." });
    }

    let cartItem = await Cart.findOne({
      where: {
        customer_id: req.session.customerId,
        dish_id: dish_id,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        restaurant_id: dish.restaurant_id,
        customer_id: req.session.customerId,
        dish_id: dish_id,
        quantity,
        price: dish.price,
      });
    }
    res.status(200).json({
      success: true,
      message: "Dish added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { dish_id, quantity } = req.body;

    const cartItem = await Cart.findOne({
      where: {
        customer_id: req.session.customerId,
        dish_id: dish_id,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Dish not found in the cart.",
      });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.status(200).json({
        success: true,
        message: "Dish removed from cart successfully.",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItem,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
    });
  }
};

// View all items in the customer's cart
exports.viewCart = async (req, res) => {
  try {
    const customerId = req.session.customerId;

    const cartItems = await Cart.findAll({
      where: { customer_id: customerId },
      include: [
        {
          model: Dish,
          attributes: ["dish_id", "name", "price"],
        },
        {
          model: Restaurant,
          attributes: ["restaurant_id", "restaurant_name"],
        },
      ],
    });

    const groupedByRestaurant = cartItems.reduce((acc, cartItem) => {
      const { restaurant_id, restaurant_name: restaurantName } =
        cartItem.Restaurant;
      const { dish_id, name: dishName, price } = cartItem.Dish;
      const quantity = cartItem.quantity;

      if (!acc[restaurant_id]) {
        acc[restaurant_id] = {
          restaurantName,
          dishes: [],
          totalPrice: 0,
        };
      }

      acc[restaurant_id].dishes.push({
        dish_id, // Include dish_id here
        dishName,
        price,
        quantity,
        totalPrice: price * quantity,
      });

      acc[restaurant_id].totalPrice += price * quantity;

      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: groupedByRestaurant,
    });
  } catch (error) {
    console.error("Error fetching cart items grouped by restaurant:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart items grouped by restaurant",
    });
  }
};

// Checkout the cart
exports.checkoutCart = async (req, res) => {
  try {
    const customerId = req.session.customerId; // Assuming customer is authenticated via session
    const restaurantId = req.body.restaurant_id;

    // Fetch cart items for the specific customer and restaurant
    const cartItems = await Cart.findAll({
      where: { customer_id: customerId, restaurant_id: restaurantId },
      include: [{ model: Dish }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    // Calculate total price of the cart
    let totalPrice = 0;
    const orderItems = cartItems.map((item) => {
      totalPrice += item.Dish.price * item.quantity; // Assuming price is on Dish model
      return {
        dish_id: item.dish_id,
        quantity: item.quantity,
        price: item.Dish.price * item.quantity,
      };
    });

    // Create the order in the Orders table
    const order = await Order.create({
      customer_id: customerId,
      restaurant_id: restaurantId,
      total_price: totalPrice,
      status: "Pending",
    });

    // Create order items in the OrderItems table
    await OrderItem.bulkCreate(
      orderItems.map((orderItem) => ({
        ...orderItem,
        order_id: order.id,
      }))
    );

    // Clear the cart for the customer after checkout
    await Cart.destroy({
      where: { customer_id: customerId, restaurant_id: restaurantId },
    });

    return res.status(200).json({
      message: "Order placed successfully!",
      orderId: order.id,
      totalPrice,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    return res.status(500).json({
      message: "An error occurred during checkout.",
      error: error.message,
    });
  }
};

exports.viewOrders = async (req, res) => {
  const customerId = req.session.customerId;

  const order = await Order.findAll({
    where: { customer_id: customerId },
    include: [{ model: OrderItem, include: [Dish] }],
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  return res.status(200).json({ order });
};

// Add to Favourites
exports.addToFavorites = async (req, res) => {
  try {
    const { restaurant_id } = req.body;
    await Favorite.create({
      customer_id: req.session.customerId,
      restaurant_id,
    });

    res.json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFavorites = async (req, res) => {
  try {
    const { restaurant_id } = req.body;
    const favorite = await Favorite.findOne({
      where: {
        customer_id: req.session.customerId,
        restaurant_id,
      },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    await Favorite.destroy({
      where: {
        customer_id: req.session.customerId,
        restaurant_id,
      },
    });

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Favourites
exports.getFavorites = async (req, res) => {
  try {
    const favourites = await Favorite.findAll({
      where: { customer_id: req.session.customerId },
    });

    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
