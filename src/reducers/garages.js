const { FETCH_GARAGES } = require("../actions/actionTypes");

var initialState = [];

const garages = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GARAGES:
      state = action.costs;
      return [...state];
    default:
      return state;
  }
};

export default garages;
