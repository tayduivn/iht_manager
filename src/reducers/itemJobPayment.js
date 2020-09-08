import { ITEM_JOB_PAYMENT, EMPTY_ITEM_JOB_PAYMENT } from "../actions/actionTypes";

var initialState = {};

const itemJobPayment = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_JOB_PAYMENT:
      state = action.itemJob;
      return { ...state };
    case EMPTY_ITEM_JOB_PAYMENT:
      state = {};
      return state
    default:
      return state;
  }
};

export default itemJobPayment;
