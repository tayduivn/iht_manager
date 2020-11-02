import {
  PAYMENT_DEBIT,
  ADD_PAYMENT_DEBIT,
  SEARCH_ALL,
  DELETE_DEBIT_NOTE,
} from "../actions/actionTypes";

var initialState = [];

const findIndex = (data, JOB_NO) => {
  var result = -1;
  data.forEach((customer, index) => {
    if (customer.JOB_NO === JOB_NO) {
      result = index;
    }
  });
  return result;
};

const paymentDebit = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case PAYMENT_DEBIT:
      state = action.paymentDebit;
      return [...state];
    case ADD_PAYMENT_DEBIT:
      state.unshift(action.paymentDebit);
      return [...state];
    case DELETE_DEBIT_NOTE:
      index = findIndex(state, action.JOB_NO);
      state.splice(index, 1);
      return [...state];
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default paymentDebit;
