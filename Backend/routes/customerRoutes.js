const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


// Signup & Login
router.post("/signup", customerController.signup);
router.post("/login", customerController.login);
router.post("/logout", isAuthenticated, customerController.logout);

// Profile Management
router.get("/profile", isAuthenticated, customerController.getProfile);
router.put("/profile", isAuthenticated, customerController.updateProfile);
router.put("/profile/picture", isAuthenticated, upload.single("file"), customerController.updateProfilePicture);

// Restaurant Dashboard
router.get("/restaurants", isAuthenticated, customerController.getRestaurants);
router.post("/cart/add", isAuthenticated, customerController.addToCart);
router.get("/cart", isAuthenticated, customerController.viewCart);
router.post("/cart/checkout", isAuthenticated, customerController.checkout);

// Favourites
router.post("/favourites", isAuthenticated, customerController.addToFavourites);
router.get("/favourites", isAuthenticated, customerController.getFavourites);

module.exports = router;
