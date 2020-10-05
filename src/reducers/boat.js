const { BOAT, CONT } = require("../actions/actionTypes");

var initialState = [];

const boat = (state = initialState, action) => {
  switch (action.type) {
    case BOAT:
      state = action.list;
      return [...state];
    case CONT:
      state = action.list;
      return [...state];
    default:
      return state;
  }
};

export default boat;
