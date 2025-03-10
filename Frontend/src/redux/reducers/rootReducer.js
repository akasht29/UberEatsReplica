// reducers/rootReducer.js
import { combineReducers } from "redux";
import {
  dishReducer,
  dishListReducer,
  dishDetailsReducer,
  dishUpdateReducer,
  dishDeleteReducer,
} from "./cartReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  dishCreate: dishReducer,
  dishList: dishListReducer,
  dishDetails: dishDetailsReducer,
  dishUpdate: dishUpdateReducer,
  dishDelete: dishDeleteReducer,
  user: userReducer,
});

export default rootReducer;
