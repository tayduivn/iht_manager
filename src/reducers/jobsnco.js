import {
  JOB_NOT_CREATE_ORDER,
  DEBIT_NOTE_NOT_CREATE,
} from "../actions/actionTypes";

var initialState = [];

const jobsnco = (state = initialState, action) => {
  switch (action.type) {
    case JOB_NOT_CREATE_ORDER:
      state = action.jobs;
      return [...state];
    case DEBIT_NOTE_NOT_CREATE:
      state = action.debitNote;
      return [...state];
    default:
      return state;
  }
};

export default jobsnco;
