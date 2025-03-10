import { SET_USER_TYPE, RESET_USER_TYPE } from "../constants/userConstants";

const persistedUserType = localStorage.getItem("userType");

const initialState = {
  userType: persistedUserType ? persistedUserType : null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return { ...state, userType: action.payload };
    case RESET_USER_TYPE:
      return { ...state, userType: null };
    default:
      return state;
  }
};
