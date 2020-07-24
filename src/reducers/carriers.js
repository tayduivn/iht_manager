const {
  FETCH_CARRIERS,
  ADD_CARRIER,
  EDIT_CARRIER,
} = require("../actions/actionTypes");

var initialState = [];

const findIndex = (data, CUST_NO) => {
  var result = -1;
  data.forEach((carier, index) => {
    if (carier.CUST_NO === CUST_NO) {
      result = index;
    }
  });
  return result;
};

const carriers = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case FETCH_CARRIERS:
      state = action.carriers;
      return [...state];
    case ADD_CARRIER:
      state.unshift(action.carrier);
      return [...state];
    case EDIT_CARRIER:
      index = findIndex(state, action.carrier.CUST_NO);
      state[index] = action.carrier;
      return [...state];
    default:
      return state;
  }
};

export default carriers;
