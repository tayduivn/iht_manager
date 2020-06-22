import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import MenuItem from "../MenuItem/index";

const MenuCustom = (routes) => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
      {MenuItem(routes)}
    </Menu>
  );
};

export default MenuCustom;
