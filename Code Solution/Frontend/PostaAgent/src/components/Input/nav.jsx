import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    return (
      <div
        // id="wrapper"
        // data-spy="scroll"
        // data-target="#spy"
        className="col-md-3"
      >
        <div id="sidebar-wrapper" className="d-flex">
          <nav id="spy">
            <ul className="sidebar-nav nav">
              {/* <li>
                {" "}
                <Link
                  className="nav-link active"
                  to="/rreth"
                  className="fa fa-safari"
                  aria-hidden="true"
                >
                  Rreth Nesh
                </Link>
              </li> */}
              <li>
                <Link to="/grumbullim">Grumbullime</Link>
              </li>
              <li>
                <Link to="/gjurmo">Gjurmo Pod</Link>
              </li>
              <li>
                <Link to="/raport">Raport Kliente Subjekte</Link>
              </li>
              <li>
                <Link to="/ndrysho/fjalekalimin">Ndrysho Fjalekalimin</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Nav;
