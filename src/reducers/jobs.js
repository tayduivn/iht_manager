import {
  FETCH_JOBS,
  ADD_JOB,
  SEARCH_ALL,
  EDIT_JOB,
  DELETE_JOB_FOLLOW,
} from "../actions/actionTypes";

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

const jobs = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case FETCH_JOBS:
      state = action.jobs;
      return [...state];
    case ADD_JOB:
      state.unshift(action.job);
      return [...state];
    case EDIT_JOB:
      index = findIndex(state, action.job.JOB_NO);
      state[index] = action.job;
      return [...state];
    case DELETE_JOB_FOLLOW:
      index = findIndex(state, action.job);
      state.splice(index, 1)
      return [...state];
    case SEARCH_ALL:
      state = action.searchs;
      return [...state];
    default:
      return state;
  }
};

export default jobs;
