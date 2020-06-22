import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MenuItem = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Menu.Item key={index}>
          <span>{route.name}</span>
          <Link to={route.path} />
        </Menu.Item>
      );
    });
  }
  return result;
};

export default MenuItem;
