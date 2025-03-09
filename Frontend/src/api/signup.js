// src/api/signup.js
import axios from "axios";

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/customer/signup", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error("Error creating account");
  }
};
