require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const customerRoutes = require("./routes/customerRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const session = require("express-session");
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true                 
}));
app.use(bodyParser.json());
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));
app.use('/uploads', express.static('uploads'));
app.use("/customer", customerRoutes)
app.use("/restaurant", restaurantRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
