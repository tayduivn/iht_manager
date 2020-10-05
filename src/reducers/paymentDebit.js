import { PAYMENT_DEBIT, ADD_PAYMENT_DEBIT, SEARCH_ALL } from "../actions/actionTypes";

var initialState = [];

const paymentDebit = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_DEBIT:
      state = action.paymentDebit;
      return [...state];
    case ADD_PAYMENT_DEBIT:
      state.unshift(action.paymentDebit);
      return [...state];
      case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default paymentDebit;
