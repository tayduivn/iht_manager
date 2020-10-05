const { LIST_JOBS_OF_CUSTOMER } = require("../actions/actionTypes");

var initialState = [];

const listJobOfCustomer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_JOBS_OF_CUSTOMER:
      state = action.list;
      return [...state];
    default:
      return state;
  }
};

export default listJobOfCustomer;
