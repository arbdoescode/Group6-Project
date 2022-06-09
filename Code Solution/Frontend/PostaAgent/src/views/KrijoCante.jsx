import React, { Component } from "react";
import ReactTable from "react-table";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import { Grid, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import { Button } from "react-bootstrap";
import HmacSHA256 from "crypto-js/hmac-sha256";
import swal from "sweetalert";

class KrijoCante extends Component {
  state = {
    CantaKodi: "",
    NrPod: "",
    AddedPesha: "",
    Pesha: "0",
    NrRripSigurimi: "",
    AgjensiaDestinacion: "",
    IdProcesori: "",
    posts: [],
    errors: [],
    alert: null,
    show: false,
    txtPod: false,
    showButton: false,
    disableButton: false,
    loading: false,
    txtPodTransport: true,
    txtPesha: true,
    txtRripSig: true,
    txtAgjDest: true,
    username: window.UserP.username,
  };

  deleteThisGoal2() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Kujdes!"
        closeOnClickOutside={false}
        onConfirm={() => this.handleClick()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        Jeni te sigurt per dorezimin e te dhenave?
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
        {this.state.errors}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
   
  }

  showErrors() {
    const getAlert = () => (
      <SweetAlert
        warning
        title="Kujdes!"
        closeOnClickOutside={false}
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        {this.state.errors}
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
  convertToDropDown = (par) => {
    var ret = [];
    var paramArray = par;

    for (var i in paramArray) {
      var objItem = { value: "", label: "" };
      objItem.value = paramArray[i];
      objItem.label = paramArray[i];
      ret.push(objItem);
    }

    return ret;
  };

  handleClick = (e) => {
    const req = {
      CantaKodi: this.state.CantaKodi.trim(),
      NrPod: this.state.posts,
      AgjensiaBurim: window.UserP.agencyId,
      PerdoruesId: window.UserP.PerdoruesID,
      IdProcesori: window.UserP.idProcesori,
      Pesha: this.state.Pesha.trim(),
      NrRripSigurimi: this.state.NrRripSigurimi.trim(),
      AgjensiaDestinacion: this.state.AgjensiaDestinacion.value,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
    username: this.state.username,
    };

 
if(this.state.CantaKodi==""||this.state.NrRripSigurimi==""){
  swal("Ju lutem plotesoni podin e transportit!")
}else{
    if (req !== undefined) {
      this.setState({ loading: true }, () => {
        axios
          .post(window.UserP.url + "POD/KrijoCante", req)
          .then((response) => {
            const searchresults = response.data;

            // for (var i in response.data) {
            let statusi = searchresults.ResultDescription; //response.data.ResultDescription;

            if (searchresults.Result === true) {
              this.setState({
                errors: searchresults.ResultMessage,
                selected: false,
                loading: false,
              });
              //     this.state.statusi.push(statusi);

              this.showResponse();
       
            } else {
              this.setState({
                // showModal: true,
                loading: false,
                errors: searchresults.ResultMessage,
                selected: true,
                loading: false,

                // posts: posts1
              });
              //   this.state.statusi.push(statusi);
              this.showErrors();

              // document.getElementById("2").style.borderColor = "red";
              
            }
          });
        // .catch(error => {
        //   this.setState({
        //     loading: false,
        //     error1: "Ju lutem kontaktoni departamentin e IT!"
        //   });
        //   this.showErrors();
        // });
      });
    }
  }
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };

  handleValidation(param) {
    let errors = {};
    let formIsValid = true;
    if (this.state.NrPod.length == 0) {
      formIsValid = false;
      errors["name"] = "Ju lutem vendosni podin!";
      document.getElementById("NrPod").style.borderColor = "red";
    } else if (this.state.NrPod.length > 1 && this.state.NrPod.length < 8) {
      formIsValid = false;
      document.getElementById("NrPod").style.borderColor = "red";
      errors["name"] = "Numri i pod-it nuk eshte i sakte!";
    } else if (this.state.NrPod.length > 1 && this.state.NrPod.length < 8) {
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
    e.preventDefault();
    var posts = [...this.state.posts];
    if (this.handleValidation(posts)) {
      // fetch(window.UserP.url + "POD/GetPeshePodi", {
      //   method: "Post",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   body: JSON.stringify({
      //     NrPodi:this.state.NrPod.trim(),
      //     Pesha:this.state.Pesha,
      //     Token: HmacSHA256(
      //       Math.round(new Date().getTime() / 1000).toString(),
      //       window.UserP.key
      //     ).toString(),
      //   username: this.state.username,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => this.setState({ Pesha: data[0] }));

      posts.unshift(this.state.NrPod.trim());
      // var peshasum=parseFloat(this.state.Pesha.replace(",", "."))+1;
      // this.state.Pesha=peshasum.toString();
      this.setState({ posts: posts });
      document.getElementById("NrPod").style.borderColor = "";
    } else {
    }
    this.setState({
      NrPod:"",
    })
  };
  convertToDropDown = (par) => {
    var ret = [];
    var paramArray = par;

    for (var i in paramArray) {
      var objItem = { value: "", label: "" };
      objItem.value = paramArray[i];
      objItem.label = paramArray[i];
      ret.push(objItem);
    }

    return ret;
  };

  handleGjenero = (e) => {
    axios.post(window.UserP.url + "POD/GjeneroPodCante", {
      
        NrPodi:this.state.NrPod.trim(),
        Pesha:this.state.Pesha,
        Token: HmacSHA256(
          Math.round(new Date().getTime() / 1000).toString(),
          window.UserP.key
        ).toString(),
      username: this.state.username,
      
    }).then((response) => {
      var searchresults = response.data;
      this.setState({
        CantaKodi: searchresults,
        NrRripSigurimi: searchresults
      });
    });
  };

  onChangeFunc = (name) => (value) => {

    this.setState({
      [name]: value,
    });
    if (
      // value.label === "D2DK" ||
      // value.label === "P2PK" ||
      // value.label === "LEKE" ||
      // value.label === "EURO"
      value.label === "D2D" ||
      value.label === "P2P"
    ) {
      this.setState({ showText: false });
    } else {
      this.setState({ showText: true });
    }
  };

  handleClickModalSecond = (e) => {
    if (this.state.show === false) {
      this.setState({
        show: true,
        txtPod: true,
        NrPod: "",
        showButton: true,
        disableButton: true,
        txtPodTransport: false,
        txtPesha: true,
        txtRripSig: false,
        txtAgjDest: false,
      });
    }
  };

  
  OnEnterPress = (e) => {
    if(e.keyCode === 13){
        this.handleClickModal(e);
        this.setState({
          NrPod:""
        })
    }
  };
  

  nrKodi = (e) => {
    if(e.keyCode === 13){
        this.handleClick2();
        this.setState({
            nrKodi:""
        })
    }
  };

  componentWillMount() {
    fetch(window.UserP.url + "POD/GetAgjensi", {
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
      username: this.state.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ data2: data }));
  }

  handleClickModal3 = (e) => {
    this.setState({
      show: false,
      txtPod: false,
      showButton: false,
      disableButton: false,
      txtPodTransport: true,
      txtPesha: true,
      txtRripSig: true,
      txtAgjDest: true,
    });
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
        accessor: "",
        Cell: "",
        maxWidth: 150,
        filterable: false,
      },
      {
        Header: "Hiq Nga Canta",
        id: "Fshi",
        accessor: (str) => "Fshi",
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
                cope: data.length + 1,
              });
              // fetch(window.UserP.url + "POD/RemovePeshePodi", {
              //   method: "Post",
              //   headers: {
              //     Accept: "application/json",
              //     "Content-type": "application/json",
              //     "Access-Control-Allow-Origin": "*",
              //   },
              //   body: JSON.stringify({
              //     NrPodi:row.original,
              //     Pesha:this.state.Pesha,
              //     Token: HmacSHA256(
              //       Math.round(new Date().getTime() / 1000).toString(),
              //       window.UserP.key
              //     ).toString(),
              //   username: this.state.username,
              //   }),
              // })
              //   .then((res) => res.json())
              //   .then((data) => this.setState({ Pesha: data[0] }));
            }}
          >
            Delete
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
              <div className="Form2">
                <div className="card card-body bg-light col-md-12 mt-4">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="ml-2 mt-1">Pod Dergesa</label>
                      <input
                        id="NrPod"
                        name="NrPod"
                        value={this.state.NrPod}
                        className="form-control "
                        type="text"
                        onChange={(e) => this.handleInputChange(e, "NrPod")}
                        disabled={this.state.txtPod}
                        onKeyUp={this.OnEnterPress}
                      />
                    </div>
                    <div className="col">
                      
                      <button
                        className="btn btn-primary mt-4 ml-2"
                        onClick={this.handleClickModal}
                        disabled={this.state.disableButton}
                      >
                        Fut ne Cante
                      </button>
                    
                  
                      {!this.state.showButton ? (
                        
                        <button
                          className="btn btn-primary mt-4 ml-2"
                          onClick={this.handleClickModalSecond}
                        >
                          Perfundo Mbushje
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary mt-4 ml-2"
                          onClick={this.handleClickModal3}
                        >
                          Shto Pod-e ne cante
                        </button>
                      )}
                    </div>
                  </div>
                  <label className="ml-2 mt-4">Te dhenat e Cantes</label>
                  <div className="card card-body bg-light col-md-12 mt-1">
                    <div className="row">
                      <div className="col-sm-6">
                        
                        <label className="m-2">Pod Transporti</label>
                        <button
                              className="btn btn-primary btn-sm mb-2 ml-5"
                              onClick={(e) => this.handleGjenero(e)}
                            >
                              <span data-notify="icon" className="pe-7s-note" />
                              &nbsp; Gjenero
                            </button>
                        
                        <input
                          id="CantaKodi"
                          name="CantaKodi"
                          value={this.state.CantaKodi}
                          className="form-control "
                          type="text"
                          onChange={(e) =>
                            this.handleInputChange(e, "CantaKodi")
                          }
                          disabled={this.state.txtPodTransport}
                        />
                      </div>

                      <div className="col-sm-6">
                        <label className="m-2">Pesha (Kg)</label>
                        <input
                          id="Pesha"
                          name="Pesha"
                          value={this.state.Pesha}
                          className="form-control "
                          type="text"
                          onChange={(e) => this.handleInputChange(e, "Pesha")}
                          disabled={this.state.txtPesha}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label className="m-2">Nr Rripe Sigurimi</label>

                        <input
                          id="NrRripSigurimi"
                          name="NrRripSigurimi"
                          value={this.state.NrRripSigurimi}
                          className="form-control "
                          type="text"
                          onChange={(e) =>
                            this.handleInputChange(e, "NrRripSigurimi")
                          }
                          disabled={this.state.txtRripSig}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="m-2">AgjensiaDestinacioni</label>

                        <Select
                          id="9"
                          value={this.state.AgjensiaDestinacion}
                          onChange={this.onChangeFunc("AgjensiaDestinacion")}
                          options={this.convertToDropDown(this.state.data2)}
                          isDisabled={this.state.txtAgjDest}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-2"></div>
                <div className="card card-body bg-light col-md-8 mt-4">
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
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                <button
                  onClick={() => this.deleteThisGoal2()}
                  className="btn btn-primary ml-4"
                >
                  <i className="fa fa-trash" aria-hidden="true" /> Ruaj
                </button>
                {this.state.alert}
                <button className="btn btn-primary ml-4">Printo</button>
                <button
                  className="btn btn-primary ml-4 "
                  onClick={this.handleClick}
                >
                  Pastro
                </button>
                </div>
                {this.state.alert}
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default KrijoCante;
