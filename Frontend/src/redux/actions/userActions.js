import { SET_USER_TYPE, RESET_USER_TYPE } from "../constants/userConstants";

export const setUserType = (userType) => {
  console.log("set to", userType);
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};

export const resetUserType = () => {
  console.log("reset usertype");
  return {
    type: RESET_USER_TYPE,
  };
};
