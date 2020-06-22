import BasicDataPage from "./Pages/BasicDataPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import LayoutPage from "./Layout";
import LoginPage from "./Pages/LoginPage";
import ManageFilePage from "./Pages/ManageFilePage";
import InformationCompany from "./Pages/BasicDataPage/InformationCompany";
import InformationCustomer from "./Pages/BasicDataPage/InformationCustomer";

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/dasboard",
    component: LayoutPage,
    routes: [
      {
        name: "Dữ Liệu Cơ Bản",
        path: "/dasboard/dulieucoban",
        component: BasicDataPage,
        routes: [
          {
            name: "Thông Tin Công Ty",
            path: "/dasboard/dulieucoban/thongtincongty",
            component: InformationCompany,
          },
          {
            name: "Thông Tin Khách Hàng",
            path: "/dasboard/dulieucoban/thongtinkhachhang",
            component: InformationCustomer,
          },
        ],
      },
      {
        name: "Quản Lý Hồ Sơ",
        path: "/dasboard/quanlyhoso",
        component: ManageFilePage,
      },
      {
        name: "Quản Lý Thu Chi",
        path: "/dasboard/quanlythuchi",
        component: ManageFilePage,
      },
      // {
      //   path: "",
      //   component: NotFoundPage,
      // },
    ],
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "",
    component: NotFoundPage,
  },
];

export default routes;
