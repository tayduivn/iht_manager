import {
  DROP_DOWN_AGENT,
  DROP_DOWN_CARRIER,
  DROP_DOWN_CUSTOMER,
  DROP_DOWN_JOB,
  DROP_DOWN_JOB_ORDER,
  DROP_DOWN_STAFF,
} from "../actions/actionTypes";

var initialState = {
  customer: [],
  staff: [],
  job: [],
  job_order: [],
  carrier: [],
  agent: [],
};

const dropdown = (state = initialState, action) => {
  switch (action.type) {
    case DROP_DOWN_CUSTOMER:
      state.customer = action.customer;
      return { ...state };
    case DROP_DOWN_STAFF:
      state.staff = action.staff;
      return { ...state };
    case DROP_DOWN_JOB:
      state.job = action.job;
      return { ...state };
    case DROP_DOWN_JOB_ORDER:
      state.job_order = action.joborder;
      return { ...state };
    case DROP_DOWN_CARRIER:
      state.carrier = action.carrier;
      return { ...state };
    case DROP_DOWN_AGENT:
      state.agent = action.agent;
      return { ...state };
    default:
      return state;
  }
};

export default dropdown;
