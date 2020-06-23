import { combineReducers } from "redux";
import getData from "./getData";
import searchReducer from "./search";
import isDrawer from "./isDrawer";

const allReducer = combineReducers({ getData, searchReducer, isDrawer });

export default allReducer;
