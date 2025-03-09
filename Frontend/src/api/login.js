// src/api/login.js
import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/customer/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
