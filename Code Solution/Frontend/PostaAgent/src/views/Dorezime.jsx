import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "../components/Card/Card.jsx";
import "../components/Input/Input.css";
import axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Modal.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { PodSaveReq } from "../FacadesJson/PodSaveReq";
import HmacSHA256 from "crypto-js/hmac-sha256";
import logo from "../assets/img/logo2.png";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from "sweetalert";
import Dashboard from "../layouts/Dashboard.jsx";
import Login2 from "./Login2.jsx";
import { AST_False } from "terser";
//import { Checkbox } from "@material-ui/core";

const opsione = [
  { value: "1", label: "D2D" },
  { value: "2", label: "P2P" },
  { value: "3", label: "D2P" },
  { value: "4", label: "P2D" },
];

class Dorezime extends Component {
  state = {
    nrPodi: "",
    kodKorrieri: "",
    marresi: "",
    arsye: "",
  };

  handleClick = (e) => {
    this.setState({ loading: true }, () => {
      axios
        .post(window.UserP.url + "POD/SaveNewPODKS", this.state.PodSaveReq)
        .then((response) => {
          const searchresults = response.data;
          if (searchresults.Result == true) {
            this.setState({
              cmimibaze: searchresults.ResultMessageTotali,
              showModal: true,
              alert: null,
              error1: searchresults.ResultMessage,
              loading: false,
              showPrint: true,
            });
            this.showResponse2();
          } else {
            this.setState({
              showModal: true,
              loading: false,
              alert: null,
              error1: searchresults.Error + searchresults.ResultDescription,
            });

            this.showResponse();
            if (
              searchresults.Error != null ||
              searchresults.Error != undefined
            ) {
              this.changeInputColor(searchresults.Error);
            }
          }
        });
    });
  };

