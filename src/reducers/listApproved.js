const { LIST_APPROVED, APPROVED } = require("../actions/actionTypes");

var initialState = [];

const listApproved = (state = initialState, action) => {
  switch (action.type) {
    case LIST_APPROVED:
      state = action.listApproved;
      return [...state];
    case APPROVED:    
      state.unshift(action.job_no);
      return [...state];
    default:
      return state;
  }
};

export default listApproved;
