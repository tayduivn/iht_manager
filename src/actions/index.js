import api from "../utils/api";
import { openNotificationWithIcon } from "../utils/help";

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
  LIST_PENDING,
  LIST_APPROVED,
  APPROVED,
  ITEM_JOB_PAYMENT,
  ADD_PAYMENT,
  EMPTY_ITEM_JOB_PAYMENT,
  EDIT_PAYMENT,
  PAYMENT_DEBIT,
  DEBIT_NOTE_NOT_CREATE,
  DETAIL_DEBIT_NOTE_NOT_CREATE,
  ADD_PAYMENT_DEBIT,
  DETAIL_DEBIT_NOTE,
  DELETE_PAYMENT,
  LIST_PEDING_KH,
  LIST_PAID_KH,
  LIST_JOBS_OF_CUSTOMER,
  INFORMATION_USER,
  APPROVE_KH,
  BOAT,
  CONT,
  DES_BOAT_CONT,
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
    return api("data-basic/customer/type=3", "GET", null).then((res) => {
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

export const actSearchAll2Request = (type, keyword) => {
  return (dispatch) => {
    return api(
      `payment/lender/search/type=${type}&value=${keyword}`,
      "GET",
      null
    ).then((res) => {
      dispatch(actSearchAll(res.data.data));
    });
  };
};

export const actSearchAllDebitRequest = (type, keyword) => {
  return (dispatch) => {
    return api(
      `payment/debit-note/search/type=${type}&value=${keyword}`,
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
    return api("payment/lender", "GET", null).then((res) => {
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
    return api(`payment/lender/des/${LENDER_NO}`, "GET", null).then((res) => {
      dispatch(actGetPayment(res.data));
    });
  };
};

export const actPayment = (payment) => {
  return {
    type: ADD_PAYMENT,
    payment,
  };
};

export const actPaymentRequest = (payment) => {
  return (dispatch) => {
    return api("payment/lender/add", "POST", payment).then((res) => {
      dispatch(actPayment(res.data.data));
      openNotificationWithIcon("success", "Thành công", "Tạo thành công");
    });
  };
};

export const actEditPayment = (payment) => {
  return {
    type: EDIT_PAYMENT,
    payment,
  };
};

export const actEditPaymentRequest = (payment) => {
  return (dispatch) => {
    return api("payment/lender/edit", "POST", payment).then((res) => {
      dispatch(actEditPayment(res.data.data));
      openNotificationWithIcon("success", "Thành công", "Cập nhật thành công");
    });
  };
};

export const actDeletePayment = (payment) => {
  return {
    type: DELETE_PAYMENT,
    payment,
  };
};

export const actDeletePaymentRequest = (payment) => {
  var form = new FormData();
  form.append("LENDER_NO", payment);
  return (dispatch) => {
    return api("payment/lender/remove", "POST", form).then((res) => {
      dispatch(actDeletePayment(payment));
      openNotificationWithIcon("success", "Thành công", "Xóa thành công");
    });
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

export const actItemJobPayment = (itemJob) => {
  return {
    type: ITEM_JOB_PAYMENT,
    itemJob,
  };
};

export const actItemJobPaymentRequest = (JOB_NO) => {
  return (dispatch) => {
    return api(`file/job-start/des/${JOB_NO}`, "GET", null).then((res) => {
      dispatch(actItemJobPayment(res.data.data));
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
      openNotificationWithIcon("success", "Thành công", "Tạo thành công");
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
      openNotificationWithIcon("success", "Thành công", "Cập nhật thành công");
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

export const actGetJobNotCreateOrdeRequest = (JOB_NO, type) => {
  return (dispatch) => {
    return api(
      `file/job-order/des/job=${JOB_NO}&type=${type}`,
      "GET",
      null
    ).then((res) => {
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
      dispatch(atctAddJobOrder(res.data.data));
      openNotificationWithIcon("success", "Thành công", "Tạo thành công");
    });
  };
};

export const actListPending = (listPending) => {
  return {
    type: LIST_PENDING,
    listPending,
  };
};

export const actListPendingRequest = () => {
  return (dispatch) => {
    return api("file/approved/list-pending", "GET", null).then((res) => {
      dispatch(actListPending(res.data.data));
    });
  };
};

export const actListApproved = (listApproved) => {
  return {
    type: LIST_APPROVED,
    listApproved,
  };
};

export const actListApprovedRequest = () => {
  return (dispatch) => {
    return api("file/approved/list-approved", "GET", null).then((res) => {
      dispatch(actListApproved(res.data.data));
    });
  };
};

export const actApproved = (job_no) => {
  return {
    type: APPROVED,
    job_no,
  };
};

export const actApprovedRequest = (JOB_NO) => {
  return (dispatch) => {
    return api("file/approved", "POST", JOB_NO).then((res) => {
      dispatch(actApproved(res.data.data));
      openNotificationWithIcon("success", "Thành công", "Cập nhật thành công");
    });
  };
};

export const actEmptyItemDetailJob = () => {
  return {
    type: EMPTY_ITEM_JOB_PAYMENT,
  };
};

export const actPaymentDebit = (paymentDebit) => {
  return {
    type: PAYMENT_DEBIT,
    paymentDebit,
  };
};

export const actGetPaymentDebitRequest = () => {
  return (dispatch) => {
    return api("payment/debit-note", "GET", null).then((res) => {
      dispatch(actPaymentDebit(res.data.data));
    });
  };
};

export const actDebitNoteNoteCreate = (debitNote) => {
  return { type: DEBIT_NOTE_NOT_CREATE, debitNote };
};

export const actDebitNoteNoteCreateRequest = () => {
  return (dispatch) => {
    return api("payment/debit-note/not-created", "GET", null).then((res) => {
      dispatch(actDebitNoteNoteCreate(res.data.data));
    });
  };
};

export const actGetDebitNotCreate = (itemJob) => {
  return {
    type: DETAIL_DEBIT_NOTE_NOT_CREATE,
    itemJob,
  };
};

export const actGetDebitNotCreateRequest = (JOB_NO) => {
  return (dispatch) => {
    return api(
      `payment/debit-note/des-job-not-created/${JOB_NO}`,
      "GET",
      null
    ).then((res) => {
      dispatch(actGetDebitNotCreate(res.data.data));
    });
  };
};

export const atctAddPaymentDebit = (paymentDebit) => {
  return {
    type: ADD_PAYMENT_DEBIT,
    paymentDebit,
  };
};

export const atctAddPaymentDebitRequest = (paymentDebit) => {
  return (dispatch) => {
    return api("payment/debit-note/add", "POST", paymentDebit).then((res) => {
      dispatch(atctAddPaymentDebit(res.data.data));
      openNotificationWithIcon("success", "Thành công", "Tạo thành công");
    });
  };
};

export const actGetDebitDes = (itemJob) => {
  return {
    type: DETAIL_DEBIT_NOTE,
    itemJob,
  };
};

export const actGetDebitDesRequest = (JOB_NO) => {
  return (dispatch) => {
    return api(`payment/debit-note/des/${JOB_NO}`, "GET", null).then((res) => {
      dispatch(actGetDebitDes(res.data));
    });
  };
};

export const actListPendingKH = (listPendingKH) => {
  return {
    type: LIST_PEDING_KH,
    listPendingKH,
  };
};

export const actListPendingKHRequest = () => {
  return (dispatch) => {
    return api("payment/paid-debit/list-pending", "GET", null).then((res) => {
      dispatch(actListPendingKH(res.data.data));
    });
  };
};

export const actListPaidKH = (listPaidKH) => {
  return {
    type: LIST_PAID_KH,
    listPaidKH,
  };
};

export const actListPaidKHRequest = () => {
  return (dispatch) => {
    return api("payment/paid-debit/list-paid", "GET", null).then((res) => {
      dispatch(actListPaidKH(res.data.data));
    });
  };
};

export const actListJobsOfCustomer = (list) => {
  return {
    type: LIST_JOBS_OF_CUSTOMER,
    list,
  };
};

export const actactListJobsOfCustomerRequest = (CUST_NO) => {
  return (dispatch) => {
    return api(`print/file/job-order/custno=${CUST_NO}`, "GET", null).then(
      (res) => {
        dispatch(actListJobsOfCustomer(res.data.job_m));
      }
    );
  };
};

export const fetchInformationUser = (users) => {
  return {
    type: INFORMATION_USER,
    users,
  };
};

export const actFetchInformationUser = () => {
  return (dispatch) => {
    return api("system/user", "GET", null).then((res) => {
      dispatch(fetchInformationUser(res.data.data));
    });
  };
};

export const actListApprovedKH = (listApproved) => {
  return {
    type: APPROVE_KH,
    listApproved,
  };
};

export const actListApprovedKHRequest = (values) => {
  var form = new FormData();
  form.append("JOB_NO", values);
  form.append("TYPE", "1");
  return (dispatch) => {
    return api("payment/paid-debit/change", "POST", form).then((res) => {
      dispatch(actListApprovedKH(values));
      openNotificationWithIcon(
        "success",
        "Thành công",
        `Job No: ${values} đã được duyệt thành công.`
      );
    });
  };
};

export const actListBoat = (list) => {
  return {
    type: BOAT,
    list,
  };
};

export const actListBoatRequest = () => {
  return (dispatch) => {
    return api(`payment/boat-fee/list-boat-month-m`, "GET", null).then(
      (res) => {
        dispatch(actListBoat(res.data.data));
      }
    );
  };
};

export const actListCont = (list) => {
  return {
    type: CONT,
    list,
  };
};

export const actListContRequest = () => {
  return (dispatch) => {
    return api(`payment/boat-fee/list-fee-month-m`, "GET", null).then((res) => {
      dispatch(actListCont(res.data.data));
    });
  };
};

export const actDesBoatCont = (des) => {
  return {
    type: DES_BOAT_CONT,
    des,
  };
};

export const actDesBoatContRequest = (type, value) => {
  return (dispatch) => {
    return api(
      `payment/boat-fee/des-month/type=${type}&value=${value}`,
      "GET",
      null
    ).then((res) => {
      dispatch(actDesBoatCont(res.data.data));
    });
  };
};
