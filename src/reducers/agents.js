const { FETCH_AGENTS } = require("../actions/actionTypes");

var initialState = [];

const agents = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENTS:
      state = action.agents;
      return [...state];
    default:
      return state;
  }
};

export default agents