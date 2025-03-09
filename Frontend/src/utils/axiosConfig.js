// src/utils/axiosConfig.js
import axios from "axios";

// Configure Axios globally
axios.defaults.baseURL = "http://localhost:3000"; // Your API URL
axios.defaults.withCredentials = true; // Send credentials (cookies) with every request

export default axios;
