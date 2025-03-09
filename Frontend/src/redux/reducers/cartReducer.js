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

const initialState = { loading: false, dish: null, error: null };

export const dishReducer = (state = initialState, action) => {
  console.log("dishReducer action:", action); // Debug: Log action
  switch (action.type) {
    case DISH_CREATE_REQUEST:
      return { ...state, loading: true };

    case DISH_CREATE_SUCCESS:
      return { loading: false, dish: action.payload, error: null };

    case DISH_CREATE_FAIL:
      return { loading: false, error: action.payload, dish: null };

    default:
      return state;
  }
};

export const dishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISH_LIST_REQUEST:
      return { ...state, loading: true };

    case DISH_LIST_SUCCESS:
      return { loading: false, dishes: action.payload, error: null };

    case DISH_LIST_FAIL:
      return { loading: false, dishes: [], error: action.payload };

    default:
      return state;
  }
};

const initialDetailsState = { loading: false, dish: null, error: null };

export const dishDetailsReducer = (state = initialDetailsState, action) => {
  switch (action.type) {
    case DISH_DETAILS_REQUEST:
      return { ...state, loading: true };
    case DISH_DETAILS_SUCCESS:
      return { loading: false, dish: action.payload, error: null };
    case DISH_DETAILS_FAIL:
      return { loading: false, dish: null, error: action.payload };
    default:
      return state;
  }
};

const initialUpdateState = { loading: false, success: false, error: null };

export const dishUpdateReducer = (state = initialUpdateState, action) => {
  switch (action.type) {
    case DISH_UPDATE_REQUEST:
      return { loading: true };
    case DISH_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case DISH_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialDeleteState = { loading: false, success: false, error: null };

export const dishDeleteReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case DISH_DELETE_REQUEST:
      return { loading: true };
    case DISH_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DISH_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
