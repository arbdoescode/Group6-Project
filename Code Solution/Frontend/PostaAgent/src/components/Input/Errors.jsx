import React, { Component } from "react";
import "../Input/Input.css";

class Errors extends Component {
  state = {
    errors: this.props.errors
  };

  createTable = () => {
    let table = [];
    table.push(
      <span className="badge badge-danger">
        {" "}
        Ju lutem rregulloni gabimet e meposhtme!
      </span>
    );
    // Outer loop to create parent
    for (let i = 0; i < 4; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 1; j++) {
        children.push(
          <span className="badge badge-danger">{this.props.errors[i]}</span>
        );
      }
      //Create the parent and add the children
      table.push(<ul>{children}</ul>);
    }
    return table;
  };
  // test1 = (key, e, searchresults) => {
  //   this.setState({
  //     errors: searchresults
  //   });
  // };
  render() {
  //  console.log("props", this.props);
    return (
      <div>
        {/* {this.props.children} */}
        {/* <ul> Ju lutem rregulloni gabimet e meposhtme!</ul> */}
        {/* <li className="text-danger mt-2 "> {this.state.errors}</li> */}

        {this.createTable()}
        {/* <li className="text-danger mt-2 "> {this.state.errors}</li> */}
      </div>
    );
  }
}

// var bgColors = {
//   Default: "#81b71a",
//   Blue: "#00B1E1",
//   Cyan: "#37BC9B",
//   Green: "#8CC152",
//   Red: "#E9573F",
//   Yellow: "#F6BB42"
// };
// const pStyle = { border: "5px solid red" };

export default Errors;
