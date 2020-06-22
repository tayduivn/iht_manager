import React, { Fragment } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import "../App.css";
import MenuCustom from "../components/Menu";
import { Switch } from "react-router-dom";
import {RouterWithSubRoutes} from "../utils/RouterWithSubRoutes";

const { Header, Content, Footer } = Layout;

const LayoutPage = ({ routes }) => {
  return (
    <Fragment>
      <Header className="header">
        <div className="logo" />
        {/* <MenuCustom /> */}
        {MenuCustom(routes)}
      </Header>
      <Content style={{ padding: "0 10px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Switch>
            {routes.map((route, i) => {
              return <RouterWithSubRoutes key={i} {...route} />;
            })}
          </Switch>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        IHT Design ©2020 Created by KAI
      </Footer>
    </Fragment>
  );
};

export default LayoutPage;
