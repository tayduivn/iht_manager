import { DETAIL_CUSTOMER, DETAIL_STAFF, EMPTY_DETAIL } from "../actions/actionTypes";

var initialState = {};

const itemEditing = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_CUSTOMER:
      state = action.itemCustomer;
      return { ...state };
    case DETAIL_STAFF:
      state = action.itemCustomer;
      return { ...state };
      case EMPTY_DETAIL:
        state = {}
        return {...state}
    default:
      return state;
  }
};

export default itemEditing;
