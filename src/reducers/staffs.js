const {
  FETCH_STAFFS,
  ADD_STAFF,
  EDIT_STAFF,
} = require("../actions/actionTypes");

var initialState = [];

const findIndex = (data, PNL_NO) => {
  var result = -1;
  data.forEach((staff, index) => {
    if (staff.PNL_NO === PNL_NO) {
      result = index;
    }
  });
  return result;
};

const staffs = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case FETCH_STAFFS:
      state = action.staffs;
      return [...state];
    case ADD_STAFF:
      console.log(action)
      state.unshift(action.staff);
      return [...state];
    case EDIT_STAFF:
      index = findIndex(state, action.staff.PNL_NO);
      state[index] = action.staff;
      return [...state];
    default:
      return state;
  }
};

export default staffs;
