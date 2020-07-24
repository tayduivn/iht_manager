import { FETCH_PAYMENTS } from "../actions/actionTypes";

var initialState = [];

const payments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS:
      state = action.payments;
      return [...state];
    default:
      return state;
  }
};

export default payments;
