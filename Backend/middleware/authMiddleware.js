exports.customerAuth = (req, res, next) => {
    if (!req.session.customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  exports.restaurantAuth = (req, res, next) => {
    if (!req.session.restaurantId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
  