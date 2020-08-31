const { SEARCH } = require("../actions/actionTypes");

var initialState = [];

var searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      console.log(action)
      return action.searchs;
    default:
      return state;
  }
};
export default searchReducer;
