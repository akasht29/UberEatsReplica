require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const customerRoutes = require("./routes/customerRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const session = require("express-session");
const restaurant = require("./models/restaurant");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // Set to `true` in production (with HTTPS)
      sameSite: "lax", // Use "none" if frontend & backend are on different origins
    },
  })
);

app.use("/uploads/", express.static("uploads"));
app.use("/customer", customerRoutes);
app.use("/restaurant", restaurantRoutes);

app.get("/api/customer", (req, res) => {
  if (req.session.customerId) {
    res.json({ customerId: req.session.customerId });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/api/restaurant", (req, res) => {
  if (req.session.restaurantId) {
    res.json({ restaurantId: req.session.restaurantId });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
