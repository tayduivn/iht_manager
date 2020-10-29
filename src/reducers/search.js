const { SEARCH } = require("../actions/actionTypes");

var initialState = [];

var searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.searchs;
    default:
      return state;
  }
};
export default searchReducer;
