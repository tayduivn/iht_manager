import {
  FETCH_PAYMENTS,
  SEARCH_ALL,
  ADD_PAYMENT,
  EDIT_PAYMENT,
} from "../actions/actionTypes";

var initialState = [];

const findIndex = (data, LENDER_NO) => {
  var result = -1;
  data.forEach((customer, index) => {
    if (customer.LENDER_NO === LENDER_NO) {
      result = index;
    }
  });
  return result;
};

const payments = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case FETCH_PAYMENTS:
      state = action.payments;
      return [...state];
    case ADD_PAYMENT:
      state.unshift(action.payment);
      return [...state];
    case EDIT_PAYMENT:
      index = findIndex(state, action.payment.LENDER_NO);
      state[index] = action.payment;
      return [...state];
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default payments;
