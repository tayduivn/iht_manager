import Axios from "axios";

const URL = "https://job-api.ihtvn.com/api/v1/";

const api = (endpoint, method = "GET", body) => {
  return Axios({
    method: method,
    url: URL + endpoint,
    data: body
  }).catch((err) => console.log(err));
};

export default api;