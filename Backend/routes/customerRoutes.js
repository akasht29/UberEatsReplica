const express = require("express");

const router = express.Router();
const customerController = require("../controllers/customerController");
const { customerAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Signup & Login
router.post("/signup", customerController.signup);
router.post("/login", customerController.login);
router.post("/logout", customerAuth, customerController.logout);

// Profile Management
router.get("/profile", customerAuth, customerController.getProfile);
router.put("/profile", customerAuth, customerController.updateProfile);
router.put(
  "/profile/picture",
  customerAuth,
  upload.single("file"),
  customerController.updateProfilePicture
);

// Restaurant Dashboard
router.get("/restaurants", customerAuth, customerController.getRestaurants);
router.post("/cart/add", customerAuth, customerController.addToCart);
router.get("/cart", customerAuth, customerController.viewCart);
router.post("/cart/checkout", customerAuth, customerController.checkout);

// Favourites
router.post("/favourites", customerAuth, customerController.addToFavourites);
router.get("/favourites", customerAuth, customerController.getFavourites);

module.exports = router;
