import Axios from "axios";

const URL = "https://job-api.ihtvn.com/api/v1/";

const api = (endpoint, method = "GET", body) => {
  console.log(body)
  return Axios({
    method: method,
    url: URL + endpoint,
    data: body,
    headers : {
      'Content-Type' : 'multipart/form-data;'
  }
  }).catch((err) => console.log(err));
};

export default api;
