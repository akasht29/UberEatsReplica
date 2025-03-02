require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connected!');
});
