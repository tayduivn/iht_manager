import { combineReducers } from "redux";
import getData from "./getData";
import searchReducer from "./search";

const allReducer = combineReducers({ getData, searchReducer });

export default allReducer;
