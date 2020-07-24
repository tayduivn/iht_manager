import React, { Fragment } from "react";
import SiderCustom from "../../components/Sider";
import { Layout } from "antd";
import { Switch } from "react-router-dom";
import { RouterWithSubRoutes } from "../../utils/RouterWithSubRoutes";

const { Content } = Layout;

const ReceiptsExpensesPage = ({ routes }) => {
  return (
    <Fragment>
      {SiderCustom(routes)}
      <Content style={{padding: '0 24px', minHeight: 280}}
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

export default ReceiptsExpensesPage;
