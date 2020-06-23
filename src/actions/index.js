import api from "../utils/api";

const {
  FETCH_CUSTOMERS,
  SEARCH,
  OPEN_DRAWER,
  CLOSE_DRAWER,
} = require("./actionTypes");

export const actFectCustomers = (customers) => {
  return {
    type: FETCH_CUSTOMERS,
    customers,
  };
};

export const actFectCustomersRequeset = () => {
  return (dispatch) => {
    return api("data-basic/list-customer", "GET", null).then((res) => {
      dispatch(actFectCustomers(res.data.data));
    });
  };
};

export const actSearch = (searchs) => {
  return {
    type: SEARCH,
    searchs,
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
