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
} = require("./actionTypes");

export const actFetchCustomers = (customers) => {
  return {
    type: FETCH_CUSTOMERS,
    customers,
  };
};

export const actFetchCustomersRequeset = () => {
  return (dispatch) => {
    return api("data-basic/customer", "GET", null).then((res) => {
      dispatch(actFetchCustomers(res.data.data));
    });
  };
};

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

export const actFetchCarriers = (carriers) => {
  return {
    type: FETCH_CARRIERS,
    carriers,
  };
};

export const actFetchCarriersRequest = () => {
  return (dispatch) => {
    return api("data-basic/carriers", "GET", null).then((res) => {
      dispatch(actFetchCarriers(res.data.data));
    });
  };
};

export const actFetchAgents = (agents) => {
  return {
    type: FETCH_AGENTS,
    agents,
  };
};

export const actFetchAgentsRequest = () => {
  return (dispatch) => {
    return api("data-basic/agent", "GET", null).then((res) => {
      dispatch(actFetchAgents(res.data.data));
    });
  };
};

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
