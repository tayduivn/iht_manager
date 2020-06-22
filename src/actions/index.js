import api from "../utils/api";

const { FETCH_CUSTOMERS } = require("./actionTypes");

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