  handlePrint = (e) => {
    const data = {
      nrKodi: this.state.nrKodi,

      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    var VleraPostare = " ";
    if (this.state.PodSaveReq.MenyrePagese == "Me Kesh") {
      VleraPostare = this.state.cmimitotal;
    } else {
      VleraPostare = "0";
    }
    var TotaliPrint = (
      parseFloat(VleraPostare) +
      parseFloat(this.state.PodSaveReq.ShumaSherbimeExtra)
    ).toString();
    var windowName = "";
    var windowUrl = " ";
    var myWindow = window.open(
      windowUrl,
      windowName,
      "left=0,top=0,right=0,bottom=0,width=600,height=850"
    );
    var JsBarcode = require("jsbarcode");

    var canvas = document.createElement("canvas");
    JsBarcode(canvas, this.state.PodSaveReq.PODNr, {
      format: "CODE39",
      width: 1,
      height: 50,
    });

    myWindow.document.write(
      "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "&nbsp" +
        "<table >" +
        "<tr>" +
        "<th >" +
        //  "<font face='calibri'" +
        //  ">" +
        "&nbsp" +
        "<img src='" +
        logo +
        "'>" +
        "&nbsp" +
        "Nenshkrimi: _______________" +
        "1" +
        "/" +
        "1" +
        "</th>" +
        "  </tr>" +
        "</table>" +
        "<table border='1' style='page-break-after: always' >" +
        "<thead>" +
        "<tr>" +
        "<th class='cell'>" +
        "Dergues" +
        "</th>" +
        " <th class='cell'>" +
        "Info" +
        "</th>" +
        "<th class='-cell'>" +
        "Marres" +
        "</th>" +
        "  </tr>" +
        "  </thead>" +
        "  <tbody>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        this.state.PodSaveReq.Derguesi +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Emer , Mbiemer" +
        "</td>" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.Marresi +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Adresa" +
        "</td>" +
        "<font face='calibri' size='1px'" +
        ">" +
        " <td>" +
        this.state.PodSaveReq.AdresaMarresi.substring(0, 60) +
        "</td>" +
        "</font>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Qyteti" +
        "</td>" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.QytetiMarres +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Telefon" +
        "</td>" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.TelMarresi +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Vlere Postare" +
        "</td>" +
        " <td class='info:-cell'>" +
        VleraPostare +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Vlere Derguese" +
        "</td>" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.ShumaSherbimeExtra +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Totali" +
        " <td class='info:-cell'>" +
        TotaliPrint +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Koment" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.Komente.substring(0, 120) +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Barcode" +
        "</td>" +
        " <td class='info:-cell'>" +
        "<img src='" +
        canvas.toDataURL("image/png") +
        "'>" +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Pesha" +
        "</td>" +
        " <td class='info:-cell'>" +
        this.state.PodSaveReq.Pesha +
        "</td>" +
        "   </tr>" +
        "<tr class='firstRow'>" +
        "<td class='Dergues:-cell'>" +
        "" +
        "</td>" +
        " <td class='Marres:-cell'>" +
        "Data" +
        "</td>" +
        " <td class='info:-cell'>" +
        new Date().toDateString() +
        "</td>" +
        "   </tr>" +
        "  </tbody>" +
        "</table>" +
        "&nbsp" +
        "&nbsp"
    );

    myWindow.focus();

    setTimeout(function () {
      myWindow.print();
    }, 500);
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };

  handleInputChangeNumber = (e) => {
    const name = e.target.name;
    // this.setState({ [name]: e.target.value.replace( /[^0-9.]/g, "") });
    this.setState({
      [name]: e.target.value
        .replace(/[^.\d]/g, "")
        .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2"),
      cmimibazezbritje: "-",
      cmimitaksakarburanti: "-",
      cmimitotal: "-",
    });
    if (name == "cmimibazetry") {
      this.setState({
        cmimibazeElse: e.target.value
          .replace(/[^.\d]/g, "")
          .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2"),
      });
    }
    console.log(this.state.PodSaveReq);
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };

  componentWillMount() {
    this.state.username = window.UserP.username;
    {
      fetch(window.UserP.url + "POD/City", {
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
        .then((data) => {
          this.setState({ data2: data });
        })
        .catch((error) => {
          alert("Ju lutem kontaktoni departamentin e IT!");
          window.location.reload(false);
        });
    }
  }

  render() {
    return (
      <div className="content">
        <div className="card card-body bg-light col-md-12">
          <div className="row">
            <div className="col-md-6">
              <label className="m-2">NR. POD</label>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <input
                id="2"
                placeholder="Nr. Pod"
                className="form-control "
                type="text"
                required
                name="nrPodi"
                value={this.state.nrPodi}
                onChange={(e) => this.handleInputChange(e, "nrPodi")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="m-2">KODI I KORRIERIT</label>
            </div>
            <div className="col-md-4">
              <label className="m-2">ORA</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                id="2"
                placeholder="Kodi i Korrierit"
                className="form-control "
                type="text"
                required
                name="kodKorrieri"
                value={this.state.kodKorrieri}
                onChange={(e) => this.handleInputChange(e, "kodKorrieri")}
              />
            </div>
            <div className="col-md-4">
              <input
                id="2"
                placeholder="Nr. Pod"
                className="form-control "
                type="time"
                required
                name="nrPodi"
                value={this.state.nrPodi}
                onChange={(e) => this.handleInputChange(e, "nrPodi")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>ZGJIDHNI VEPRIMIN</label>
            </div>
            <div className="col-md-6">
              <input
                id="6"
                className="ml-2 mt-2"
                type="radio"
                name="dorezuar"
                value="Dorezim"
                defaultChecked={this.state.radiocheck1}
                onChange={this.handleChangeRadio}
              />
              <span className="m-2">Dorezim</span>
              <input
                className="ml-5 mt-2"
                type="radio"
                name="dorezuar"
                value="Mos Dorezim"
                defaultChecked={!this.state.radiocheck1}
                onChange={this.handleChangeRadio}
              />
              <span className="m-2">Mos Dorezim</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label className="m-2">MARRESI</label>
            </div>
            <div className="col-md-4">
              <label className="m-2">ARSYE MOSDOREZIMI</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                id="2"
                placeholder="Marresi"
                className="form-control "
                type="text"
                required
                name="marresi"
                value={this.state.marresi}
                onChange={(e) => this.handleInputChange(e, "marresi")}
              />
            </div>
            <div className="col-md-4">
              <Select
                id="3"
                className="custom-Select mt-2 "
                value={this.state.arsye}
                //onChange={this.onChangeFunc1("arsye")}
                options={opsione}
                defaultValue={opsione[0]}
              />
            </div>
          </div>
        </div>
        <div className="card card-body bg-light col-md-12">GRID HERE</div>
        <div className="row">
          <div classname="col-md-4">
            <button
              className="btn btn-primary btn-sm"
              //onClick={(e) => this.handleGjenero(e)}
            >
              &nbsp; Ruaj
            </button>
          </div>
          <div classname="col-md-4">
            <button
              className="btn btn-primary btn-sm"
              //onClick={(e) => this.handleGjenero(e)}
            >
              &nbsp; Pastro
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dorezime;
