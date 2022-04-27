import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";

import indexRoutes from "../src/routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

ReactDOM.render(
  <HashRouter>
    <BrowserRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route to={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </BrowserRouter>
  </HashRouter>,
  document.getElementById("root")
);
