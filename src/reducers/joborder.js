import { JOB_ORDER, SEARCH_ALL, ADD_JOB_ORDER } from "../actions/actionTypes";

var initialState = [];



const joborder = (state = initialState, action) => {
  // var index = -1;
  switch (action.type) {
    case JOB_ORDER:
      state = action.jobsorder;
      return [...state];
    case ADD_JOB_ORDER:
      state.unshift(action.joborder);
      return [...state];
 
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default joborder;
