const bcrypt = require("bcryptjs");
const { Customer, Restaurant, Favourite, Cart, Dish } = require("../models");
const multer = require("multer");
const path = require("path");
const session = require("express-session");


// Restaurant Signup
exports.signup = async (req, res) => {
    try {
        const { restaurant_name, email, password, location } = req.body;
        const existingRestaurant = await Restaurant.findOne({ where: { email } });
        if (existingRestaurant) {
            return res.status(400).json({ message: 'Email already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newRestaurant = await Restaurant.create({
            restaurant_name,
            email,
            password: hashedPassword,
            location
        });

        res.status(201).json({ message: "Restaurant registered successfully", Restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Restaurant Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const restaurant = await Restaurant.findOne({ where: { email } });
        if (!restaurant || !(await bcrypt.compare(password, restaurant.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.restaurantId = restaurant.restaurant_id;
        res.status(200).json({ message: "Login successful", restaurant });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        console.log('Session destroyed');
        res.clearCookie('connect.sid'); //for testing
        res.status(200).json({ message: "Logout successful" });
    });
};


// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.session.restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, country, state, location, description, contact_info, timings } = req.body;
        await Restaurant.update({ name, country, state, location, description, contact_info, timings }, { where: { restaurant_id: req.session.restaurantId } });

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Multer storage for profile picture
const storage = multer.diskStorage({
    destination: "/uploads/",
    filename: (req, file, cb) => {
        cb(null, $date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage });
// Update Profile Picture
exports.updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const filePath = `/uploads/${req.file.filename}`;
        await Restaurant.update(
            { images: filePath },
            { where: { restaurant_id: req.session.restaurantId } }
        );
        console.log(req.session.restaurantId);
        res.json({ message: "Profile picture uploaded successfully", filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addDish = async (req, res) => {
    try {
        const { name, ingredients, price, description, category } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const dish = await Dish.create({
            restaurant_id : req.session.restaurantId,
            name,
            ingredients,
            price,
            description,
            category,
            
            image: imagePath
        });

        res.status(201).json({ message: 'Dish added successfully', dish });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding dish' });
    }
};

exports.getDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll({
            where: { restaurant_id: req.session.restaurantId }
        });
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.editDish = async (req, res) => {
//     try {
//         const { name, ingredients, price, description, category } = req.body;
//         const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//         await Dish.update({        
//             name,
//             ingredients,
//             price,
//             description,
//             category,
//             image: imagePath
//         }, {
//             where: { dish_id: req.params.dishId }
//         });

//         res.json({ message: 'Dish updated successfully' });
//     } catch (error) {    
//         res.status(500).json({ error: error.message });
//     }    
// };