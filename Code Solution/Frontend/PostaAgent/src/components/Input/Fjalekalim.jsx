import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import HmacSHA256 from "crypto-js/hmac-sha256";

class Fjalekalim extends Component {
  state = {
    KsID: "",
    username: "",
    Password: "",
    Aktive: "",
    Tag: "",
    ID: "",
    pass: "",
    message: [],
    Token: ""
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleClick = e => {
    const data = {
      KsID: window.UserP.ClientSubjectID,
      username: window.UserP.username,
      Password: this.state.Password,
      Tag: this.state.Tag,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),

        window.UserP.key
      ).toString()
    };
    if(this.state.pass==this.state.Password){
    axios
      .post("http://localhost:35832/api/POD/ndrysho/password", data)
      .then(response => {
      

        this.setState({ message: response.data.ResultDescription });
        swal(this.state.message);
      });
    }else{
      console.log(window.UserP);
      swal("Vendosni parametrat sakt!");
    }
  };

  render() {
    return (
      <div className="Form">
        <div className="card card-body bg-light col-md-3">
          <label className="">Fjalekalimi i Vjeter</label>
          <input
            className="form-control "
            type="Password"
            value={this.state.Tag}
            name="Tag"
            onChange={e => this.handleInputChange(e, "Tag")}
          />
          <div>
            {" "}
            <label className="">Fjalekalimi i Ri</label>
            <input
              className="form-control "
              type="Password"
              value={this.state.Password}
              name="Password"
              onChange={e => this.handleInputChange(e, "Password")}
            />
          </div>
          <div>
            {" "}
            <label className="">Perserit Fjalekalimin</label>
            <input
              className="form-control "
              type="Password"
              value={this.state.pass}
              name="pass"
              onChange={e => this.handleInputChange(e, "pass")}
            />
          </div>

          <div>
            <button
              className="btn btn-primary  m-2"
              // type="submit"
              onClick={this.handleClick}
            >
              Ruaj
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Fjalekalim;
