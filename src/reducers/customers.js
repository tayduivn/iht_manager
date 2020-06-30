const { FETCH_CUSTOMERS } = require("../actions/actionTypes");

var initialState = [];

const customers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      state = action.customers;
      return [...state];
    default:
      return state;
  }
};

export default customers;