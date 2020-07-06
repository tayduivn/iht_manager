import { DETAIL_CUSTOMER } from "../actions/actionTypes";

var initialState = {}

const itemEditing = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_CUSTOMER:
      state = action.itemCustomer
      return {...state};
    default:
      return state;
  }
};

export default itemEditing