exports.isAuthenticated = (req, res, next) => {
    if (!req.session.customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };
  