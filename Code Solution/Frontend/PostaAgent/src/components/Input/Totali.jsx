import React, { Component } from "react";

class Totali extends Component {
  state = {};

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <label className="">Cmimi Baze</label>
        <input
          id="cmimiBaze"
          name="cmimibaze"
          value={this.state.cmimibaze}
          className="form-control "
          type="text"
          onChange={e => this.handleInputChange(e, "cmimibaze")}
        />

        <div>
          {" "}
          <label className="">Kursi</label>
          <input
            className="form-control "
            type="text"
            required
            name="kursi"
            value={this.state.kursi}
            onChange={e => this.handleInputChange(e, "kursi")}
          />
        </div>
        <div>
          {" "}
          <label className="">Cmimi Baze (Leke)</label>
          <input
            className="form-control "
            type="text"
            required
            name="cmimibazeleke"
            value={this.state.cmimibazeleke}
            onChange={e => this.handleInputChange(e, "cmimibazeleke")}
          />
        </div>
        <div>
          {" "}
          <label className="">Takse Karburanti (Leke)</label>
          <input
            className="form-control "
            type="text"
            required
            name="takse"
            value={this.state.takse}
            onChange={e => this.handleInputChange(e, "takse")}
          />
        </div>
        <div>
          {" "}
          <label className="">Totali</label>
          <input
            className="form-control "
            type="text"
            required
            name="totali"
            value={this.state.totali}
            onChange={e => this.handleInputChange(e, "totali")}
          />
          <button className="btn btn mt-4 ">Total</button>
        </div>
      </div>
    );
  }
}

export default Totali;
