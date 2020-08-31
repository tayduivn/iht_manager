const { LIST_PENDING, APPROVED } = require("../actions/actionTypes");

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

const listPending = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case LIST_PENDING:
      state = action.listPending;
      return [...state];
    case APPROVED:
      index = findIndex(state, action.job_no.JOB_NO);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};

export default listPending;
