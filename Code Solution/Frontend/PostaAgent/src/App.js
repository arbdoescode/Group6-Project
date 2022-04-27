import React, { Component } from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import "./components/Home.css";

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
