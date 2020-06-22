import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import MenuItem from "../MenuItem";
const { Sider } = Layout;

const SiderCustom = (routes) => {
  return (
    <Sider className="site-layout-background" width={250}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ height: "100%" }}
      >
        {MenuItem(routes)}
      </Menu>
    </Sider>
  );
};

export default SiderCustom;
