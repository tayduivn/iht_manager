const { FECTH_COSTS } = require("../actions/actionTypes");

var initialState = [];

const costs = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_COSTS:
      state = action.costs;
      return [...state];
    default:
      return state;
  }
};

export default costs