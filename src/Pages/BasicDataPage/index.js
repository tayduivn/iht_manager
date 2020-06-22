import React, { Fragment } from "react";
import { Layout } from "antd";
import SiderCustom from "../../components/Sider";
import "antd/dist/antd.css";
import "../../App.css";
import { RouterWithSubRoutes } from "../../utils/RouterWithSubRoutes";
import { Switch } from "react-router-dom";
const { Content } = Layout;

const BasicDataPage = ({ routes }) => {
  return (
    <Fragment>
      {SiderCustom(routes)}
      <Content
        style={{ padding: "0 24px", minHeight: 280 }}
        className="site-layout-background"
      >
        <Switch>
          {routes.map((route, i) => {
            return <RouterWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </Content>
    </Fragment>
  );
};

export default BasicDataPage;
