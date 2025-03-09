import axios from "axios";
import {
  DISH_CREATE_REQUEST,
  DISH_CREATE_SUCCESS,
  DISH_CREATE_FAIL,
} from "../constants/cartConstants";
import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
} from "../constants/cartConstants";
import {
  DISH_DETAILS_REQUEST,
  DISH_DETAILS_SUCCESS,
  DISH_DETAILS_FAIL,
  DISH_UPDATE_REQUEST,
  DISH_UPDATE_SUCCESS,
  DISH_UPDATE_FAIL,
} from "../constants/cartConstants";
import {
  DISH_DELETE_REQUEST,
  DISH_DELETE_SUCCESS,
  DISH_DELETE_FAIL,
} from "../constants/cartConstants";

export const addDish =
  ({ title, author }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DISH_CREATE_REQUEST });

      // Sending name, email, and age in the request body
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:3000/api/cart",
        { title, author }, // Pass all three variables here
        config
      );

      dispatch({ type: DISH_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DISH_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchDishes = () => async (dispatch) => {
  try {
    dispatch({ type: DISH_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:3000/api/cart");
    dispatch({ type: DISH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DISH_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getDishDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISH_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:3000/api/cart/${id}`);

    dispatch({ type: DISH_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DISH_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateDish = (id, cartData) => async (dispatch) => {
  try {
    dispatch({ type: DISH_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `http://localhost:3000/api/cart/${id}`,
      cartData,
      config
    );

    dispatch({ type: DISH_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DISH_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteDish = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISH_DELETE_REQUEST });

    await axios.delete(`http://localhost:3000/api/cart/${id}`);

    dispatch({ type: DISH_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DISH_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
