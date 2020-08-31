import { FETCH_PAYMENTS, SEARCH_ALL } from "../actions/actionTypes";

var initialState = [];

const payments = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS:
      state = action.payments;
      return [...state];
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default payments;
