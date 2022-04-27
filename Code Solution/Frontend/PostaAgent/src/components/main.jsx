import React, { Component } from "react";
import Login2 from "../views/Login2";
import { BrowserRouter } from "react-router-dom";
import "../App.css";
import Home from "../views/Home";

class Main extends Component {
  state = {
    isLogedIn: false,
    user: ""
  };
  test = (key, e, searchresults) => {
    this.setState({
      isLogedIn: true,
      user: searchresults
    });
  };

  render() {
    if (!this.state.isLogedIn) {
      return (
        <div>
          <Login2 test={this.test} />
        </div>
      );
    } else {
      return (
        <BrowserRouter>
          <div>
            <Home user={this.state.user} />
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default Main;
