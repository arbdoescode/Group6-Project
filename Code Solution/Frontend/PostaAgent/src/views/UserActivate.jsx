import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import swal from "sweetalert";
import md5 from "md5";
import sha256 from "crypto-js/sha256";
import HmacSHA256 from "crypto-js/hmac-sha256";

axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class UserActivate extends Component {
  state = {
    nrKodi: "",
    posts: [],
    Token: "",
    username: "",
    time: "",
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onClearInput = () => {
    this.setState({
      nrKodi: "",
      posts: [],
    });
  };
  handleClick = (e) => {
    
    var d = new Date();
    fetch(window.UserP.url + "POD/GetUserForAdmin", {
        method: "Post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Token: HmacSHA256(
            Math.round(new Date().getTime() / 1000).toString(),
            window.UserP.key
          ).toString(),
        username: window.UserP.username,
        nrKodi: this.state.nrKodi
        }),
      })
        .then((res) => res.json())
        .then((data) => this.setState({ posts: data }));
        console.log(this.state.posts)
  };


  
  render() {
    const columns = [
      {
        Header: "Username",
        accessor: "Username",
      },
      {
        Header: "Password",
        accessor: "Password",
      },

      {
        Header: "Klient Subjekt Id",
        accessor: "ClientSubjectID",
      },

      {
        Header: "Roli Userit",
        accessor: "Role",
      },

      {
        Header: "Aktiv",
        accessor: "Aktive",
      },
      
       
    ];
    return (
      <div className="Form">
        <div className="card card-body bg-light col-md-4">
          <label className="">Nr. POD</label>
          <input
            id="nrKodi"
            name="nrKodi"
            value={this.state.nrKodi}
            className="form-control "
            type="text"
            onChange={(e) => this.handleInputChange(e, "nrKodi")}
          />
        </div>
      <div className="row ml-2">
        <button className="btn btn-primary " onClick={this.handleClick}>
          <span data-notify="icon" className="pe-7s-search" />
          &nbsp; Kerko
        </button>

        <button className="btn btn-primary ml-4" onClick={this.onClearInput}>
          <span data-notify="icon" className="pe-7s-trash" />
          &nbsp; Pastro
        </button>
        </div>
        <div className="card card-body bg-light col-md-12 mt-4">
          <ReactTable
            columns={columns}
            data={this.state.posts}
            defaultPageSize={5}
            className="-striped -highlight mt-4"
            pageText="Faqe"
            nextText="Para"
            rowsText="Rreshta"
            previousText="Mbrapa"
            noDataText="Nuk ka te dhena"
          />
        </div>
      </div>
    );
  }
}

export default UserActivate;
