import React, { Component } from "react";

class Gjurmo extends Component {
  state = {};
  render() {
    return (
      <div className="Form">
        <label className="">Nr. POD</label>
        <input
          id="pod"
          name="pod"
          value={this.state.pod}
          className="form-control "
          type="text"
          onChange={e => this.handleInputChange(e, "pod")}
        />
        <button className="btn btn mt-4 mr-2">Kerko</button>
        <button className="btn btn mt-4  ">Fshi</button>
      </div>
    );
  }
}

export default Gjurmo;
