import { LOGIN } from "../actions/actionTypes";

var initialState = {};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      state = action.users;
      return { ...state };
    default:
      return state;
  }
};

export default login;
