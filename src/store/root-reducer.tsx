import { combineReducers } from "redux";
import { cartReducer } from "./cart-dropdown/cart_dropdown.reducer";

import { categoriesReducer } from "./categories/category-reducer";
import { userReducer } from "./user/user-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
