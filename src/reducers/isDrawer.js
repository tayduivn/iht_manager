const { OPEN_DRAWER, CLOSE_DRAWER } = require("../actions/actionTypes");

var initialState = false;

const isDrawer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
    state = true
      return state;
    case CLOSE_DRAWER:
        state = false
      return state;
    default:
      return state;
  }
};

export default isDrawer;
