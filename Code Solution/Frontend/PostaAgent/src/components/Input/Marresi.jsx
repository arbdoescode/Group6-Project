import React, { Component } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

class Marresi extends Component {
  state = {};

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <label className="m-2">Emri/ Subjekti</label>
        <input
          className="form-control "
          type="text"
          name="emri"
          value={this.state.emri}
        />

        <div>
          {" "}
          <label className="m-2">Adresa</label>
          <textarea className="form-control " type="text" />
        </div>
        <div>
          {" "}
          <label className="m-2">Shteti</label>
          <Select type="text" value="Shqiperi" />
        </div>
        <div>
          {" "}
          <label className="m-2">Qyteti</label>
          <Select type="text" value="Tirane" />
        </div>
        <div>
          {" "}
          <label className="m-2">Kodi Postar</label>
          <input
            className="form-control "
            type="text"
            name="kodipostar"
            value={this.state.kodipostar}
          />
        </div>
        <div>
          {" "}
          <label className="m-2">Telefon</label>
          <input
            className="form-control "
            type="text"
            name="telefon"
            value={this.state.telefon}
          />
        </div>
      </div>
    );
  }
}

export default Marresi;
