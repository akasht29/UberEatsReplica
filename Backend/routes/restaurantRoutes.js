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

router.post("/dish", restaurantAuth, upload.single("file"), restaurantController.addDish);
router.get("/dish", restaurantAuth, restaurantController.getDishes);
router.delete("/dish/:id", restaurantAuth, restaurantController.deleteDish);
router.put("/dish/:id", restaurantAuth, upload.single("file"), restaurantController.updateDish);
router.get("/dish/:id", restaurantAuth, restaurantController.getDishById);

router.get("/orders", restaurantAuth, restaurantController.viewOrders);
router.get("/order/:id/customer", restaurantAuth, restaurantController.getCustomerByOrderId);

router.get('/orders/delivery-status/:status', restaurantController.getDeliveryStatus);
router.put('/orders/:id/order-status', restaurantController.updateOrderStatus);
router.put('/orders/:id/delivery-status', restaurantController.updateDeliveryStatus);
module.exports = router;