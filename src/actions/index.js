import api from "../utils/api";

const {
  FETCH_CUSTOMERS,
  SEARCH,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  FETCH_STAFFS,
  FECTH_COSTS,
  FETCH_CARRIERS,
  FETCH_AGENTS,
  FETCH_GARAGES,
  FETCH_BRANDS,
  DETAIL_CUSTOMER,
  DETAIL_STAFF,
  EMPTY_DETAIL,
  ADD_CUSTOMERS,
  EDIT_CUSTOMER,
  ADD_STAFF,
  EDIT_STAFF,
  DETAIL_CARRIER,
  ADD_CARRIER,
  EDIT_CARRIER,
  FETCH_PAYMENTS,
  DETAIL_PAYMENT,
  FETCH_JOBS,
  DETAIL_JOB,
  ADD_JOB,
  SEARCH_ALL,
  EDIT_JOB,
  OPEN_MODAL,
  CLOSE_MODAL,
  JOB_NOT_CREATE_ORDER,
  DETAIL_JOB_NOT_CREATE_ORDER,
  JOB_ORDER,
  ADD_JOB_ORDER,
  EMPTY_DETAIL_JOB,
  OPEN_MODAL_EDIT,
} = require("./actionTypes");

//Cusomter
export const actFetchCustomers = (customers) => {
  return {
    type: FETCH_CUSTOMERS,
    customers,
  };
};

export const actFetchCustomersRequeset = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=1", "GET", null).then((res) => {
      dispatch(actFetchCustomers(res.data.data));
    });
  };
};

export const actGetCustomer = (itemCustomer) => {
  return {
    type: DETAIL_CUSTOMER,
    itemCustomer,
  };
};

export const actGetCustomerRequeset = (CUST_NO) => {
  return (dispatch) => {
    return api(
      `data-basic/customer/des/id=${CUST_NO}/type=1`,
      "GET",
      null
    ).then((res) => {
      dispatch(actGetCustomer(res.data.data));
    });
  };
};

export const actAddCustomer = (customer) => {
  return {
    type: ADD_CUSTOMERS,
    customer,
  };
};

export const actAddCustomerRequest = (customer) => {
  return (dispatch) => {
    return api("data-basic/customer/add/", "POST", customer).then((res) => {
      dispatch(actAddCustomer(res.data.data));
    });
  };
};

export const actEditCustomer = (customer) => {
  return {
    type: EDIT_CUSTOMER,
    customer,
  };
};

export const actEditCustomerRequest = (customer) => {
  return (dispatch) => {
    return api("data-basic/customer/edit", "POST", customer).then((res) => {
      dispatch(actEditCustomer(res.data.data));
    });
  };
};

//staffs
export const actFetchStaffs = (staffs) => {
  return {
    type: FETCH_STAFFS,
    staffs,
  };
};

export const actFetchStaffsRequest = () => {
  return (dispatch) => {
    return api("data-basic/staff-customs", "GET", null).then((res) => {
      dispatch(actFetchStaffs(res.data.data));
    });
  };
};

export const actGetStaff = (itemCustomer) => {
  return {
    type: DETAIL_STAFF,
    itemCustomer,
  };
};

export const actGetStaffRequeset = (PNL_NO) => {
  return (dispatch) => {
    return api(`data-basic/staff-customs/des/${PNL_NO}`, "GET", null).then(
      (res) => {
        dispatch(actGetStaff(res.data.data));
      }
    );
  };
};

export const actAddStaff = (staff) => {
  return {
    type: ADD_STAFF,
    staff,
  };
};

export const actAddStaffRequest = (staff) => {
  return (dispatch) => {
    return api("data-basic/staff-customs/add", "POST", staff).then((res) => {
      dispatch(actAddStaff(res.data.data));
    });
  };
};

export const actEditStaff = (staff) => {
  return {
    type: EDIT_STAFF,
    staff,
  };
};

export const actEditStafffRequest = (staff) => {
  return (dispatch) => {
    return api("data-basic/staff-customs/edit", "POST", staff).then((res) => {
      dispatch(actEditStaff(res.data.data));
    });
  };
};

//costs

export const actFetchCosts = (costs) => {
  return {
    type: FECTH_COSTS,
    costs,
  };
};

export const actFetchCostsRequest = () => {
  return (dispatch) => {
    return api("data-basic/type-cost", "GET", null).then((res) => {
      dispatch(actFetchCosts(res.data.data));
    });
  };
};

//Carriers
export const actFetchCarriers = (carriers) => {
  return {
    type: FETCH_CARRIERS,
    carriers,
  };
};

export const actFetchCarriersRequest = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=2", "GET", null).then((res) => {
      dispatch(actFetchCarriers(res.data.data));
    });
  };
};

export const actGetCarrier = (itemCustomer) => {
  return {
    type: DETAIL_CARRIER,
    itemCustomer,
  };
};

export const actGetCarrierRequeset = (CUST_NO) => {
  return (dispatch) => {
    return api(
      `data-basic/customer/des/id=${CUST_NO}/type=2`,
      "GET",
      null
    ).then((res) => {
      dispatch(actGetCarrier(res.data.data));
    });
  };
};

export const actAddCarrier = (carrier) => {
  return {
    type: ADD_CARRIER,
    carrier,
  };
};

export const actAddCarrierRequest = (carrier) => {
  return (dispatch) => {
    return api("data-basic/customer/add", "POST", carrier).then((res) => {
      dispatch(actAddCarrier(res.data.data));
    });
  };
};

export const actEditCarrier = (carrier) => {
  return {
    type: EDIT_CARRIER,
    carrier,
  };
};

