import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {RouterWithSubRoutes} from "./utils/RouterWithSubRoutes";
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
