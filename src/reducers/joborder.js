import { JOB_ORDER, SEARCH_ALL, ADD_JOB_ORDER } from "../actions/actionTypes";

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

const joborder = (state = initialState, action) => {
  // var index = -1;
  switch (action.type) {
    case JOB_ORDER:
      state = action.jobsorder;
      return [...state];
    case ADD_JOB_ORDER:
      state.unshift(action.joborder);
      return [...state];
    // case EDIT_JOB:
    //   index = findIndex(state, action.job.JOB_NO);
    //   state[index] = action.job;
    //   return [...state];
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default joborder;
