const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.post("/signup", restaurantController.signup);
router.post("/login", restaurantController.login);
router.post("/logout", isAuthenticated, restaurantController.logout);

// Profile Management
router.get("/profile", isAuthenticated, restaurantController.getProfile);
router.put("/profile", isAuthenticated, restaurantController.updateProfile);
router.put("/profile/picture", isAuthenticated, upload.single("file"), restaurantController.updateProfilePicture);

module.exports = router;