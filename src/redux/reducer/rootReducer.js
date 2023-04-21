import { combineReducers } from "redux";

import cartReducer from "./counterReducer";

const rootReducer = combineReducers({
  counter: cartReducer,
});

export default rootReducer;
