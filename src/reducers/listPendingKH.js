const {
  LIST_PEDING_KH,
  APPROVE_KH,
} = require("../actions/actionTypes");

var initialState = [];

const findIndex = (data, JOB_NO) => {
  var result = -1;
  data.forEach((customer, index) => {
    if (customer.JOB_NO === JOB_NO) {
      result = index;
    }
  });
  return result;
};

const listPendingKH = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case LIST_PEDING_KH:
      state = action.listPendingKH;
      return [...state];
    case APPROVE_KH:
      index = findIndex(state, action.listApproved);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};

export default listPendingKH;
