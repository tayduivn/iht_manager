const { FETCH_STAFFS } = require("../actions/actionTypes");

var initialState = [];

const staffs = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFFS:
      state = action.staffs
      return [...state];
    default:
      return state;
  }
};

export default staffs;
