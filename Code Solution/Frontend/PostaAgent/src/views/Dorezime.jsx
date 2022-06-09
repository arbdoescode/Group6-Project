import React, { Component } from "react";
import Select from "react-select";
import ReactTable from "react-table";
import DatePicker from "react-date-picker";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { PodDorezoReq } from "../FacadesJson/PodDorezoReq";
import { convertToDropDown } from "../components/Methods/Methods";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import HmacSHA256 from "crypto-js/hmac-sha256";

class Dorezime extends Component {
  state = {
    PodKodi: "",
    CantaKodi: "",
    Veprimi: "",
    Ora: new Date().toString().substring(16, 21),
    Marresi: "",
    ArsyeMosdorezimi: "",
    PerdoruesId: "",
    Korrieri: "",
    IdProcesori: "",
    loading: false,
    data: new Date().toString().substring(16, 21),
    date: "", //new Date().toString().substring(16, 21)
    data2: "",
    alert: null,
    posts: [],
    rapFacade: [PodDorezoReq],
    ddlDisableArsye: true,
    ddlMosdorezim: false,
    username: window.UserP.username,
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      Ora: new Date().toString().substring(16, 21),
    });
  }

  handleChangeRadio = (changeEvent) => {
    if (changeEvent.target.value === "Dorezuar") {
      this.setState({ Veprimi: "Dorezuar" });
    } else {
      this.setState({ Veprimi: "Mosdorezim" });
    }
  };

  checkDorezo = (e) => {
    if (e.target.value == "Dorezuar") {
      this.setState({
        ddlDisableArsye: true,
        ddlMosdorezim: false,
        ArsyeMosdorezimi: "",
      });
    } else {
      this.setState({
        ddlDisableArsye: false,
        ddlMosdorezim: true,
        Marresi: "",
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      Ora: e.target.value,
    });
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
  showErrors() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Kujdes!"
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
      PodKodi: "",
      CantaKodi: "",
      Veprimi: "",
      Ora: new Date().toString().substring(16, 21),
      Marresi: "",
      ArsyeMosdorezimi: "",
      PerdoruesId: "2",
      Korrieri: "",
      loading: false,
      data: new Date().toString().substring(16, 21),
      date: "", //new Date().toString().substring(16, 21)
      data2: "",
      alert: null,
      posts: [],
      ddlDisableArsye: true,
      ddlMosdorezim: false,
    });
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };

  handleClickModal = (e) => {
    var posts = [...this.state.posts];
    posts.push(this.state.nrPod);
    this.setState({ posts: posts, cope: posts.length + 1 });
  };

  onChangeFunc = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  handleChange2(value) {
    this.setState({ date: this.value });
  }

  handleKeyPressed = (e) => {
    const req = {
      PodKodi: this.state.PodKodi,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
    username: this.state.username,
    };
    this.setState({ loading: true }, () => {
      axios.post(window.UserP.url + "POD/GetKod", req).then((response) => {
        const searchresults = response.data;
        if (searchresults.Result === true) {
          this.setState({
            loading: false,
            Korrieri: searchresults.ResultMessage,
          });

        } else {
          this.setState({
            loading: false,
            error1: searchresults.ResultMessage,
          });
        }
      });
    });
  };

  componentWillMount() {
    fetch(window.UserP.url + "POD/GetArsye", {
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

  showModal = () => {
    this.setState({ show: true });
  };

  handleClick = (e) => {
    const req = {
      PodKodi: this.state.PodKodi,
      Ora: this.state.Ora,
      Marresi: this.state.Marresi,
      AgjensiaBurim: window.UserP.agencyId,
      PerdoruesId: window.UserP.PerdoruesID,
      Terminal: window.UserP.idProcesori,
      Veprimi: this.state.Veprimi,
      Korrieri: this.state.Korrieri,
      ArsyeMosdorezimi: this.state.ArsyeMosdorezimi.value,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
      username: this.state.username,
    };

    var posts1 = [...this.state.posts];

    posts1.push(req);

    // this.setState({posts: posts1  });

    


    axios
      .post(window.UserP.url + "POD/Dorezo", req)
      .then((response) => {
        const searchresults = response.data;
        if (searchresults.Result === true) {
          this.setState({
            loading: false,
            error1: searchresults.ResultMessage,
            posts: posts1,
          });
          this.showErrors();
     
        } else {
          this.setState({
            // showModal: true,
            loading: false,
            error1: searchresults.ResultMessage,
            // posts: posts1
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
  };

  render() {
    const columns = [
      {
        Header: "Nr",

        id: "row",
        filterable: false,

        Cell: (row) => {
          return <div>{row.index + 1}</div>;
        },
      },
      {
        Header: "Korrieri",
        accessor: "Korrieri",
      },

      {
        Header: "Nr Pod",
        accessor: "PodKodi",
      },

      {
        Header: "Marresi",
        accessor: "Marresi",
        // Cell: "2"
        // maxWidth: 150,
        // filterable: false
      },
      {
        Header: "Arsye Mosdorezimi",
        accessor: "ArsyeMosdorezimi",
        // Cell: "3"
        // maxWidth: 150,
        // filterable: false
      },
      {
        Header: "Data",
        accessor: "Data",
        // Cell: "4"
        // maxWidth: 150,
        // filterable: false
      },
      {
        Header: "Ora",
        accessor: "Ora",
        // Cell: "5"
        // maxWidth: 150,
        // filterable: false
      },
    ];
    return (
      <div className="Form">
        <div className="card card-body bg-light col-md-9  mt-4">
          <div className="row">
            <div className="col-md-4">
              <label className="m-2">Nr. POD</label>
              <input
                id="PodKodi"
                name="PodKodi"
                value={this.state.PodKodi}
                className="form-control "
                type="text"
                onBlur={() => this.handleKeyPressed()}
                onChange={(e) => this.handleInputChange(e, "PodKodi")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              {" "}
              <label className="m-2">Kodi i Korrierit</label>
              <input
                value={this.state.Korrieri}
                name="Korrieri"
                id="Korrieri"
                className="form-control "
                type="text"
                disabled
                onChange={(e) => this.handleInputChange(e, "Korrieri")}
              />
            </div>
            <div className="col-md-4">
              <label className="m-2">Ora</label>
              <input
                type="time"
                id="appt"
                name="appt"
                required
                className="form-control input-sm"
                //defaultValue={this.state.Ora}
                value={this.state.Ora}
                onChange={(e) => this.handleChange(e, "Ora")}
                // onLoad={this.display_ct()}
              />
            </div>
          </div>

          {/* <div className="row mt-9">
            <div className="col-md-3">
              {" "}
              <label className="ml-2">Veprimi</label>
            </div>

            <div className="col-md-6">
              <div className="col-md-3">
                <input
                  id="6"
                  // className="m-4"
                  className="form-control input-sm"
                  type="radio"
                  name="Veprimi"
                  value="Dorezuar"
                  defaultChecked
                  onClick={this.checkDorezo}
                  onChange={this.handleChangeRadio}
                />

                <span className="m-2">Dorezim</span>
              </div>
              <div className="col-md-3">
                <input
                  //   className="m-4"
                  type="radio"
                  className="form-control input-sm"
                  name="Veprimi"
                  value="Mos Dorezuar"
                  onClick={this.checkDorezo}
                  onChange={this.handleChangeRadio}
                />

                <span className="m-2">Mos Dorezim</span>
              </div>
            </div>
          </div> */}

          <div className="row mt-4">
            <div className="col-md-4 ">
              {" "}
              <label className="ml-2">Zgjidhni Veprimin</label>
            </div>

            <div className="col-md-4">
              <input
                id="6"
                // className="m-4"
                type="radio"
                name="Veprimi"
                value="Dorezuar"
                defaultChecked
                onClick={this.checkDorezo}
                onChange={this.handleChangeRadio}
              />

              <span className="m-2">Dorezim</span>

              <input
                //   className="m-4"
                type="radio"
                name="Veprimi"
                value="Mos Dorezuar"
                onClick={this.checkDorezo}
                onChange={this.handleChangeRadio}
              />

              <span className="m-2">Mos Dorezim</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              {" "}
              <label className="m-2">Marresi</label>
              <input
                value={this.state.Marresi}
                className="form-control "
                type="text"
                name="Marresi"
                onChange={(e) => this.handleInputChange(e, "  Marresi")}
                disabled={this.state.ddlMosdorezim}
              />
            </div>
            <div className="col-md-4">
              <label className="m-2">Arsye Mosdorezimi</label>
              <Select
                value={this.state.ArsyeMosdorezimi}
                id="ArsyeMosdorezimi"
                name="ArsyeMosdorezimi"
                onChange={this.onChangeFunc("ArsyeMosdorezimi")}
                options={convertToDropDown(this.state.data2)}
                isDisabled={this.state.ddlDisableArsye}
              />
            </div>
          </div>
        </div>
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
    
        <div className="row">
        <div className="col-md-3">
        <button
          onClick={() => this.deleteThisGoal2()}
          className="btn btn-primary ml-4"
        >
          <i className="fa fa-trash" aria-hidden="true" />
          <span data-notify="icon" className="pe-7s-diskette" />
          &nbsp; Ruaj
        </button>
        </div>
        {this.state.alert}
        <div className="col-md-3">
        <button className="btn btn-danger ml-4 " onClick={this.resetInput}>
          <span data-notify="icon" className="pe-7s-trash" />
          &nbsp; Pastro
        </button>
        </div>
 
      </div>
      </div>
    );
  }
}

export default Dorezime;
