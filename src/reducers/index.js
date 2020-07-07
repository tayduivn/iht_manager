import { combineReducers } from "redux";
import customers from "./customers";
import searchReducer from "./search";
import isDrawer from "./isDrawer";
import staffs from "./staffs";
import costs from "./costs";
import carriers from "./carriers";
import agents from "./agents";
import garages from "./garages";
import brands from "./brands";
import itemCustomer from './itemCustomer'
import login from './login'

const allReducer = combineReducers({
  customers,
  searchReducer,
  isDrawer,
  staffs,
  costs,
  carriers,
  agents,
  garages,
  brands,
  itemCustomer,
  login
});

export default allReducer;
