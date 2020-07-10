import Axios from "axios";
import { notification } from "antd";

const URL = "https://job-api.ihtvn.com/api/v1/";

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Notification Title",
    description:
      "Có lỗi xảy ra vui lòng thực hiện lại.",
  });
};

const api = (endpoint, method = "GET", body) => {
  return Axios({
    method: method,
    url: URL + endpoint,
    data: body,
  }).catch((err) => {
    openNotificationWithIcon("warning");
  });
};

export default api;
