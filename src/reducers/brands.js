const { FETCH_BRANDS } = require("../actions/actionTypes");

var initialState = [];

const brands = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDS:
      state = action.brands;
      return [...state];
    default:
      return state;
  }
};

export default brands