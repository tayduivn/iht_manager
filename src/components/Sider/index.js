import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const SiderCustom = () => {
  return (
    <Sider
      className="site-layout-background"
      width={200}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
      >
        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1"> */}
        <Menu.Item key="1">Thông tin công ty</Menu.Item>
        <Menu.Item key="2">Thông tin chi nhánh</Menu.Item>
        {/* </SubMenu> */}
      </Menu>
    </Sider>
  );
};

export default SiderCustom;
