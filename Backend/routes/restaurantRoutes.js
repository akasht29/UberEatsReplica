const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { restaurantAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.post("/signup", restaurantController.signup);
router.post("/login", restaurantController.login);
router.post("/logout", restaurantAuth, restaurantController.logout);

// Profile Management
router.get("/profile", restaurantAuth, restaurantController.getProfile);
router.put("/profile", restaurantAuth, restaurantController.updateProfile);
router.put("/profile/picture", restaurantAuth, upload.single("file"), restaurantController.updateProfilePicture);

router.post("/dish", restaurantAuth, restaurantController.addDish);
router.get("/dish", restaurantAuth, restaurantController.getDishes);

module.exports = router;