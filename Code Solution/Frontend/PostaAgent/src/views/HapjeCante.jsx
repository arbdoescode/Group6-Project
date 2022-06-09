import React, { Component } from "react";
import axios from "axios";

import ReactTable from "react-table";
import { Grid, Row, Col } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import swal from "sweetalert";
import HmacSHA256 from "crypto-js/hmac-sha256";

class HapjeCante extends Component {
  state = {
    CantaKodi: "",
    NrPod: "",
    Pesha: "",
    NrRripSigurimi: "",
    AgjensiaDestinacion: "",
    posts: [],
    errors: [],
    posts1: [],
    alert: null,
    show: false,
    txtPod: false,
    showButton: false,
    disableButton: false,
    loading: false,
    Verifikim: "Pa Verifikuar",
    username: window.UserP.username,
    buttonEnable: true,
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };

  handleInputChangeNumber = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value.replace(/\D/, "") });
  };

  handleValidation(param) {
    let errors = {};
    let formIsValid = true;
    if (this.state.CantaKodi.length == 0) {
      formIsValid = false;
      document.getElementById("CantaKodi").style.borderColor = "red";
      errors["name1"] = "Ju lutem vendosni numrin e cantes!";
    } else if (
      this.state.CantaKodi.length >= 1 &&
      this.state.CantaKodi.length <= 5
    ) {
      formIsValid = false;
      document.getElementById("CantaKodi").style.borderColor = "red";
      errors["name1"] =
        "Numri i cantes nuk eshte i sakte! Duhet te jete numer 6 shifror!";
    } else if (this.state.NrPod.length >= 0 && this.state.NrPod.length < 8) {
      formIsValid = false;
      errors["name"] = "Numri i pod-it nuk eshte i sakte!";
      document.getElementById("NrPod").style.borderColor = "red";
    } else if (param.includes(this.state.NrPod)) {
      formIsValid = false;
      errors["name"] = "Numri i pod-it eshte shtuar 1 here!";
      document.getElementById("NrPod").style.borderColor = "red";
    }
    this.setState({ errors: errors });

    return formIsValid;
  }

  handleClickModal = (e) => {
    const req = {
      NrPod: this.state.NrPod,
      Verifikim: this.state.Verifikim,
    };

    var posts = [...this.state.posts];
    var posts1 = [...this.state.posts1];

    if (this.handleValidation(posts1)) {
      posts1.push(this.state.NrPod);

      posts.push(req);
      this.setState({ posts: posts, cope: posts.length + 1, posts1: posts1 });
    
      document.getElementById("NrPod").style.borderColor = "";
      document.getElementById("CantaKodi").style.borderColor = ""; // alert("Form submitted");
    } else {
     
    }
    this.setState({
      NrPod: "",
    })
    //this.setState({ posts: posts, cope: posts.length + 1, posts1: posts1 });
  };


  showErrors() {
    const getAlert = () => (
      <SweetAlert
        warning
        title="Mesazh"
        closeOnClickOutside={false}
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        {this.state.error1}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
   
  }

  showResponse() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Mesazh"
        closeOnClickOutside={false}
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        {this.state.error1}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  
  }
  hideAlert() {
   
    this.setState({
      alert: null,
    });
  }

  resetInput = (e) => {
    this.setState({
      NrPod: "",
      CantaKodi: "",
      loading: false,
      data: [],
      posts: [],
      row: [],
      posts1: [],
    });
  };

  handleClick = (e) => {
    const req = {
      CantaKodi: this.state.CantaKodi.trim(),
      AgjensiaBurim: window.UserP.agencyId,
      PerdoruesId: window.UserP.PerdoruesID,
      ProcesorId: window.UserP.idProcesori,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
    username: this.state.username,
    };
    // if (this.state.CantaKodi.length >= 0 || this.state.CantaKodi.length <= 4) {
    //   this.state.formIsValid = false;
    //   // document.getElementById("CantaKodi").style.borderColor = "red";

    //   // this.state.errors["CantaKodi"] = "Numri i cantes nuk eshte i sakte!";
    // } else {
    //   document.getElementById("CantaKodi").style.borderColor = "";
    this.setState({ loading: true, errors: {} }, () => {
     
      axios
        .post(window.UserP.url + "POD/HapCante", req)
        .then((response) => {
          const searchresults = response.data;
          //  const searchresults = response.data;
          let statusi = searchresults.ResultDescription;
          if (searchresults.Result === true) {
            this.setState({
              loading: false,
              error1: searchresults.ResultMessage,
              buttonEnable:false,
            });
            this.showResponse();
            
          } else {
            this.setState({
              loading: false,
              error1: searchresults.ResultMessage,
            });

            
            this.showErrors();
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error1: "Ju lutem kontaktoni departamentin e IT!",
          });
          this.showErrors();
        });
    });
  };

  handleClickVerifiko = (e) => {
    if (this.state.CantaKodi === "") {
      swal("Ju lutem vendosni kodin e cantes!");
    } else {
      this.setState({ loading: true }, () => {
        const req = {
          CantaKodi: this.state.CantaKodi.trim(),
          NrPod: this.state.posts1,
          AgjensiaBurim: window.UserP.agencyId,
          PerdoruesId: window.UserP.PerdoruesID,
          ProcesorId: window.UserP.idProcesori,
          Token: HmacSHA256(
            Math.round(new Date().getTime() / 1000).toString(),
            window.UserP.key
          ).toString(),
        username: this.state.username,
        };
       
        axios
          .post(window.UserP.url + "POD/VerifikoCantaPode", req)
          .then((response) => {
            if (response.data[0].Result === true) {
              this.setState({
                loading: false,
                posts: response.data,
                error1: response.data[0].ResultMessage,
              });

              this.showResponse();
            } else {
              this.setState({
                loading: false,

                error1: response.data[0].ResultMessage,
              });

              this.showErrors();
            }
          })

          .catch((error) => {
            this.setState({
              loading: false,
              error1: "Ju lutem kontaktoni departamentin e IT!",
            });
            this.showErrors();
          });
      });
    }
  };
  render() {
    const columns = [
      {
        Header: "Nr",
        accessor: "",
        id: "row",
        maxWidth: 50,
        filterable: false,
        Cell: (row) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        Header: "Pod Dergesa",
        accessor: "NrPod",
        Cell: "",
        maxWidth: 150,
        filterable: false,
      },
      {
        Header: "Verifikim",
        accessor: "Verifikim",
        Cell: "",
        maxWidth: 150,
        filterable: false,
      },
      {
        Header: "",
        id: "Fshi",
        accessor: (str) => "Hiq nga Lista",
        maxWidth: 120,
        filterable: false,

        Cell: (row) => (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => {
              let data = this.state.posts;
              data.splice(row.index, 1);
              this.setState({
                posts: data,
                posts1: data,
                cope: data.length + 1,
              });
            }}
          >
            Hiq nga Lista
          </span>
        ),
      },
    ];
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            {this.state.loading ? (
              <LoadingSpinner />
            ) : (
              <div className="Form">
                <div className="card card-body bg-light col-md-9 mt-4">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="m-2">Pod Transporti</label>
                      <input
                        id="CantaKodi"
                        name="CantaKodi"
                        value={this.state.CantaKodi}
                        className="form-control "
                        type="text"
                        onChange={(e) =>
                          this.handleInputChange(e, "CantaKodi")
                        }
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["name1"]}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="m-2">Pod Dergesa</label>

                      <input
                        id="NrPod"
                        name="NrPod"
                        value={this.state.NrPod}
                        className="form-control "
                        type="text"
                        onChange={(e) => this.handleInputChange(e, "NrPod")}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["name"]}
                      </span>
                    </div>

                    <div className="col">
                      <button
                        className="btn btn-primary mt-4 float-right"
                        onClick={this.handleClickModal}
                        disabled={this.state.buttonEnable}
                      >
                        <span data-notify="icon" className="pe-7s-shopbag" />
                        &nbsp; Nxirr nga Canta
                      </button>
                    </div>
                  </div>
                </div>{" "}
                <div className="card card-body bg-light col-md-9 mt-4">
                  <ReactTable
                    className="-striped"
                    columns={columns}
                    data={this.state.posts}
                    pivotColumnWidth={2}
                    defaultPageSize={5}
                    
                    pageText="Faqe"
                    nextText="Para"
                    rowsText="Rreshta"
                    previousText="Mbrapa"
                    noDataText="Nuk ka te dhena"
                    maxWidth={150}
                  />
                </div>
                <div className="card card-body col-md-9 mt-4">
                <div className="row">
                  <div className="col md-3">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleClick}
                    >
                      <span
                        data-notify="icon"
                        className="pe-7s-mail-open-file"
                      />
                      &nbsp; Hap
                    </button>
                  </div>
                  <div className="col md-3">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleClickVerifiko}
                    >
                      <span data-notify="icon" className="pe-7s-pin" />
                      &nbsp; Verifiko
                    </button>
                  </div>
                  <div className="col md-3">
                    <button
                      className="btn btn-primary float-right"
                      onClick={this.resetInput}
                    >
                      <span data-notify="icon" className="pe-7s-trash" />
                      &nbsp; Pastro
                    </button>
                    {this.state.alert}
                  </div>
                </div></div>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HapjeCante;
