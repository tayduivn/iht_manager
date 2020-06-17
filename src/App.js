import React from "react";
import { Layout } from "antd";
import LayoutPage from "./Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import LoginPage from "./Pages/LoginPage";
import RouterWithSubRoutes from "./utils/RouterWithSubRoutes";
import routes from "./routes";

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => {
          return <RouterWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </Router>
  );
};

export default App;
