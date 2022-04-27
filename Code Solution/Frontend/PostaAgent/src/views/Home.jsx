import React, { Component } from "react";
import Home1 from "../views/Home1";
import Grumbullime from "../views/Grumbullime";
import { Route, Link } from "react-router-dom";
import nav from "../components/Input/nav";
import "../components/Home.css";
import Raport from "../views/Raport";
import Login2 from "../views/Login2";
import Fjalekalim from "../components/Input/Fjalekalim";
import Nav from "../components/Input/nav";
import Gjurmo from "../components/Input/gjurmo";
import Test2 from "../components/Input/test2";

class Home extends Component {
  state = {
    user: ""
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 sidenav hidden-xs">
            <div className="navbar-header">
              <div className="navbar navbar fixed-top flex-md-nowrap p-0 shadow">
                {/* <Link
                  to="/"
                  className="navbar-brand text-danger bold col-sm-3 col-md-2 mr-0"
                >
                  Albanian Courier
                </Link> */}
                <div />
                <ul className="navbar-nav px-3">
                  <li>
                    <label className=" text-danger" id="span1">
                      Perdorues: {this.props.user}
                    </label>
                  </li>
                  <li>
                    <Link to="/" className="nav-link text-danger ">
                      Sign out
                    </Link>
                  </li>
                  <li className="nav-item text-nowrap">
                    <Link to="/" className="nav-link" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <Nav />
            </div>
          </div>
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div className="left">
              <Route
                path="/rreth"
                className="left"
                exact
                render={() => <Home1 />}
              />
              <Route path="/grumbullim" exact render={() => <Grumbullime />} />
              <Route path="/gjurmo" exact render={() => <Gjurmo />} />
              <Route path="/raport" exact render={() => <Raport />} />
              <Route
                path="/ndrysho/fjalekalimin"
                exact
                render={() => <Fjalekalim />}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
