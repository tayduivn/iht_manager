const { FETCH_CARRIERS } = require("../actions/actionTypes");

var initialState = [];

const carriers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARRIERS:
      state = action.carriers;
      return [...state];
    default:
      return state;
  }
};

export default carriers