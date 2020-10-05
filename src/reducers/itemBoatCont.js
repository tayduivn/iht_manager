import { DES_BOAT_CONT } from "../actions/actionTypes";

var initialState = [];

const itemBoatCont = (state = initialState, action) => {
  switch (action.type) {
    case DES_BOAT_CONT:
      state = action.des;
      return [...state];
    default:
      return state;
  }
};

export default itemBoatCont;
