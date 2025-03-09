import { combineReducers } from "redux";
import {
  dishReducer,
  dishListReducer,
  dishDetailsReducer,
  dishUpdateReducer,
  dishDeleteReducer,
} from "./cartReducer";

const rootReducer = combineReducers({
  dishCreate: dishReducer,
  dishList: dishListReducer,
  dishDetails: dishDetailsReducer,
  dishUpdate: dishUpdateReducer,
  dishDelete: dishDeleteReducer,
});

// Debug: Log the rootReducer state
console.log("Root Reducer State:", rootReducer);

export default rootReducer;
