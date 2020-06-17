import React from "react";
import BasicDataPage from "./Pages/BasicDataPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import { Layout } from "antd";
import LayoutPage from "./Layout";
import LoginPage from "./Pages/LoginPage";

const routes = [
  {
    path: "/index",
    component: HomePage
  },
  {
    path: '/dasboard',
    component: LayoutPage,
    routes: [
      {
        path: '/dasboard/dulieucoban',
        component: BasicDataPage
      },
      {
        path: '',
        component: NotFoundPage
      }
    ]
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '',
    component: NotFoundPage
  }
];

export default routes;
