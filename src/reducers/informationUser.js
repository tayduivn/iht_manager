const { INFORMATION_USER } = require("../actions/actionTypes");

var initialState = [];

const informationUser = (state = initialState, action) => {
  switch (action.type) {
    case INFORMATION_USER:
      state = action.users;
      return [...state];
    default:
      return state;
  }
};

export default informationUser;