export const actEditCarrierRequest = (carrier) => {
  return (dispatch) => {
    return api("data-basic/customer/edit", "POST", carrier).then((res) => {
      dispatch(actEditCarrier(res.data.data));
    });
  };
};

//agents
export const actFetchAgents = (agents) => {
  return {
    type: FETCH_AGENTS,
    agents,
  };
};

export const actFetchAgentsRequest = () => {
  return (dispatch) => {
    return api("data-basic/customer/type=4", "GET", null).then((res) => {
      dispatch(actFetchAgents(res.data.data));
    });
  };
};

//Garages
export const actFetchGarages = (garages) => {
  return {
    type: FETCH_GARAGES,
    garages,
  };
};

export const actFetchGaragesRequest = () => {
  return (dispatch) => {
    return api("data-basic/agent", "GET", null).then((res) => {
      dispatch(actFetchGarages(res.data.data));
    });
  };
};

//Brands
export const actFetchBrands = (brands) => {
  return {
    type: FETCH_BRANDS,
    brands,
  };
};

export const actFetchBrandsRequest = () => {
  return (dispatch) => {
    return api("data-basic/branch", "GET", null).then((res) => {
      dispatch(actFetchBrands(res.data.data));
    });
  };
};

export const actSearch = (searchs) => {
  return {
    type: SEARCH,
    searchs,
  };
};

export const actSearchAll = (searchs) => {
  return {
    type: SEARCH_ALL,
    searchs,
  };
};

export const actSearchAllRequest = (type, keyword) => {
  return (dispatch) => {
    return api(
      `file/job-start/search/type=${type}&value=${keyword}`,
      "GET",
      null
    ).then((res) => {
      dispatch(actSearchAll(res.data.data));
    });
  };
};

export const actOpenDrawer = () => {
  return {
    type: OPEN_DRAWER,
  };
};

export const actCloseDrawer = () => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const actEmptyDetail = () => {
  return {
    type: EMPTY_DETAIL,
  };
};

export const actEmptyDetailJob = () => {
  return {
    type: EMPTY_DETAIL_JOB,
  };
};

export const actFetchPayments = (payments) => {
  return {
    type: FETCH_PAYMENTS,
    payments,
  };
};

export const actFetchPaymentsRequeset = () => {
  return (dispatch) => {
    return api("payment/advance-slip", "GET", null).then((res) => {
      dispatch(actFetchPayments(res.data.data));
    });
  };
};

export const actGetPayment = (itemPayment) => {
  return {
    type: DETAIL_PAYMENT,
    itemPayment,
  };
};

export const actGetPaymentRequeset = (LENDER_NO) => {
  return (dispatch) => {
    return api(`payment/advance-slip/des/${LENDER_NO}`, "GET", null).then(
      (res) => {
        dispatch(actGetPayment(res.data.data));
      }
    );
  };
};

//Job
export const actFetchJobs = (jobs) => {
  return { type: FETCH_JOBS, jobs };
};

export const actFetchJobsRequest = () => {
  return (dispatch) => {
    return api("file/job-start", "GET", null).then((res) => {
      dispatch(actFetchJobs(res.data.data));
    });
  };
};

export const actGetJob = (itemJob) => {
  return {
    type: DETAIL_JOB,
    itemJob,
  };
};

export const actGetJobRequest = (JOB_NO) => {
  return (dispatch) => {
    return api(`file/job-start/des/${JOB_NO}`, "GET", null).then((res) => {
      dispatch(actGetJob(res.data.data));
    });
  };
};

export const actAddJob = (job) => {
  return {
    type: ADD_JOB,
    job,
  };
};

export const actAddJobRequest = (job) => {
  return (dispatch) => {
    return api("file/job-start/add", "POST", job).then((res) => {
      dispatch(actAddJob(res.data.data));
    });
  };
};

export const actEditJob = (job) => {
  return {
    type: EDIT_JOB,
    job,
  };
};

export const actEditJobRequest = (job) => {
  return (dispatch) => {
    return api("file/job-start/edit", "POST", job).then((res) => {
      dispatch(actEditJob(res.data.data));
    });
  };
};

export const actOpenModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const actOpenModalEdit = () => {
  return {
    type: OPEN_MODAL_EDIT,
  };
};

export const actCloseModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const actJobNotCreateOrder = (jobs) => {
  return { type: JOB_NOT_CREATE_ORDER, jobs };
};

export const actJobNotCreateOrderRequest = () => {
  return (dispatch) => {
    return api("file/job-start/not-created", "GET", null).then((res) => {
      dispatch(actJobNotCreateOrder(res.data.data));
    });
  };
};

export const actGetJobNotCreateOrde = (itemJob) => {
  return {
    type: DETAIL_JOB_NOT_CREATE_ORDER,
    itemJob,
  };
};

export const actGetJobNotCreateOrdeRequest = (JOB_NO) => {
  return (dispatch) => {
    return api(`file/job-order/des/${JOB_NO}`, "GET", null).then((res) => {
      console.log(res.data)
      dispatch(actGetJobNotCreateOrde(res.data));
    });
  };
};

export const actGetJobOrder = (jobsorder) => {
  return {
    type: JOB_ORDER,
    jobsorder,
  };
};

export const actGetJobOrderRequest = () => {
  return (dispatch) => {
    return api("file/job-order", "GET", null).then((res) => {
      dispatch(actGetJobOrder(res.data.data));
    });
  };
};

export const atctAddJobOrder = (joborder) => {
  return {
    type: ADD_JOB_ORDER,
    joborder,
  };
};

export const actAddJobOrderRequest = (joborder) => {
  return (dispatch) => {
    return api("file/job-order/add", "POST", joborder).then((res) => {
      console.log(res);
      dispatch(atctAddJobOrder(res.data.data));
    });
  };
};
