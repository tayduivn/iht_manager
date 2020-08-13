const {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL_EDIT,
} = require("../actions/actionTypes");

var initialState = false;

const isDrawer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      state = true;
      return state;
    case CLOSE_DRAWER:
      state = false;
      return state;
    case OPEN_MODAL:
      state = true;
      return state;
    case CLOSE_MODAL:
      state = false;
      return state;
    case OPEN_MODAL_EDIT:
      state = true;
      return state;
    default:
      return state;
  }
};

export default isDrawer;
