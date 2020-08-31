const {
  FETCH_CUSTOMERS,
  ADD_CUSTOMERS,
  EDIT_CUSTOMER,
} = require("../actions/actionTypes");

var initialState = [];

const findIndex = (data, CUST_NO) => {
  var result = -1;
  data.forEach((customer, index) => {
    if (customer.CUST_NO === CUST_NO) {
      result = index;
    }
  });
  return result;
};

const customers = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case FETCH_CUSTOMERS:
      state = action.customers;
      return [...state];
    case ADD_CUSTOMERS:
      state.unshift(action.customer);
      return [...state];
    case EDIT_CUSTOMER:
      index = findIndex(state, action.customer.CUST_NO);
      state[index] = action.customer;
      return [...state];
    default:
      return state;
  }
};

export default customers;
