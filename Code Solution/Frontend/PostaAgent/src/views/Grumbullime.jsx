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

const optionsPagesa = [
  { value: "True", label: "Paguan Derguesi" },
  { value: "False", label: "Paguan Marresi" },
];

const optionsShteti = [
  { value: "1", label: "Shqiperi" },
  { value: "42", label: "Kosove" },
];

const monedha = [{ value: "1", label: "LEKE",disabled: true }];

const kodeProdukte = [
  { value: "1", label: "D2D" },
  { value: "2", label: "P2P" },
  { value: "3", label: "D2P" },
  { value: "4", label: "P2D" },
];

class Grumbullime extends Component {
  state = {
    nrPod: "",
    kodReference: "",
    variable1:"",
    variable2:"",
    pesha: "",
    cope: "",
    emerDestinacioni: "",
    kodiDestinacion: "",
    kodiPershkrimit: { value: "Pako", label: "Pako" },
    kodiProduktit: "",
    kushPaguan:  { value: "True", label: "Paguan Derguesi" },
    menyrePagese: "Me Kesh",
    marresi: "",
    monedhacmimibaze:{ value: "1", label: "LEKE" },
    telMarresi: "",
    adresaDerguesit:"",
    adresaMarresi: "",
    njesiadministrative: "",
    kodiPostarMarres: "",
    kodiLevizjesBrandNew: "",
    kodiLevizjesDrejtim: "",
    kodiLevizjesNew:"",
    kodiLevizjesShrese:"",
    kodiLevizjesMenyra:"",
    korrierUser:"",
    qytetfshat:"",
    isFshat:true,
    qytetiMarres: "",
    qytetiDergues: "",
    shtetiMarres: "",
    shtetiDergues: { value: "1", label: "Shqiperi" },
    monedhaKP: "",
    cmimibaze: "",
    cmimibazetry: "",
    cmimibazeElse: "-",
    cmimibazezbritje: "-",
    cmimitaksakarburanti: "-",
    cmimitotal: "-",
    kursi: "-",
    totali: "",
    objItem: "",
    showState: true,
    checkedbox: false,
    checkedboxKP: false,
    show: false,
    showModal: false,
    showsecond: false,
    showQytetFshat: false,
    radiocheck1:true,
    radiocheck2:true,
    cmimiShtese: "-",
    lekeShtese: "0",
    njesi: "",
    posts: [],
    postsShtese: [],
    emri: "",
    data2: "",
    data6: "",
    data8: "",
    dataMenyraLevizjes: "",
    dataKodLevizjeBrand: "",
    dataKodDrejtim:"",
    dataKodLevizje: "",
    dataLevizjeShtese: "",
    dataShtete: "",
    dataDestinacion:"",
    dataKorriert:"",
    dataShtese:"",
    showText: false,
    showTextKP: false,
    komente: "",
    checked: false,
    pershkrime: "",
    derguesiKl: "",
    shumaSherbimeExtra: "",
    monedhaExtra: { value: "1", label: "LEKE" },
    error1: "",
    error2: [],
    PodSaveReq: new PodSaveReq(),
    Token: "",
    alert: null,
    username: window.UserP.username,
    loading: false,
    loading2: false,
    showCity: false,
    kodLevizje:"",
    showKlientSubjekte:false,
    showKlienteSubjektKundrejtPagese:false,
    klienteSubjekteDergues:"",
    klienteSubjekteMarres:"",
    showKlient:false,
    showKlientMarresi:false,
    derguesi:"",
    login:true,
    zbritjeCheckbox10:false,zbritjeCheckbox20:false,
    konfirmimCheckbox:false,
    showPrint:false,
  };

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert
        warning
        title="Kujdes!"
        closeOnClickOutside={false}
        onCancel={() => this.hideAlert()}
        onConfirm={() => this.resetInput()}
        showCancel
      >
        Jeni te sigurt per fshirjen e te dhenave ?
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  showResponse() {
    const getAlert = () => (
      <SweetAlert
        warning
        title="Error"
        closeOnClickOutside={false}
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        {this.state.error1.split(",").map((i, index) => {
          return (
            <h6 key={index} align="center">
              <em>{i}</em>
            </h6>
          );
        })}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });

  }

  showResponse2() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Sukses!"
        closeOnClickOutside={false}
        onConfirm={() => this.hideAlert()}
        onCancel={() => this.hideAlert()}
        showCancel
      >
        <span>{this.state.error1}</span>
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
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
        Jeni te sigurt per rregjistrimin e te dhenave?
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }
  hideAlert() {
    this.setState({

      // nrPod: "",
      // kodReference: "",
      // pesha: "",
    
      
         alert: null,
      // username: window.UserP.username,
         loading: false,
      // showCity: false,
      // kodLevizje:"",
      // showKlientSubjekte:false,
      // showKlienteSubjektKundrejtPagese:false,
      // klienteSubjekteDergues:"",
      // klienteSubjekteMarres:"",
      // showKlient:false,
      // showKlientMarresi:false,
      // derguesi:""
      
    });
    
  }

  showModal = () => {
    this.setState({ show: true });
  };

  showModalElse = () => {
    this.setState({ showsecond: true });
  };
 showDerguesKundrejtPagese = (value) => {
  if(value.label=="Paguan Derguesi" &&  this.state.menyrePagese=="Me Kesh")
   {
    this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
   }
   else if(value.label=="Paguan Marresi" &&  this.state.menyrePagese=="Me Kesh" && this.state.checkedboxKP==true)
   {
    this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:true });
   }
   else if(value.label=="Paguan Marresi" &&  this.state.menyrePagese=="Me Kesh" && this.state.checkedboxKP==false && this.state.kodiProduktit.label!="D2D")
   {
    this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
   }
   else if(value.label=="Paguan Marresi" &&  this.state.menyrePagese=="Me Kesh" && this.state.checkedboxKP==false && this.state.kodiProduktit.label=="D2D")
   {
    this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
   }
    else if(value.label=="Paguan Derguesi" &&  this.state.menyrePagese=="Me Kredi"){this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false ,showTextKP:false});}
  };

  showDerguesKundrejtPageseNew = (value) => {
  //   if(this.state.kushPaguan.label=="Paguan Marresi" && value=="Me Kesh" && this.state.kodiProduktit.label=="D2DK")
  //   {
  //    this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: true });
  //   }
  //  else 
   if(this.state.kushPaguan.label=="Paguan Derguesi" && value=="Me Kesh")
    {
     this.setState({ showKlientSubjekte: false, 
                    showKlienteSubjektKundrejtPagese: false
                   });
    }

    else if(this.state.kushPaguan.label=="Paguan Marresi" && value=="Me Kesh" && this.state.kodiProduktit.label!="D2D")
    {
     this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false });
    }else if(this.state.kushPaguan.label=="Paguan Marresi" && value=="Me Kesh" && this.state.kodiProduktit.label=="D2D" && this.state.checkedboxKP==false){
      this.setState({ showKlientSubjekte: true, showKlienteSubjektKundrejtPagese: false });
    }else if(this.state.kushPaguan.label=="Paguan Marresi" && value=="Me Kesh" && this.state.kodiProduktit.label=="D2D" && this.state.checkedboxKP==true){
      this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false });
    }
     else {this.setState({ showKlientSubjekte: true, showKlienteSubjektKundrejtPagese: false });}
   };

   showDerguesKundrejtPageseNew2 = (value) => {
   if(this.state.kushPaguan.label=="Paguan Derguesi" && (this.state.menyrePagese=="Me Kesh" ||this.state.menyrePagese==undefined) && (value.label=="D2D"|| value.label=="P2P"))
    {
     this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false });
    }

    else if(this.state.kushPaguan.label=="Paguan Marresi" && (this.state.menyrePagese=="Me Kesh" ||this.state.menyrePagese==undefined) && (value.label=="D2D"|| value.label=="P2P"))
    {
     this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false });
    }
     else {this.setState({ showKlientSubjekte: true, showKlienteSubjektKundrejtPagese: false });}
   };
  showModal2 = () => {
    this.setState({ showModal: true });
  };

  readInstanceFromInterface() {
    this.state.PodSaveReq.PODNr = this.state.nrPod.trim();
    this.state.PodSaveReq.KodReference = this.state.kodReference.trim();
    this.state.PodSaveReq.Pesha = this.state.pesha.trim();
    this.state.PodSaveReq.Cope = this.state.cope.trim();
    this.state.PodSaveReq.KodPershkrimi = this.state.kodiPershkrimit.label;
    this.state.PodSaveReq.KodiProduktit = this.state.kodiProduktit.label;
    this.state.PodSaveReq.KushPaguan = this.state.kushPaguan.value;
    this.state.PodSaveReq.MenyrePagese = this.state.menyrePagese;
    this.state.PodSaveReq.Marresi = this.state.marresi;
    this.state.PodSaveReq.TelMarresi = this.state.telMarresi;
    this.state.PodSaveReq.AdresaMarresi = this.state.adresaMarresi;
    this.state.PodSaveReq.KodiPostarMarres = this.state.kodiPostarMarres;
    this.state.PodSaveReq.QytetiMarres = this.state.qytetiMarres.label;
    this.state.PodSaveReq.ShtetiMarres = this.state.shtetiMarres.label;
    this.state.PodSaveReq.Korrieri = this.state.korrierUser.label;
    this.state.PodSaveReq.Destinacion = this.state.kodiDestinacion.label;
    this.state.PodSaveReq.Levizja = this.state.kodiLevizjesNew.label;
    this.state.PodSaveReq.Drejtimi = this.state.kodiLevizjesDrejtim.label;
    this.state.PodSaveReq.Brandi = this.state.kodiLevizjesBrandNew.label;
    this.state.PodSaveReq.isFshat = this.state.isFshat;
    this.state.PodSaveReq.isNational = this.state.showQytetFshat;
    this.state.PodSaveReq.KodiSherbimit = this.state.kodiLevizjesMenyra.label;
    this.state.PodSaveReq.KodiLevizjes = this.state.kodiLevizjesShrese.label;
    this.state.PodSaveReq.QytetFshat = this.state.qytetfshat;
    this.state.PodSaveReq.TelDerguesi = this.state.telDerguesi;
    this.state.PodSaveReq.AdresaDerguesi = this.state.adresaDerguesit;
    this.state.PodSaveReq.AgjensiTranzit = window.UserP.agencyId;
    this.state.PodSaveReq.Terminal = window.UserP.idProcesori;
    //this.state.PodSaveReq.KodiPostarMarres = this.state.kodiPostarMarres;
    this.state.PodSaveReq.QytetiDergues = this.state.qytetiDergues.label;
    this.state.PodSaveReq.ShtetiDergues = this.state.shtetiDergues.label;
    this.state.PodSaveReq.ShteseLekeCheck = this.state.checkedbox;
    this.state.PodSaveReq.KundrejtPageseLekeCheck = this.state.checkedboxKP;
    this.state.PodSaveReq.ShteseLekeVlera = this.state.lekeShtese;
    this.state.PodSaveReq.KundrejtPageseLekeVlera = this.state.checkedboxKP;
    this.state.PodSaveReq.MonedhaCmimiBaze = this.state.monedhacmimibaze.label;
    this.state.PodSaveReq.KlientSubjektID = this.state.derguesiKl;
    this.state.PodSaveReq.Komente = this.state.komente;
    this.state.PodSaveReq.MonedhaExtra = this.state.monedhaExtra.label;
    this.state.PodSaveReq.CmimiBaze = this.state.cmimibaze;
    this.state.PodSaveReq.CmimiBazeTry = this.state.cmimibazetry;
    this.state.PodSaveReq.Totali = this.state.totali;
    this.state.PodSaveReq.Derguesi = this.state.derguesi;
    this.state.PodSaveReq.hasZbritje = this.state.zbritjeCheckbox10;
    this.state.PodSaveReq.hasZbritje2 = this.state.zbritjeCheckbox20;
    this.state.PodSaveReq.hasConfirmed = this.state.konfirmimCheckbox;
    this.state.PodSaveReq.KlienteSubjekteMarres=this.state.klienteSubjekteDergues.label;
    if (
      this.state.shumaSherbimeExtra === ""
        ? (this.state.PodSaveReq.ShumaSherbimeExtra = "0")
        : (this.state.PodSaveReq.ShumaSherbimeExtra = this.state.shumaSherbimeExtra.trim())
    );

    this.state.PodSaveReq.username = window.UserP.username;
    this.state.PodSaveReq.KodLevizje =this.state.kodLevizje.label;
    this.state.PodSaveReq.UsernameID = window.UserP.PerdoruesID;
    this.state.PodSaveReq.AgjensiaOrigjine = window.UserP.agencyId;
    this.state.PodSaveReq.AgjensiaOrigjineID = window.UserP.agency;
      
    this.state.PodSaveReq.Token = HmacSHA256(
      Math.round(new Date().getTime() / 1000).toString(),
      window.UserP.key
    ).toString();
  }

  handleClickModal = (e) => {
    var posts = [...this.state.posts];
    posts.push(this.state.njesi);
    this.setState({ posts: posts, cope: posts.length + 1 });
  };

  handleClickModal2 = (e) => {
    var postsShtese = [...this.state.postsShtese];
    let check=true;
    for(let i=0;i<postsShtese.length;i++){
      if(postsShtese[i].emri==this.state.MenyreShtesa.label){
        check=false;
        break;
      }else{continue;}
    }
    if(check==true){
    if(this.state.cmimiShtese==""){this.state.cmimiShtese="0"}
    postsShtese.push({cmimi:this.state.cmimiShtese,emri:this.state.MenyreShtesa.label});
    let sum = (parseInt(this.state.lekeShtese)+parseInt(this.state.cmimiShtese));
    this.state.lekeShtese = sum.toString();
    this.setState({ postsShtese: postsShtese});
    }else{swal("Mos perdore te njejten menyre shtese.")}
  };

  changeInputColor = (par) => {
    for (var i = 0; i <= par.length; i++) {
      if (par[i] != null || par[i] != undefined) {
        document.getElementById(i).style.borderColor = "red";
        if (document.getElementById(i).hasChildNodes())
          document.getElementById(i).children[0].style.borderColor = "red";
      }
    }
  };

  handleChangeRadio = (changeEvent) => {

    this.setState({ derguesi:"",marresi:"",showKlient:false,showKlientMarresi:false,qytetiDergues:"",adresaMarresi:"",adresaDerguesit:""})
    if (changeEvent.target.value === "Me Kesh" && this.state.checkedboxKP==false) {
      this.setState({ menyrePagese: "Me Kesh",showTextKP:false,radiocheck1:true });
    } else if(changeEvent.target.value === "Me Kesh" && this.state.checkedboxKP==true && this.state.kushPaguan.value=="False"){
      this.setState({ menyrePagese: "Me Kesh",showTextKP:false,radiocheck1:true });
    }else if(this.state.kushPaguan.label=="Paguan Marresi" && changeEvent.target.value=="Me Kesh" && this.state.checkedboxKP==false && this.state.kodiProduktit.label!="D2D")
    {
     this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
    }
    else if(this.state.kushPaguan.label=="Paguan Marresi" && changeEvent.target.value=="Me Kesh" && this.state.checkedboxKP==false && this.state.kodiProduktit.label=="D2D")
    {
     this.setState({ showKlientSubjekte: true, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
    }else if(this.state.kushPaguan.label=="Paguan Marresi" && changeEvent.target.value=="Me Kesh" && this.state.checkedboxKP==true && this.state.kodiProduktit.label=="D2D")
    {
     this.setState({ showKlientSubjekte: false, showKlienteSubjektKundrejtPagese: false,showTextKP:false });
    }
    else {
      this.setState({ menyrePagese: "Me Kredi",showTextKP:false,radiocheck1:false });
    }
    this.showDerguesKundrejtPageseNew(changeEvent.target.value);
  };
  handleChangeRadio1 = (changeEvent) => {
    this.setState({
      qytetfshat:"",
      njesiadministrative:""
    })
      if (changeEvent.target.value === "Qytet") {
        this.setState({ isFshat: true ,radiocheck2:true});
        this.state.isFshat=true;
        
      } else {
        this.setState({ isFshat: false ,radiocheck2:false});
        this.state.isFshat=false;
        
      }

    };
  handleChangeCheck = (e) => {
    const { checked } = e.target
    this.setState({
      checkedbox: checked,
      // isDisabled: checked,
    })
    this.state.checkedbox = checked;
    // this.state.isDisabled = checked;
  };
  
  handleChangeCheckZbritje = (e) => {
    const { checked } = e.target
    this.setState({
      zbritjeCheckbox10: checked,
      cmimibazezbritje: "-",
      cmimitaksakarburanti: "-",
      cmimitotal: "-",
    });
    this.state.zbritjeCheckbox10 = checked;
    this.state.zbritjeCheckbox10 = checked;
    if(this.state.zbritjeCheckbox20==true){
    this.state.zbritjeCheckbox20 = !checked;
    }
    
  };

  handleChangeCheckZbritje2 = (e) => {
    const { checked } = e.target
    this.setState({
      zbritjeCheckbox20: checked,
      cmimibazezbritje: "-",
      cmimitaksakarburanti: "-",
      cmimitotal: "-",
    });
    this.state.zbritjeCheckbox20 = checked;
    if(this.state.zbritjeCheckbox10==true){
    this.state.zbritjeCheckbox10 = !checked;
    }
  };

  handleChangeCheckKonfirmim = (e) => {
    const { checked } = e.target
    this.setState({
      konfirmimCheckbox: checked,
      // isDisabled: checked,
    })
    this.state.konfirmimCheckbox = checked;
    // this.state.isDisabled = checked;
  };

  handleChangeCheckKP = (e) => {
    const { checked } = e.target
    this.setState({
      checkedboxKP: checked,
      showText:checked,
      qytetiDergues:""

      // isDisabled: checked,
    })
    this.state.checkedboxKP = checked;
    this.state.showText = checked;
    if(this.state.showText==true && this.state.menyrePagese=="Me Kesh" && this.state.kushPaguan.label=="Paguan Marresi"){
      this.setState({showTextKP:false,showKlientSubjekte: false})
      this.state.showTextKP=false;
      this.state.showKlientSubjekte= false;
    }else if(this.state.showText==false && this.state.menyrePagese=="Me Kesh" && this.state.kushPaguan.label=="Paguan Marresi" && this.state.kodiProduktit.label!="D2D"){
      this.setState({showTextKP:false,showKlient:false,derguesi:""})
      this.state.showTextKP=false;
    }else if(this.state.showText==false && this.state.menyrePagese=="Me Kesh" && this.state.kushPaguan.label=="Paguan Marresi" && this.state.kodiProduktit.label=="D2D"){
      this.setState({showTextKP:false,showKlient:false,derguesi:"",showKlientSubjekte: true})
      this.state.showTextKP=false;
      this.state.showKlientSubjekte= true;
    }
    else{
      this.setState({showTextKP:false})
      this.state.showTextKP=false;
    }
    // this.state.isDisabled = checked;
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  hideModalelse = () => {
    this.setState({ showsecond: false });
  };
  hideModal2 = () => {
    this.setState({ showModal: false });
  };
  
  handleClick = (e) => {
    this.readInstanceFromInterface();
    this.handleTotali();
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
              showPrint:true,
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
              if(this.state.PodSaveReq.MenyrePagese=="Me Kesh"){
                VleraPostare = this.state.cmimitotal;
              }else{
                VleraPostare = "0";
              }
               var TotaliPrint = (parseFloat(VleraPostare)+parseFloat(this.state.PodSaveReq.ShumaSherbimeExtra)).toString();
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
                "1"+
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
                this.state.PodSaveReq.Derguesi  +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Emer , Mbiemer" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.PodSaveReq.Marresi  +
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
                "</font>"+
                "   </tr>" +
     
                "<tr class='firstRow'>" +
                "<td class='Dergues:-cell'>" +
                "</td>" +
                " <td class='Marres:-cell'>" +
                "Qyteti" +
                "</td>" +
                " <td class='info:-cell'>" +
                this.state.PodSaveReq.QytetiMarres+
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
                TotaliPrint+
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
               
               setTimeout(function() {myWindow.print();},500);
             
          
       };
  
    handleInputChange= (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: value.toUpperCase() });
    };
    handleInputChangeOnlyNumber = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: e.target.value.replace( /[^0-9]/g, "") });
    };
    handleInputChangeNumber = (e) => {
      const name = e.target.name;
     // this.setState({ [name]: e.target.value.replace( /[^0-9.]/g, "") });
     this.setState({ [name]: e.target.value.replace(/[^.\d]/g, '')
     .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2"),
     cmimibazezbritje: "-",
     cmimitaksakarburanti: "-",
     cmimitotal: "-"});
     if(name=="cmimibazetry"){
       this.setState({
        cmimibazeElse: e.target.value.replace(/[^.\d]/g, '')
        .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
       })
     }
    console.log(this.state.PodSaveReq);
    };

  handleInputChange= (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value.toUpperCase() });
  };
  handleInputChangeOnlyNumber = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: e.target.value.replace( /[^0-9]/g, "") });
  };
  handleInputChangeNumber = (e) => {
    const name = e.target.name;
   // this.setState({ [name]: e.target.value.replace( /[^0-9.]/g, "") });
   this.setState({ [name]: e.target.value.replace(/[^.\d]/g, '')
   .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2"),
   cmimibazezbritje: "-",
   cmimitaksakarburanti: "-",
   cmimitotal: "-"});
   if(name=="cmimibazetry"){
     this.setState({
      cmimibazeElse: e.target.value.replace(/[^.\d]/g, '')
      .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
     })
   }
  };


  handleTotali = (e) => {
    this.readInstanceFromInterface();
    axios.post(window.UserP.url + "POD/LlogaritCmiminTotal",this.state.PodSaveReq).then((response) => {
      var searchresults = response.data;
      this.setState({
        kursi:searchresults[4],
        cmimibazeElse: searchresults[0],
        cmimibazezbritje: searchresults[1],
        cmimitaksakarburanti: searchresults[2],
        cmimitotal: searchresults[3]
      });
    });
  };
  componentWillMount() {
    this.state.username = window.UserP.username;
    console.log(window.UserP)
   { fetch(window.UserP.url + "POD/City", {
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
        
      }).catch((error) => {
   
        alert( "Ju lutem kontaktoni departamentin e IT!");
        //window.location.reload(false);   
      });
     
    }
    {
      fetch(window.UserP.url + "POD/GetKodPershkrimi", {
        method: "Post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
           "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          Token: HmacSHA256(
            Math.round(new Date().getTime() / 1000).toString(),
            window.UserP.key
          ).toString(),
          username: window.UserP.username,
          agjensi: window.UserP.agencyId,
        }),
      })
        .then((res) => res.json())
        .then((data) => this.setState({ data7: data }));
    }
      {
        fetch(window.UserP.url + "POD/GetKodLevizje", {
          method: "Post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
             "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            Token: HmacSHA256(
              Math.round(new Date().getTime() / 1000).toString(),
              window.UserP.key
            ).toString(),
            username: window.UserP.username,
            agjensi: window.UserP.agencyId,
          }),
        })
          .then((res) => res.json()) 
          .then((data) => this.setState({ data9: data }));
         
          
      }
      { fetch(window.UserP.url + "POD/FullStates", {
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
          this.setState({ dataShtete: data });
          
        });
      }
     
      
      this.setState({ loading2: false }, () => {

        fetch(window.UserP.url + "POD/GetKodLevizjeNew", {
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
            this.setState({
              dataKodLevizje: data ,
              kodiLevizjesNew:{label:data[1],value:data[1]}
            });
          //
          fetch(window.UserP.url + "POD/GetKodLevizjeBrand", {
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
              KodLevizje: data[1],
    
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ 
              dataKodLevizjeBrand: data ,
              kodiLevizjesBrandNew:{label:data[0],value:data[0]}
              });
            });
    
        fetch(window.UserP.url + "POD/GetKodLevizjeDrejtim", {
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
              KodLevizje: data[1],
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ 
              dataKodDrejtim: data ,
              shtetiMarres:{value:"Shqiperi",label:"Shqiperi"},
              kodiLevizjesDrejtim:{label:data[0],value:data[0]}
              }); 
            });
    
        fetch(window.UserP.url + "POD/GetKodLevizjeShtese", {
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
              KodLevizje: data[1],
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ 
              dataLevizjeShtese: data,
              kodiLevizjesShrese:{label:data[0],value:data[0]} 
            }); 
            
            fetch(window.UserP.url + "POD/GetKodLevizjeMenyra", {
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
            KodLevizjeBrand: data[0],
          }),
        })
          .then((res) => res.json())
          .then((data) => { 
          this.setState({ dataMenyraLevizjes: data,
            kodiLevizjesMenyra:{label:data[0],value:data[0]},
            loading2:false }); 
          });
            });
    
       

          //


            
          });
          
        
        
        fetch(window.UserP.url + "POD/GetKorrierGrumbullime", {
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
            AgjensiaOrigjineID: window.UserP.agency,
  
          }),
        })
          .then((res) => res.json())
          .then((data) => { 
          this.setState({ korrierUser:{value:data[0],label:data[0]}, dataKorriert: data });
          });

            fetch(window.UserP.url + "POD/GetShtesaCmim", {
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
                //AgjensiaOrigjine: window.UserP.agency,
      
              }),
            })
              .then((res) => res.json())
              .then((data) => {
              this.setState({ dataShtese: data });
              });
            
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

  convertToDropDownState = (par) => {
    var ret = [];
    var paramArray = par;

    for (var i in paramArray) {
      if(i=="0"){
        continue;
      }
      var objItem = { value: "", label: "" };
      objItem.value = paramArray[i];
      objItem.label = paramArray[i];
      ret.push(objItem);
      
    }

    return ret;
  };

  convertToDropDownCity = (par) => {
    var ret = [];
    var paramArray = par;

    for (var i in paramArray) {
      var objItem = { value: "", label: "" };
      objItem.value = (parseInt(i,10)+1).toString();
      objItem.label = paramArray[i];
      ret.push(objItem);
      
    }

    return ret;
  };

  onChangeFuncDergues = (name) => (value) => {
    if (this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kredi")
    {
      this.setState({
        [name]: value,
        marresi:value.label,
        showKlientMarresi:false,
        showKlient:false,
        derguesi:"",
        derguesiKl: value.label,
      });
      
    }else if(value.label=="ZGJIDH"){
      this.setState({ [name]: value,adresaDerguesit:"",adresaMarresi:"",marresi:"",derguesi:"",derguesiKl: value.label, });      
    }
    else if(value.label=="Individ")
    {
      this.setState({
        [name]: value,       
        marresi:value.label,
        showKlientMarresi:false,
        showKlient:false,
        derguesi:"",
        derguesiKl: value.label,
      });
    }
    else if(this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kesh"){
      
      
      this.setState({
        [name]: value,
      });
    this.setState({
      [name]: value,
      derguesi:value.label,
      showKlient:false,
      showKlientMarresi:false,
      marresi:"",
      derguesiKl: value.label,
    });
    }else if(this.state.derguesiKl=="ZGJIDH"){
      this.setState({ adresaDerguesit:"",adresaMarresi:"",marresi:"",derguesi:"" });      
    }
    else{
      
      
      this.setState({
        [name]: value,
      });
    this.setState({
      [name]: value,
      derguesi:value.label,
      showKlient:false,
      showKlientMarresi:false,
      marresi:"",
      derguesiKl: value.label,
    });
    
  }

   
  };
  onChangeFunc10 = (name) => (value) => {
    console.log(value);
    
    this.setState({

      cmimibazeElse: "-",
      cmimibazezbritje: "-",
      cmimitaksakarburanti: "-",
      cmimitotal: "-",
      kursi: "-",
    })
    this.state.kodiDestinacion="";
    this.setState({ loading2: true }, () => {
    if(name=="kodiLevizjesNew"){
        this.setState({ 
          [name]: value,
        });

      fetch(window.UserP.url + "POD/GetKodLevizjeBrand", {
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
              KodLevizje: value.value,
    
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ 
                dataKodLevizjeBrand: data,
                kodiLevizjesBrandNew:{label:data[0],value:data[0]}
              });
            });
    
        fetch(window.UserP.url + "POD/GetKodLevizjeDrejtim", {
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
              KodLevizje: value.value,
            }),
          })
            .then((res) => res.json())
            
            .then((data) => { 
              if(value.value=="NDERKOMBETAR"||value.value=="RAJONAL"){
                
            this.setState({ 
                dataKodDrejtim: data ,
                kodiLevizjesDrejtim:{label:"EKSPORT",value:"EKSPORT"}
              });
            }else{
              this.setState({ 
                dataKodDrejtim: data ,
                kodiLevizjesDrejtim:{label:data[0],value:data[0]}
              });
            }
            if(value.value=="NDERKOMBETAR"){
              this.setState({
                showState:false,
                shtetiMarres:"",
                showQytetFshat:false
              })
            } 
            });
    
        fetch(window.UserP.url + "POD/GetKodLevizjeShtese", {
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
              KodLevizje: value.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ 
                dataLevizjeShtese: data ,
                kodiLevizjesShrese:{label:data[0],value:data[0]},
              }); 

              

              fetch(window.UserP.url + "POD/GetKodLevizjeMenyra", {
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
              KodLevizjeBrand: data[0],
            }),
          })
            .then((res) => res.json())
            .then((data) => { 
            this.setState({ dataMenyraLevizjes: data,
              kodiLevizjesMenyra:{label:data[0],value:data[0]},
              loading2:false }); 
              }); 
            });
   

        if(value.value!="KOMBETAR")  {
          this.setState({
            showQytetFshat: false,
            qytetiMarres:null,
            monedhacmimibaze:{value:"2",label:"EURO"}
          });
        }else{
          this.setState({
            monedhacmimibaze:{ value: "1", label: "LEKE" }
          })
        } 
      }
   });  
   
  };
  onChangeFunc2 = (name) => (value) => {
    if(name=="kodiLevizjesDrejtim"){
    this.setState({
      [name]: value,
    });
  }
    
    if(name=="kodiDestinacion"){
      if(this.state.kodiLevizjesShrese.label=="AL-GR" || this.state.kodiLevizjesShrese.label=="AL-KS" || this.state.kodiLevizjesShrese.label=="AL-NM" || this.state.kodiLevizjesShrese.label=="AL-BOTE" ){
        this.setState({
          qytetiMarres:"",
          [name]: value,
        });

      }else{
      

      this.setState({
        [name]: value,

      });}
      
    
      }
  };
  onChangeFunc3 = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };
  onChangeFunc4 = (name) => (value) => {
    this.setState({
      cmimibazeElse: "-",
      cmimibazezbritje: "-",
      cmimitaksakarburanti: "-",
      cmimitotal: "-",
      kursi: "-",
    })
 this.setState({ loading: true }, () => {

    if(name=="kodiLevizjesShrese"){
      if(value.value=="AL-GR"){
        this.setState({
          shtetiMarres:{value:"Greqi",label:"Greqi"},
          kodiLevizjesDrejtim:{value:"EKSPORT",label:"EKSPORT"},
          showState:true,
          showQytetFshat:false
        });
      }else if(value.value=="AL-KS"){
        this.setState({
          shtetiMarres:{value:"Kosove",label:"Kosove"},
          kodiLevizjesDrejtim:{value:"EKSPORT",label:"EKSPORT"},
          showState:true,
          showQytetFshat:false
        });
      }else if(value.value=="AL-NM"){
        this.setState({
          shtetiMarres:{value:"Maqedoni",label:"Maqedoni"},
          kodiLevizjesDrejtim:{value:"EKSPORT",label:"EKSPORT"},
          showState:true,
          showQytetFshat:false
        });
      }else if(value.value=="AL-BOTE"){
        this.setState({
          showState:false,
          shtetiMarres:"",
          kodiLevizjesDrejtim:{value:"EKSPORT",label:"EKSPORT"},
          showQytetFshat:false
        })
       
      }
      else if(value.value=="NM-AL"||value.value=="GR-AL"||value.value=="BOTE-AL"||value.value=="NM-KS"){
        this.setState({
          shtetiMarres:{value:"Shqiperi",label:"Shqiperi"},
          showState:true,
          kodiLevizjesDrejtim:{value:"IMPORT",label:"IMPORT"},
        });
      }
      else{
        this.setState({
          shtetiMarres:{value:"Shqiperi",label:"Shqiperi"},
          showState:true,
        });
      }
    this.setState({
      [name]: value,
      kodiLevizjesMenyra:{label:this.state.dataMenyraLevizjes[0],value:this.state.dataMenyraLevizjes[0]},
      loading:false
        });}
    }); 
    
  };
  
  onChangeFunc6 = (name) => (value) => {
    if(name=="KodPershkrimitKategoriNew"){
    this.setState({
      [name]: value,
    });}
  };
  onChangeFunc7 = (name) => (value) => {
    if(name=="kushPaguan"){
    this.setState({
      [name]: value,
    });}
  };
  onChangeFuncMarres = (name) => (value) => {
    if (this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kesh")
    {

      this.setState({
        [name]: value,    
        derguesi:value.label,
        showKlient:false,
        showKlientMarresi:false,    
        marresi:""
  
      });
    }

    else 
    { 
      this.setState({
        [name]: value,
        marresi:value.label,
        showKlientMarresi:false,
        showKlient:false,
        derguesi:""
  
      });
  

    }
  };

  onChangeFuncMarresElse = (name) => (value) => {
    
    if (this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kesh")
    {
      
     
    this.setState({
      [name]: value,
      derguesi:value.label,
      showKlient:false,
      showKlientMarresi:false,
      marresi:"",
      derguesiKl: value.label,
    });
      this.setState({
        [name]: value,    
        derguesi:value.label,
        showKlient:false,
        showKlientMarresi:false,    
        marresi:"",
        derguesiKl: value.label,
      });
    }

    else 
    { 
      this.setState({
        [name]: value,
        marresi:value.label,
        showKlientMarresi:false,
        showKlient:false,
        derguesi:"",
        derguesiKl:value.label,
      });
  

    }
  };

  onChangeFunc = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

 


  onChangeFunc1 = (name) => (value) => {  
    this.setState({
      [name]: value,
    });
     if(name=="kodiProduktit"){
       if(value!="D2D" && this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kesh"){
         this.setState({
          showKlientSubjekte:false
         })
       }else if(value=="D2D" && this.state.kushPaguan.label=="Paguan Marresi" && this.state.menyrePagese=="Me Kesh"){
        this.setState({
         showKlientSubjekte:false
        })
      }
     }
    //this.showDerguesKundrejtPageseNew2(value); 
  };

  onChangeFuncDerguesName = (name) => (value) => {
    this.setState({
      [name]: value,
    });
    this.setState({ derguesi:"",marresi:"",showKlient:false,showKlientMarresi:false,qytetiDergues:"",adresaMarresi:"",adresaDerguesit:"",})
    this.showDerguesKundrejtPagese(value);
  };
  onChangeFuncKorrier = (name) => (value) => {
    this.setState({
      [name]: value,
      korrierUser:value,
    });
    this.state.korrierUser=value;
  };
  
  onChangeFuncShtet = (name) => (value) => {
    this.setState({
      [name]: value,
    });
    
  };

  resetInput = (e) => {
    this.setState({
      nrPod: "",
      kodReference: "",
      pesha: "",
      cope: "",
      kodiPershkrimit: { value: "2", label: "Pako" },
      kodiProduktit: "",
      kushPaguan:  { value: "True", label: "Paguan Derguesi" },
      menyrePagese: "Me Kredi",
      marresi: "",
      telMarresi: "",
      adresaMarresi: "",
      kodiPostarMarres: "",
      qytetiMarres: "",
      qytetiDergues: "",
      shtetiMarres: "",
      shtetiDergues: "",
      monedhaKP: "",
      cmimibaze: "",
      kursi: "",
      totali: "",
      objItem: "",
      show: false,
      showModal: false,
      njesi: "",
      posts: [],
      emri: "",
      data2: "",
      data6: "",
      data8: "",
      showText: false,
      komente: "",
      checked: false,
      pershkrime: "",
      derguesiKl: "",
      shumaSherbimeExtra: "",
      monedhaExtra: { value: "1", label: "LEKE" },
      error1: "",
      error2: [],
      PodSaveReq: new PodSaveReq(),
      Token: "",
      alert: null,
      username: window.UserP.username,
      loading: false,
      showCity: false,
      kodLevizje:"",
      showKlientSubjekte:false,
      showKlienteSubjektKundrejtPagese:false,
      klienteSubjekteDergues:"",
      klienteSubjekteMarres:"",
      showKlient:false,
      showKlientMarresi:false,
      derguesi:"",
      isFshat:false,
      checkedbox:false,
      checkedboxKP: false,
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
        Header: "Kodi i Njesise",
        accessor: "",
        Cell: "",
        maxWidth: 150,
        filterable: false,
      },
      {
        Header: "Fshi",
        id: "Fshi",
        accessor: (str) => "Fshi",
        maxWidth: 100,
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
            }}
          >
            Delete
          </span>
        ),
      },
    ];

    const columns2 = [
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
        Header: "Cmimi",
        accessor: "cmimi",
        Cell: "",
        maxWidth: 150,
        filterable: false,
      },
      {
        Header: "Emri",
        accessor: "emri",
        Cell: "",
        maxWidth: 400,
        filterable: false,
      },
      {
        Header: "Fshi",
        id: "Fshi",
        accessor: (str) => "Fshi",
        maxWidth: 100,
        filterable: false,

        Cell: (row) => (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => {
              let data = this.state.postsShtese;
              let sub = (parseInt(this.state.lekeShtese)-parseInt(data[row.index].cmimi))
              data.splice(row.index, 1);
              this.setState({
                postsShtese: data,
                lekeShtese: sub.toString()
              });
            }}
          >
            Modifiko
          </span>
        ),
      },
    ];


    return (
      
      <div className="content">
      
        <Grid fluid>
          <Row>
            <Col md={12}>
              {this.state.loading ? (
                <LoadingSpinner />
              ) : (
                <Card
                  content={
                    <div>
                      <div className="card card-body bg-light col-md-12">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="m-2">Nr Pod</label>
                          </div>
                          <div className="col-md-4">
                            <input
                              id="2"
                              placeholder="nrPod"
                              className="form-control "
                              type="text"
                              name="nrPod"
                              required
                              value={this.state.nrPod}
                              onChange={(e) =>
                                this.handleInputChange(e, "nrPod")
                              }
                            />
                          </div>

                          <div>
                            {this.state.showModal ? (
                              // <div>

                              //   <Modal2
                              //     showModal={this.state.showModal}
                              //     handleClose={this.hideModal2}
                              //     className="modal fade docs-example-modal-sm"
                              //     tabindex="-1"
                              //     role="dialog"
                              //     aria-labelledby="mySmallModalLabel"
                              //     aria-hidden="true"
                              //   >
                              //     <div className="row">
                              //       <div className="col-md-9 ml-auto">
                              //         {this.state.error1}
                              //       </div>
                              //     </div>
                              //   </Modal2>
                              // </div>
                              <div>{this.state.alert}</div>
                            ) : null}
                          </div>
                          <div className="col-md-4">
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <label className="m-2">Pesha (kg)</label>
                          </div>
                          <div className="col-md-4">
                            <input
                              placeholder="pesha"
                              className="form-control  mt-1"
                              id="7"
                              pattern="[0-9]*"
                              name="pesha"
                              required
                              value={this.state.pesha}
                              onChange={(e) =>
                                this.handleInputChangeNumber(e, "pesha")
                              }
                            />
                          </div>
                          <div className="col-md-4 mt-1">
                            <input
                              placeholder="Kod Reference"
                              className="form-control"
                              type="text"
                              name="kodReference"
                              value={this.state.kodReference}
                              onChange={(e) =>
                                this.handleInputChange(e, "kodReference")
                              }
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <label className="m-2">Cope</label>
                          </div>
                          <div className="col-md-4">
                            <input
                              id="1"
                              placeholder="cope"
                              type="text"
                              pattern="[0-9]*"
                              name="cope"
                              className="form-control mt-1"
                              required
                              value={this.state.cope}
                              onChange={(e) =>
                                this.handleInputChangeOnlyNumber(e, "cope")
                              }
                            />
                          </div>
                          <div className="">
                            <div className="col-md-4 mt-2">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={this.showModal}
                                type="submit"
                              >
                                <span
                                  data-notify="icon"
                                  className="pe-7s-more"
                                />
                                &nbsp;
                              </button>
                            </div>
                            <Modal
                              show={this.state.show}
                              handleClose={this.hideModal}
                            >
                              <div>
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="m-2">Nr Dergeses</label>
                                    <input
                                      id="90"
                                      className="form-control input-sm"
                                      type="text"
                                      value={this.state.nrPod}
                                      name="nrPod"
                                      onChange={(e) =>
                                        this.handleInputChange(e, "nrPod")
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="m-2">
                                      Kodi i Njesise
                                    </label>

                                    <input
                                      className="form-control input-sm"
                                      type="text"
                                      name="njesi"
                                      onChange={(e) =>
                                        this.handleInputChange(e, "njesi")
                                      }
                                    />
                                  </div>
                                  <div>
                                    <button
                                      className="btn btn-primary btn-sm m-2"
                                      type="submit"
                                      onClick={this.handleClickModal}
                                    >
                                      Shto Ne Liste
                                    </button>
                                  </div>
                                </div>
                                <div />{" "}
                                <ReactTable
                                  columns={columns}
                                  data={this.state.posts}
                                  pivotColumnWidth={2}
                                  defaultPageSize={5}
                                  className="-striped -highlight mt-4"
                                  pageText="Faqe"
                                  nextText="Para"
                                  rowsText="Rreshta"
                                  previousText="Mbrapa"
                                  noDataText="Nuk ka te dhena"
                                  maxWidth={150}
                                />
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                      <div className="card card-body bg-light col-md-12">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="m-2">Pershkrimi</label>
                          </div>
                          <div className="col-md-4">
                            <Select
                              id="4"
                              className="custom-Select"
                              onChange={this.onChangeFunc("kodiPershkrimit")}                           
                              options={this.convertToDropDown(this.state.data7)}
                              defaultValue={this.convertToDropDown(this.state.kodiPershkrimit)}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            {this.state.showText ? (
                              <div>
                                <input
                                  className="form-control "
                                  type="text"
                                  value={this.state.shumaSherbimeExtra}
                                  pattern="[0-9]*"
                                  placeholder="Vlera E Pakos"
                                  name="shumaSherbimeExtra"
                                  onChange={(e) =>
                                    this.handleInputChangeNumber(
                                      e,
                                      "shumaSherbimeExtra"
                                    )
                                  }
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <label className="m-2">Kodi Produkt</label>
                          </div>
                          <div className="col-md-4">
                            <Select
                              id="3"
                              className="custom-Select mt-2 "
                              value={this.state.kodiProduktit}
                              onChange={this.onChangeFunc1("kodiProduktit")}
                              options={kodeProdukte}
                              defaultValue={kodeProdukte[0]}
                            />
                          </div>
                          <div className="col-md-4">
                            {this.state.showText ? (
                              <div>
                                <Select
                                  id="50"
                                  className="custom-Select mt-2"
                                  value={this.state.monedhaExtra}
                                  onChange={this.onChangeFunc("monedhaExtra")}
                                  options={monedha}
                                  defaultValue={monedha[1]}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          
                          <div className="col-md-4 mt-2">
                            <div className="row">
                            <div className="col">
                              <label className="m-2">KP(LEKE)</label>
                            </div>
                          <div className="col mt-0">
                              <label class="checkboxcontainer mt-sm-1 ml-md-1 float-right">
                                
                           <input
                              id="26"
                              type="checkbox"
                              name="test"
                              onChange={e =>this.handleChangeCheckKP(e)}
                              defaultChecked={this.state.checkedboxKP}
                              
                            />
                            <span class="checkmark"></span>
                            </label> 
                            </div>
                            </div>
                            </div>
                            {this.state.showTextKP==true?
                            <div className="col-md-4">
                              <label className="m-2">Dergues kundrejt pageses paguan Marresi:</label>
                              <Select
                                  id="66"
                                  className="custom-Select mt-2"
                                  //value={this.state.marresi}
                                  onChange={this.onChangeFuncMarresElse("marresi")}
                                  options={this.convertToDropDown(this.state.data8)}
                                  defaultValue={{value:this.state.derguesiKl,label:this.state.derguesiKl}}
                                />
                            </div>
                            :null}
                          </div>
                        <div className="row align-items-start">
                          <div className="col-md-4 mt-2">
                            <div className="row">
                            <div className="col">
                            <label className="m-2">Shtese(LEKE)</label>
                            </div>
                            <div className="col">
                              
                              <label class="checkboxcontainer mt-sm-1 ml-md-1 float-right">
                           <input
                              id="26"
                              type="checkbox"
                              name="test"
                              onChange={e =>this.handleChangeCheck(e)}
                              defaultChecked={this.state.checkedbox}
                              
                            />
                            <span class="checkmark"></span>
                            </label> 
                            </div>
                            </div>
                          </div>
                          <div className="col-md-9">
                            {this.state.checkedbox===true?
                            
                              <div className="row">
                            <div className="col-md-4 mt-2">
                            
                            <input
                              id="shteseleke"
                              className="form-control "
                              type="text"
                              name="shteseleke"
                              value={this.state.lekeShtese}
                              // onChange={this.handleInputChange}
                              disabled={true}
                            />
                            </div>
                            
                            <div className="col-md-2 mt-2">
                            {" "}
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.showModalElse}
                                type="submit"
                              >
                                <span
                                  data-notify="icon"
                                  className="pe-7s-more"
                                />
                                &nbsp;
                              </button>
                              </div>
                              </div>
                            :null}
                            </div>
                        </div>
                        
                      </div>
                      <Modal
                              show={this.state.showsecond}
                              handleClose={this.hideModalelse}
                            >
                              <div>
                              <div className="row">
                                  <div className="col-md-6">
                                    <label className="m-2">
                                    Menyra e Shteses
                                    </label>
                                    <Select
                                          id="dataShtese"
                                          value={this.state.MenyreShtesa}
                                          onChange={this.onChangeFunc3("MenyreShtesa")}
                                          options={this.convertToDropDown(
                                              this.state.dataShtese
                                            )}
                                          
                                        />
                                    
                                  </div>
                                  
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <label className="m-2">
                                     Shuma
                                    </label>

                                    <input
                                      id="cmimiShtese"
                                      className="form-control"
                                      type="text"
                                      pattern="[0-9]*"
                                      value={this.state.cmimiShtese}
                                      name="cmimiShtese"
                                      onChange={this.handleInputChange}
                                    />
                                  </div>
                                  <div>
                                    <p>{" "}</p>
                                    <button
                                      className="btn btn-primary btn-sm m-3"
                                      type="submit"
                                      onClick={this.handleClickModal2}
                                    >
                                      Shto Ne Liste
                                    </button>
                                  </div>
                                </div>
                                <div />{" "}
                                <ReactTable
                                  columns={columns2}
                                  data={this.state.postsShtese}
                                  pivotColumnWidth={2}
                                  defaultPageSize={5}
                                  className="-striped -highlight mt-4"
                                  pageText="Faqe"
                                  nextText="Para"
                                  rowsText="Rreshta"
                                  previousText="Mbrapa"
                                  noDataText="Nuk ka te dhena"
                                  maxWidth={150}
                                />
                              </div>
                            </Modal>
                            {this.state.loading2 ? (
                        
                        <LoadingSpinner />

                      ) : (
                              <div className="card card-body bg-light col align-self-center ">
                              <div className="row">
                                <div className="col">
                                    <label className="col mt-2">Levizja:</label>
                                </div>
                                <div className="col">
                                    <label className="col mt-2">Drejtimi:</label>
                                </div>
                                </div>
                                <div className="row"> 
                                <div className="col"> 
                                <Select
                                          id="14"
                                          value={this.state.kodiLevizjesNew}
                                          onChange={this.onChangeFunc10("kodiLevizjesNew")}
                                          options={this.convertToDropDown(
                                              this.state.dataKodLevizje
                                            )}
                                          on
                                          
                                        />
                                      </div>
                                      <div className="col"> 
                                      <Select
                                          id="15"
                                          value={this.state.kodiLevizjesDrejtim}
                                          onChange={this.onChangeFunc2("kodiLevizjesDrejtim")}
                                          options={this.convertToDropDown(
                                              this.state.dataKodDrejtim
                                            )}
                                            isDisabled={true}
                                        />
                                      </div>
                                </div>
          
                                <div className="row">
                                <div className="col">
                                    <label className="col mt-2">Kodi Levizjes:</label>
                                </div>
                                <div className="col">
                                    <label className="col mt-2">Brandi:</label>
                                </div>                                
                                </div>
                                <div className="row"> 
                                <div className="col"> 
                                <Select
                                          id="18"
                                          value={this.state.kodiLevizjesShrese}
                                          onChange={this.onChangeFunc4("kodiLevizjesShrese")}
                                          options={this.convertToDropDown(
                                              this.state.dataLevizjeShtese
                                            )}
                                        />
                                      </div>
                                      <div className="col">
                                      <Select
                                          id="16"
                                          value={this.state.kodiLevizjesBrandNew}
                                          onChange={this.onChangeFunc3("kodiLevizjesBrandNew")}
                                          options={this.convertToDropDown(
                                              this.state.dataKodLevizjeBrand
                                            )}
                                        /> 
                                      
                                      </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6 "> 
                                      </div>
                                <div className="col"> 
                                <label className="col mt-2">Menyra e levizjes:</label>
                                <Select
                                          id="17"
                                          value={this.state.kodiLevizjesMenyra}
                                          onChange={this.onChangeFunc3("kodiLevizjesMenyra")}
                                          options={this.convertToDropDown(
                                              this.state.dataMenyraLevizjes
                                            )}
                                          
                                        />
                                      </div>
                                </div>
                              </div>)}
                    <div className="card card-body bg-light col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">                            
                            <label className="ml-2 mt-3">Kush Paguan </label>
                          </div>

                          <div className="col-md-6 mt-2">
                            <Select
                              id="5"
                              className="custom-Select"
                              value={this.state.kushPaguan}
                        
                              onChange={this.onChangeFuncDerguesName("kushPaguan")}
                              options={optionsPagesa}
                              
                              //   return op.value === "True";
                              // })}                         
                            />
                          </div>
                          {this.state.showKlienteSubjektKundrejtPagese? 
                          <div className="col-md-12 mt-2">                          
                              <Select                         
                             className="custom-Select"
                             //value={this.state.kushPaguan}
                             onChange={this.onChangeFuncMarres("klienteSubjekteDergues", this.state.kushPaguan, this.state.menyrePagese)}                            
                             options={this.convertToDropDown(this.state.data8)}
                            
                              defaultValue={{ value: "__EDSHOP_", label: "__EDSHOP_" }}
                           />                                                   
                          </div>
                          
                          :""}
                        </div>

                        <div className="row"> 
                        <div className="col-md-2">{''}</div>                                       
                          <div className="col-md-10 mt-3">                         
                            <input
                              id="6"
                              className="ml-2 mt-2"
                              type="radio"
                              name="menyrePagese"
                              value="Me Kesh"
                              defaultChecked={this.state.radiocheck1}
                              onChange={this.handleChangeRadio}
                            />
                            <span className="m-2">Me kesh</span>                     
                            <input
                              className="ml-5 mt-2"
                              type="radio"
                              name="menyrePagese"
                              value="Me Kredi"
                              defaultChecked={!this.state.radiocheck1}
                              onChange={this.handleChangeRadio}
                            />
                            <span className="m-2">Me kredi</span>
                            </div>
                            {this.state.showKlientSubjekte?
                          <div className="col-md-12 mt-2">
                          
                           <Select
                          className="custom-Select mt-2"
                          //value={this.state.kushPaguan}
                          onChange={this.onChangeFuncDergues("derguesiKl")}
                          
                      
                        />                                                                        
                       </div>
                           : ""}                    
                          </div> 
                          <div className="row"><label className="m-2">{" "}</label></div>                                               
                           </div>
                           <div className="col-md-6">
                             {this.state.kodiLevizjesShrese!=""?
                              <div className="card card-body bg-light col-md-12">
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="ml-2 mt-3">Cmimi Baze</label>
                                  </div>
                                  <div className="col-md-5 mt-2">
                                  <input
                                      id="10"
                                      placeholder="Cmimi Baze"
                                      className="form-control "
                                      type="text"
                                      name="cmimibazetry"
                                      required
                                      value={this.state.cmimibazetry}
                                      onChange={(e) =>
                                        this.handleInputChangeNumber(e, "cmimibazetry")
                                      }
                                  />
                                  </div>
                                  <div className="col">
                                  <Select
                                    id="31"
                                    className="custom-Select mt-2"
                                    value={this.state.monedhacmimibaze}
                                    onChange={this.onChangeFunc("monedhacmimibaze")}
                                    options={monedha}
                                    defaultValue={monedha[1]}
                                    isOptionDisabled={(option) => option.disabled}
                                  /> 
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">{''}</div>
                                  <div className="col">
                                    <label className="ml-2 mt-4">Kursi</label>
                                  </div>
                                  <div className="col-md-4 mt-2">
                                  <input
                                      id="32"
                                      className="form-control "
                                      type="text"
                                      name="Kursiii"
                                      required
                                      value={this.state.kursi}
                                      disabled={true}
                                  />
                                  </div>
                                </div>
                                <div className="row">
                                <div className="col-md-3">
                                    <label className="ml-2 mt-3">Zbritje(20%)</label>
                                </div>
                                <div className="col-md-3 mt-1">
                                    
                                    <label class="checkboxcontainer ml-4 mt-md-2">
                                      <input
                                        id="56"
                                        type="checkbox"
                                        name="test5"
                                        onChange={e =>this.handleChangeCheckZbritje2(e)}
                                        checked={this.state.zbritjeCheckbox20}
                                        />
                                   <span class="checkmark"></span>
                                   </label> 
                                    </div>
                                <div className="col-md-1">
                                    <label className="ml-2 mt-3">{""}</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="ml-2 mt-3">Zbritje(10%)</label>
                                </div>
                                
                                <div className="col-md-3 mt-1">
                                    
                                    <label class="checkboxcontainer ml-4 mt-md-2">
                                      <input
                                        id="56"
                                        type="checkbox"
                                        name="test5"
                                        onChange={e =>this.handleChangeCheckZbritje(e)}
                                        checked={this.state.zbritjeCheckbox10}
                                        />
                                   <span class="checkmark"></span>
                                   </label> 
                                    </div>
                                </div>
                                <div className="row mt-2">
                                <div className="col-md-5">
                                    <label className="ml-2 mt-3">Cmimi Baze(Leke)</label>
                                  </div>
                                  <div className="col mt-2">
                                  <input
                                      id="33"
                                      className="form-control "
                                      type="text"
                                      name="cmimibazetry"
                                      required
                                      value={this.state.cmimibazeElse}
                                      disabled={true}
                                  />
                                  </div>
                                </div>
                                <div className="row">
                                <div className="col-md-5">
                                    <label className="ml-2 mt-3">Cmimi Baze me Zbritje(Leke)</label>
                                  </div>
                                  <div className="col mt-2">
                                  <input
                                      id="34"
                                      className="form-control "
                                      type="text"
                                      name="cmimibazezbritje"
                                      required
                                      value={this.state.cmimibazezbritje}
                                      disabled={true}
                                  />
                                  </div>
                                 
                                </div>
                                <div className="row">
                                <div className="col-md-5">
                                    <label className="ml-2 mt-3">Taksa karburantit me(Leke)</label>
                                  </div>
                                  <div className="col mt-2">
                                  <input
                                      id="35"
                                      className="form-control "
                                      type="text"
                                      name="cmimitaksakarburanti"
                                      required
                                      value={this.state.cmimitaksakarburanti}
                                      disabled={true}
                                  />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3">
                                    <label className="ml-2 mt-3">Totali</label>
                                  </div>
                                  <div className="col-md-3">
                                  <button
                                    className="btn btn-dark btn-sm mt-2"
                                    onClick={(e) => this.handleTotali(e)}
                                  >
                                      <span data-notify="icon" className="pe-7s-calculator" />
                                      &nbsp; Totali
                                    </button>
                                  </div> 
                                  <div className="col mt-1">
                                  <input
                                      id="36"
                                      className="form-control "
                                      type="text"
                                      name="cmimitotal"
                                      required
                                      value={this.state.cmimitotal}
                                      disabled={true}
                                  />
                                  </div>
                                </div>
                              </div>
                              :<div className="row">
                              <div className="col-md-3">
                                <label className="ml-2 mt-3">Cmimi Baze</label>
                              </div>
                              <div className="col-md-5 mt-2">
                              <input
                                  id="10"
                                  placeholder="Cmimi Baze"
                                  className="form-control "
                                  type="text"
                                  name="cmimibazetry"
                                  required
                                  value={this.state.cmimibazetry}
                                  disabled={true}
                              />
                              </div>
                              <div className="col">
                              <Select
                                id="31"
                                className="custom-Select mt-2"
                                value={this.state.monedhacmimibaze}
                                onChange={this.onChangeFunc("monedhacmimibaze")}
                                options={monedha}
                                defaultValue={monedha[1]}
                              /> 
                              </div>
                            </div>}
                           </div></div>
                          </div>
                              <div className="card card-body bg-light col-md-12">
                                <div className="row">
                                  <div className="col-md-12">
                                    <label className="m-2">Origjina</label>
                                    <Select
                                      id="Origjina"
                                      className="custom-Select"
                                      value={{value:"TR-U014",label:"TR-U014"}}
                                      isDisabled
                                    />
                                  </div>
                                  
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label className="m-2">Korrieri</label>
                                    <Select
                                      id="12"
                                      className="custom-Select"
                                      onChange={this.onChangeFuncKorrier("korrieriUser")}
                                      value={this.state.korrierUser}
                                      options={this.convertToDropDown(this.state.dataKorriert)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label className="m-2">Tranzit</label>
                                    <input
                                      id="tranzit"
                                      className="form-control "
                                      type="text"
                                      name="tranzit"
                                      value="HUB 001" 
                                      disabled={true}
                                    />
                                  </div>
                                </div>
                              </div>

                           <div className="row">
                             <div className="col">
                               <label className="m-2">Derguesi:</label>
                             </div>
                             <div className="col">
                               <label className="mt-2 ml-1">Marresi:</label>
                             </div>
                           </div>
                           <div className="row">
                      <div className="card card-body bg-light col-md-auto ml-3">
                        <div className="row">
                          <div className="col">
                          {" "}
                            <label className="m-2">Emri/Subjekti</label>
                            <input
                              className="form-control "
                              type="text"
                              name="derguesi"
                              id="20"
                              value={this.state.derguesi}
                              onChange={this.handleInputChange}
                         
                              disabled={this.state.showKlient}
                            />
                          </div></div>
                          <div className="row">
                          <div className="col">
                            {""}
                            <label className="m-2">Adresa</label>
                            <input
                              id="21"
                              className="form-control"
                              type="text"
                              value={this.state.adresaDerguesit}
                              name="adresaDerguesit"
                              onChange={this.handleInputChange}
                              
                            />
                          </div></div>
                          <div className="row">
                          <div className="col">
                            <label className="m-2">Shteti</label>
                            <Select
                              id="22"
                              className="custom-Select"
                              value={this.state.shtetiDergues}
                              onChange={this.onChangeFuncShtet("shtetiDergues")}
                              options={optionsShteti}
                              defaultValue={optionsShteti[0]}
                              required
                            />
                          </div>
                        
                          <div className="col">
                            {" "}
                            <label className="m-2">Qyteti</label>
                            {this.state.showCity ? (
                              <Select
                                id="23"
                                value={this.state.qytetiDergues}
                                onChange={this.onChangeFunc("qytetiDergues")}
                                options={this.convertToDropDown({
                                  616: "PRISHTINE",
                                })}
                              />
                            ) : (
                              <Select
                                id="23"
                                value={this.state.qytetiDergues}
                                onChange={this.onChangeFunc("qytetiDergues")}
                                options={this.convertToDropDownCity(
                                  this.state.data2
                                )}
                                isDisabled={this.state.showKlient}
                              />
                            )}
                          </div>
                          </div>
                          <div className="row">
                          <div className="col">
                            {" "}
                            <label className="m-2">Telefon</label>
                            <input
                              id="90"
                              className="form-control"
                              type="text"
                              name="telDerguesi"
                              value={this.state.telDerguesi}
                              onChange={(e) =>
                                this.handleInputChangeNumber(e, "telDerguesi")
                              }
                            />
                          </div>
                         
                        </div>
                      </div>
                      <div className="card card-body bg-light col-md-auto ml-4 mr-3">
                        <div className="row">
                          <div className="col">
                            <label className="m-2">Emri/Subjekti</label>
                            <input
                              id="9"
                              className="form-control "
                              type="text"
                              name="marresi"
                              value={this.state.marresi}
                              onChange={this.handleInputChange}
                              disabled={this.state.showKlientMarresi}
                            />
                          </div></div>
                          <div className="row">
                          <div className="col">
                            {""}
                            <label className="m-2">Adresa</label>
                            <input
                              id="0"
                              className="form-control"
                              type="text"
                              value={this.state.adresaMarresi}
                              name="adresaMarresi"
                              onChange={this.handleInputChange}
                              
                            />
                          </div></div>
                          <div className="row">
                          <div className="col">
                            <label className="m-2">Shteti</label>
                            <Select
                              id="11"
                              className="custom-Select"
                              onChange={this.onChangeFuncShtet("shtetiMarres")}
                              options={this.convertToDropDownState(this.state.dataShtete)}
                              value={this.state.shtetiMarres}
                              //isDisabled={this.state.showState}
                              //required
                            />
                            
                          </div>
                        
                          <div className="col">
                            {" "}
                            <label className="m-2">Qyteti</label>
                            {this.state.showCity ? (
                              <Select
                                id="8"
                                value={this.state.qytetiMarres}
                                onChange={this.onChangeFunc("qytetiMarres")}
                                options={this.convertToDropDown({
                                  616: "PRISHTINE",
                                })}
                              />
                            ) : (
                              <Select
                                id="8"
                                value={this.state.qytetiMarres}
                                onChange={this.onChangeFunc("qytetiMarres")}
                                options={this.convertToDropDownCity(
                                  this.state.data2
                                )}

                              />
                            )}
                          </div>
                          </div>
                          <div className="row">
                          <div className="col">
                            {" "}
                            <label className="m-2">Telefon</label>
                            <input
                              id="30"
                              className="form-control "
                              type="text"
                              name="telMarresi"
                              value={this.state.telMarresi}
                              onChange={(e) =>
                                this.handleInputChangeNumber(e, "telMarresi")
                              }
                            />
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    {this.state.showQytetFshat==true? 
                    <div className="card card-body bg-light col-md-12">
                      <div className="row">
                        <div className="col">
                          <label className="m-2">Qytet/Fshat</label>
                          <Select
                              id="19"
                              className="custom-Select"
                              value={{value:this.state.qytetfshat,label:this.state.qytetfshat}}   
                              // onChange={this.onChangeFuncQF()}                         
                              // options={this.convertToDropDown(this.state.dataNjesiAdministrative)} 
                              required
                            />
                        </div>
                        <div className="col">
                          <label className="m-2">Njesia Administrative</label>
                          <Select
                              id="45"
                              className="custom-Select"
                              //onChange={this.onChangeFunc("kodiPershkrimit")}                           
                              value={{value:this.state.njesiadministrative,label:this.state.njesiadministrative}}
                              //options={this.convertToDropDown({value:this.state.qytetfshat,label:this.state.qytetfshat})}
                              required
                            />
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-md-3"></div>
                      <div className="col-md-6 mt-3">                         
                            <input
                              id="6"
                              className="m-2"
                              type="radio"
                              name="NjesiAdmin"
                              value="Qytet"
                              onChange={this.handleChangeRadio1}
                              defaultChecked={this.state.radiocheck2}
                            />
                            <span className="m-2">Qytet</span>                     
                            <input
                              className="m-2"
                              type="radio"
                              name="NjesiAdmin"
                              value="Fshat"
                              onChange={this.handleChangeRadio1}
                              defaultChecked={!this.state.radiocheck2}
                            />
                            <span className="m-2">Fshat</span>
                            </div>
                      </div>
                    </div>
                    :null}
                    <div className="row">
                          <div className="col-md-10 mb-3">
                            {" "}
                            <label className="m-2">Komente</label>
                            <input
                              className="form-control "
                              type="text"
                              name="komente"
                              value={this.state.komente}
                              onChange={(e) =>
                                this.handleInputChange(e, "komente")
                              }
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="m-2">Konfirmim Marrje</label>
                            <label class="checkboxcontainer mt-sm-1 ml-md-1">                           
                           <input
                              id="67"
                              type="checkbox"
                              name="test"
                              onChange={e =>this.handleChangeCheckKonfirmim(e)}
                              defaultChecked={this.state.konfirmimCheckbox}
                            />
                            <span class="checkmark"></span>
                            </label> 
                          </div>
                        </div>
                        <div className="row">
                          <label className="m-4">{" "}</label>
                        </div>
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            onClick={() => this.deleteThisGoal2()}
                            className="btn btn-primary"
                          >
                            <i className="fa fa-trash" aria-hidden="true" />{" "}
                            <span
                              data-notify="icon"
                              className="pe-7s-diskette"
                            />
                            &nbsp; Ruaj
                          </button>
                          {this.state.alert}
                        </div>
                        <div className="col-md-6">
                          <button
                            onClick={() => this.deleteThisGoal()}
                            className="btn btn-danger float-right"
                          >
                            <i className="fa fa-trash" aria-hidden="true" />{" "}
                            <i className="fa fa-trash" aria-hidden="true" />{" "}
                            <span data-notify="icon" className=" pe-7s-trash" />
                            &nbsp; Pastro
                          </button>
                          {this.state.alert}
                        </div>

                      </div>
                      <div className="row mt-2">
                        {this.state.showPrint==true?
                      <button className="btn btn-primary ml-3 mt-2" onClick={this.handlePrint}>
              <span data-notify="icon" className="pe-7s-print" />
              &nbsp; Printo A4
            </button>:null}
                      </div>
                    </div>
                  }
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="btn btn-primary btn-sm m-2" onClick={handleClose}>
          Ruaj&MByll
        </button>
      </section>
    </div>
  );
};

export const Modal2 = ({ handleClose, showModal, children }) => {
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="btn btn-primary btn-sm m-2" onClick={handleClose}>
          MByll
        </button>
      </section>
    </div>
  );
};

export default Grumbullime;
