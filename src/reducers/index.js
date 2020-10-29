import { combineReducers } from "redux";
import customers from "./customers";
import searchReducer from "./search";
import isDrawer from "./isDrawer";
import staffs from "./staffs";
import costs from "./costs";
import carriers from "./carriers";
import agents from "./agents";
import garages from "./garages";
import brands from "./brands";
import itemCustomer from "./itemCustomer";
import payments from "./payments";
import jobs from "./jobs";
import jobsnco from "./jobsnco";
import joborder from "./joborder";
import listPending from "./listPending";
import listApproved from "./listApproved";
import itemJobPayment from "./itemJobPayment";
import paymentDebit from "./paymentDebit";
import listPendingKH from "./listPendingKH";
import listJobOfCustomer from "./listJobOfCustomer";
import informationUser from "./informationUser";
import boat from "./boat";
import itemBoatCont from "./itemBoatCont";
import isLoading from "./isLoading";
import dropdown from "./dropdown";

const allReducer = combineReducers({
  customers,
  searchReducer,
  isDrawer,
  staffs,
  costs,
  carriers,
  agents,
  garages,
  brands,
  itemCustomer,
  payments,
  jobs,
  jobsnco,
  joborder,
  listPending,
  listApproved,
  itemJobPayment,
  paymentDebit,
  listJobOfCustomer,
  listPendingKH,
  informationUser,
  boat,
  itemBoatCont,
  isLoading,
  dropdown
});

export default allReducer;
