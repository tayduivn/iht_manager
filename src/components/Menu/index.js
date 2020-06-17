import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link, Switch } from "react-router-dom";
import RouterWithSubRoutes from "../../utils/RouterWithSubRoutes";

const MenuCustom = (routes) => {
  console.log(routes);
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <span>Dữ Liệu Cơ Bản</span>
        <Link to="/dasboard/dulieucoban" />
      </Menu.Item>
      <Menu.Item key="2">Quản Lý Hồ Sơ</Menu.Item>
      <Menu.Item key="3">QUẢN LÝ THU CHI</Menu.Item>
      <Switch>
        {routes.map((route, i) => {
          return <RouterWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </Menu>
  );
};

export default MenuCustom;
