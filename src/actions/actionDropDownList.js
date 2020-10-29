import api from "../utils/api";
import {
  DROP_DOWN_AGENT,
  DROP_DOWN_CARRIER,
  DROP_DOWN_CUSTOMER,
  DROP_DOWN_JOB,
  DROP_DOWN_JOB_ORDER,
  DROP_DOWN_STAFF,
} from "./actionTypes";

export const actDropDownCustomer = (customer) => {
  return {
    type: DROP_DOWN_CUSTOMER,
    customer,
  };
};

export const actDropDownCustomerRequest = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=1", "GET", null).then((res) => {
      dispatch(actDropDownCustomer(res.data.data));
    });
  };
};

export const actDropDownStaff = (staff) => {
  return {
    type: DROP_DOWN_STAFF,
    staff,
  };
};

export const actDropDownStaffRequest = () => {
  return (dispatch) => {
    return api("data-basic/staff-customs", "GET", null).then((res) => {
      dispatch(actDropDownStaff(res.data.data));
    });
  };
};

export const actDropDownJob = (job) => {
  return {
    type: DROP_DOWN_JOB,
    job,
  };
};

export const actDropDownJobRequest = () => {
  return (dispatch) => {
    return api("file/job-start", "GET", null).then((res) => {
      dispatch(actDropDownJob(res.data.data));
    });
  };
};

export const actDropDownJobOrder = (joborder) => {
  return {
    type: DROP_DOWN_JOB_ORDER,
    joborder,
  };
};

export const actDropDownJobOrderRequest = () => {
  return (dispatch) => {
    return api("file/job-order", "GET", null).then((res) => {
      dispatch(actDropDownJobOrder(res.data.data));
    });
  };
};

export const actDropDownCarrie = (carrier) => {
  return {
    type: DROP_DOWN_CARRIER,
    carrier,
  };
};

export const actDropDownCarrieRequest = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=2", "GET", null).then((res) => {
      dispatch(actDropDownCarrie(res.data.data));
    });
  };
};

export const actDropDownAgent = (agent) => {
  return {
    type: DROP_DOWN_AGENT,
    agent,
  };
};

export const actDropDownAgentRequest = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=3", "GET", null).then((res) => {
      dispatch(actDropDownAgent(res.data.data));
    });
  };
};
