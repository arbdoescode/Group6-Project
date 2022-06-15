import React, { Component } from "react";
import moment from "moment";
import { Grid, Row, Col, Modal, Button } from "react-bootstrap";
import HmacSHA256 from "crypto-js/hmac-sha256";
import { Card } from "../components/Card/Card";
import { StatsCard } from "../components/StatsCard";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import Select from "react-select";
import DatePicker from "react-date-picker";
import swal from "sweetalert";
import Swal from 'sweetalert2';
import axios from "axios";
//import "../assets/css/grid.css";
import ReactTable from "react-table";
import "../assets/css/Modal.css";


var legendPie = {
  names: [
    "Porosi Te Krijuara",
    "Grumbullime",
    "Dorezime",
    "MosDorezime",
    "Pod ne Hub",
    "Pod ne Agjensi",
    "Refuzime",
    "Kthime ne Klient",
  ],
  types: ["icon-a", "icon-b", "icon-c", "icon-d", "icon-e", "icon-f", "icon-g","icon-h"],
  
};

const kodeProdukte = [
  { value: "1", label: "D2D" },
  { value: "2", label: "P2P" },
  { value: "3", label: "D2DK" },
  { value: "4", label: "P2PK" },
  { value: "5", label: "Te Gjitha" },
];
const yesterday = new Date();
const today = new Date();
yesterday.setDate(yesterday.getDate() - 7);
today.setDate(today.getDate());
class RaportDashboard extends Component {
  state = {
    posts: [],
    postsLikuidime: [],
    number: "",
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
    number7: "",
    number8: "",
    number9: "",
    data8: "",
    testvar:false,
    showModal: false,
    showModalLikuidime: false,
    show: false,
    showlikujdime: false,
    showlikujdime2: false,
    pDeri:today,
    //
    date: new Date(),
    dataCity: "",
    pNga: yesterday,
    statusi: "",
  
    qytetiOrigjine: "",
    qytetiDestinacion: "",
    KlientSubjektEmri: "",
    KlientSubjektID: "",
    Pershkrimi: "",
    nrPod: "",
    dataPosts: [],
    nrKodi: "",
    cmimiBaze: "",
    kushPaguan: "",
    Token: "",
    username: "",
    pStatus: "",
    emriMarresit: "",
    Total: "",
    VleraKP: "",
    TotalVP: "",
    TotalKP: "",
    check:0,
    TotalLek: "",
    resPorosiKrijuar: [],
    tablesize:0,
    //
    KodiProduktit: kodeProdukte[4],
    KodLevizje: { value: "True", label: "Te Gjitha" },
    KlienteSubjekte: { value: "True", label: "Te Gjitha" },
    klientSubjektEmri: window.UserP.usernameKS,
    loading: false,
    dataPie: {
      labels: ["", "", "", ""],
      series: [
        []
      ],
      
    },
    optionss : {
      //high: 10,
      innerWidth:10,
      distributeSeries: true,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 1 === 0 ? value : null;
        }
      }
    },
    smthcolor: {
      distributeSeries: true
    },

    _isMounted: true,
  };

  onChangeFunc = (name) => (value) => {
    // console.log(value.label);
    this.setState({
      [name]: value,
    });
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

  hideModal = () => {
    this.setState({ show: false });
  };
  hideModalLikujdime = () => {
    this.setState({ showlikujdime: false });
  };
  hideModalLikujdime2 = () => {
    this.setState({ showlikujdime2: false });
  };
  hideModalElse = () => {
    this.setState({showModalLikuidimeElse:false})
  };
  hideModal2 = () => {
    this.setState({ showModal: false });
  };
  hideModal3 = () => {
    this.setState({ showModalLikuidime: false });
  };
  showModal = () => {
    this.setState({ show: true });
  };


  showModal2 = () => {
    this.setState({ showModal: true });
  };
  showModal3 = () => {
    this.setState({ showModalLikuidime: true });
  };


  handleClick = (e) => {
    const req = {
      pDeri: this.state.pDeri,
      pNga: this.state.pNga,
      KlientSubjektEmri: this.state.klientSubjektEmri,
      Pershkrimi: this.state.KodLevizje.label,
      KodiProduktit: this.state.KodiProduktit.label,
      KlientSubjektID: this.state.KlienteSubjekte.label,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),
      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
      axios
        .post(window.UserP.url + "POD/DashboardTest", req)
        .then((response) => {
          this.setState({
            loading: false,
            number: response.data.NrPorosi,
            number1: response.data.NrMosDorezime,
            number2: response.data.NrGrumbullime,
            number3: response.data.NrDorezime,
            number4: response.data.NrPodHub,
            number5: response.data.NrDeleguarKorrier,
            number6: response.data.NrPodAgjensi,
            number7: response.data.NrKthimeKlient,
            number8: response.data.NrRefuzime,
            dataPie:{
              labels: [, , , ,],
              series: [
                response.data.NrPorosi == 0 ? 1 : response.data.NrPorosi,
                response.data.NrDorezime == 0 ? 1 : response.data.NrDorezime,
                response.data.NrMosDorezime == 0
                  ? 1
                  : response.data.NrMosDorezime,
                response.data.NrGrumbullime == 0
                  ? 1
                  : response.data.NrGrumbullime,
                response.data.NrPodHub == 0 ? 1 : response.data.NrPodHub,
                response.data.NrDeleguarKorrier == 0
                  ? 1
                  : response.data.NrDeleguarKorrier,
                response.data.NrPodAgjensi == 0
                  ? 1
                  : response.data.NrPodAgjensi,
                response.data.NrKthimeKlient == 0
                  ? 1
                  : response.data.NrKthimeKlient,
                response.data.NrRefuzime == 0 ? 1 : response.data.NrRefuzime,
              ],
            }
              

          });
        });
    });
  };
  onChangeFunc = (name) => (value) => {
    // console.log(value.label);
    this.setState({
      [name]: value,
    });
  };

  handleChange1 = (value) => {
    this.setState({
      pDeri: value,
    });
    this.state.pDeri=value;
  };

  handleChange2 = (value) => {
    this.setState({
      pNga: value,
    });
    this.state.pNga=value;
  };

  componentWillMount() {
     
      this.setState({ loading: true }, () => {
        fetch(window.UserP.url + "POD/DashboardTest", {
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
            KlientSubjektEmri: this.state.klientSubjektEmri,
            username: window.UserP.username,
            pNga:this.state.pNga.toString(),
            pDeri:this.state.pDeri.toString()
          }),
        })
          .then((res) => res.json())

          .then((data) => {
            this.setState({
              loading: false,
              number: data.NrPorosi,
              number1: data.NrMosDorezime,
              number2: data.NrPodHub,
              number3: data.NrDorezime,
              number4: data.NrDeleguarKorrier,
              number5: data.NrDeleguarKorrier,
              number6: data.NrPodAgjensi,
              number7: data.NrKthimeKlient,
              number8: data.NrRefuzime,
              number9: data.NrGrumbullime,
              KodiProduktit: [],
              dataPie:{
                labels: [],
                series: [
                  data.NrPorosi == 0 ? 0.5 : data.NrPorosi,
                  data.NrPodHub == 0 ? 0.5 : data.NrPodHub,
                  data.NrDorezime == 0 ? 0.5 : data.NrDorezime,
                  data.NrMosDorezime == 0 ? 0.5 : data.NrMosDorezime,
                  data.NrDeleguarKorrier == 0 ? 0.5 : data.NrDeleguarKorrier,
                  data.NrDeleguarKorrier == 0 ? 0.5 : data.NrDeleguarKorrier,
                  data.NrPodAgjensi == 0 ? 0.5 : data.NrPodAgjensi,
                  data.NrKthimeKlient == 0 ? 0.5 : data.NrKthimeKlient,
                  data.NrRefuzime == 0 ? 0.5 : data.NrRefuzime
                ],
                
              },
            });
          })
          .catch((error) => {
            alert(error + " Ju lutem kontaktoni departamentin e IT!");
            this.setState({
              loading: false              
            });
          });
      });
    
    
  }

  createLegend(p) {
    var legend = [];
    for (var i = 0; i < p["names"].length; i++) {
      var type = "pe-7s-server " + p["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(p["names"][i]);
    }
    return legend;
  }

  
  TestA = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPod: this.state.nrPod,
      pStatus: "Porosia Krijuar",
      // pNga: "2021-07-05",
      //     pDeri: "2021-07-05",
      //     KodAC: "GJIRAFA SHQIPERI SH.P.K"
      // pStatus: this.state.pStatus.label,
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };

    let value="";
    
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2New2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit)
          
            
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            number:tsize.toString(),
            testvar:true,
            showModal: true,
            show:true
          });
        });

          
    });

   
  }
  TestB = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPOd: this.state.nrPod,
      pStatus: "Grumbulluar",
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };

    let value="";
    
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit)
          
            
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            testvar:true,
            showModal: true,
            show:true
          });
        }); 
    });
  }
  
  TestC = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPod: this.state.nrPod,
      pStatus: "Dorezuar ne Klient",
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit) 
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            testvar:true,
            showModal: true,
            show:true
          });
        });

          
    });
  }

  TestD = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPod: this.state.nrPod,
      pStatus: "Nuk u Dorezua ne Klient",
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit) 
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            testvar:true,
            showModal: true,
            show:true
          });
        });

          
    });
  }
  //Pode ne HUB
  TestE = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPod: this.state.nrPod,
      pStatus: "Cante",
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit) 
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            testvar:true,
            showModal: true,
            show:true
          });
        });

          
    });
  }
  
  

  TestLikuidime = (e,a) => {
    if(a%2==1){
      swal("Nuk ka informacion", "Ju mund te kerkoni vetem podet e likujduara", "info");
    }else{
    const ManifestReq = {
      // qytetiOrigjine: this.state.qytetiOrigjine.value,
      // qytetiDestinacion: this.state.qytetiDestinacion.value,
      // statusi: this.state.statusi.label,
      // KlientSubjektEmri: window.UserP.usernameKS,
      // nrPod: this.state.nrPod,
      // pStatus: "Dorezuar Kthimi Mbrapsh ne Klient",
      pNga: e.toString(),
      KodAC: window.UserP.usernameKS,
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/LikuidimDitor",ManifestReq

        )
        .then((response) => {
          this.setState({ postsLikuidime: response.data, loading: false });
          
          
          this.setState({
            testvar:true,
            showModalLikuidimeElse: true,
            showlikujdime2:true
          });
        });
    });
   }
  }
  //Refuzime
  TestI = (e) => {
    const ManifestReq = {
      qytetiOrigjine: this.state.qytetiOrigjine.value,
      qytetiDestinacion: this.state.qytetiDestinacion.value,
      statusi: this.state.statusi.label,
      KlientSubjektEmri: window.UserP.usernameKS,
      nrPod: this.state.nrPod,
      pStatus: "",
      pNga: moment(this.state.pNga).format("MM/DD/YYYY"), //this.state.pNga.toLocaleDateString(),
      pDeri: moment(this.state.pDeri).format("MM/DD/YYYY"),
      Token: HmacSHA256(
        Math.round(new Date().getTime() / 1000).toString(),
        window.UserP.key
      ).toString(),

      username: window.UserP.username,
    };
    this.setState({ loading: true }, () => {
     
      axios
        .post(
          window.UserP.url + "POD/TransactionLogGrumbullimeNew2",
          ManifestReq
        )
        .then((response) => {
          this.setState({ posts: response.data, loading: false });
          let nur = [];
          let tsize = this.state.posts.length;
          for (var i = 0; i < this.state.posts.length; i++) {
            nur.push(this.state.posts[i].POD)
            nur.push(this.state.posts[i].Cmimi_Baze)
            nur.push(this.state.posts[i].Kod_Levizje)
            nur.push(this.state.posts[i].EmriMarresit)
            nur.push(this.state.posts[i].QytetiMarres)
            nur.push(this.state.posts[i].Kodi_Produktit) 
          }
          
          this.setState({
            tablevalues:nur,
            tablesize:tsize,
            testvar:true,
            showModal: true,
            show:true
          });
        });

          
    });
  }
  render()
   {const columns = [
    {
      Header: "Nr",

      id: "row",
      filterable: false,

      Cell: (row) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      Header: "Nr.POD",
      accessor: "POD",

      //  Cell: e => <a href={e.value}>{(onClick = this.showModal())}</a>
    },

    {
      Header: "Cmimi Postar",
      accessor: "Total",
    },
    {
      Header: "Cmimi Postar i Paguar",
      accessor: "Cmimi_Baze",
    },
    {
      Header: "Data(Grumbullimit)",
      accessor: "Data",
    },

    {
      Header: "Data Dorezimi",
      accessor: "DataDorezimi",
    },

    {
      Header: "Vlera e Pakos",
      accessor: "VleraKP",
    },

    {
      Header: "Kod Levizje",
      accessor: "Kod_Levizje",
    },
    {
      Header: "Marresi",
      accessor: "EmriMarresit",
    },

    {
      Header: "Qyteti Destinacion",
      accessor: "QytetiMarres",
    },
    {
      Header: "Kodi Produktit",
      accessor: "Kodi_Produktit",
    },

    {
      Header: "Status",
      accessor: "Status",
    },

    {
      Header: "Arsye Mosdorezimi",
      accessor: "Arsye",
    },
  ];
  const columns2 = [
    {
      Header: "Statusi",
      id: "row",
      filterable: false,
      
      headerStyle: {
        
        backgroundColor: '#fff',
        color : 'black',
            fontWeight : 'bold',
            
      },
      getProps: (state, rowInfo, column) => {
        return {
            style: {
                background: rowInfo && rowInfo.index%2 == 0 ? 'yellow' : rowInfo && rowInfo.index%2 == 1 ? 'black':null,
                color:rowInfo && rowInfo.index%2 == 0 ?"black":"white",
            },
        };
    },
      Cell: (row) => {
        return <div>{((row.index%2)==0?"Likuiduar":"Kundrejt Pageses")}</div>;
      },
    },
    {
      Header: "Data",
      accessor: "0",
      headerStyle: {
        
        backgroundColor: '#fff',
        color : 'black',
            fontWeight : 'bold',
            
      },
      getProps: (state, rowInfo, column) => {
        return {
            style: {
                background: rowInfo && rowInfo.index%2 == 0 ? 'yellow' : rowInfo && rowInfo.index%2 == 1 ? 'black':null,
                color:rowInfo && rowInfo.index%2 == 0 ?"black":"white",
            },
        };
    },
    },
    {
      Header: "Vlera Likuiduar Total",
      accessor: "1",
      headerStyle: {
        
        backgroundColor: '#fff',
        color : 'black',
            fontWeight : 'bold',
            
      },
      getProps: (state, rowInfo, column) => {
        return {
            style: {
                background: rowInfo && rowInfo.index%2 == 0 ? 'yellow' : rowInfo && rowInfo.index%2 == 1 ? 'black':null,
                color:rowInfo && rowInfo.index%2 == 0 ?"black":"white",
            },
        };
    },
    },
    {
      Header: "Nr. Dergesave",
      accessor: "2",
      headerStyle: {
        
        backgroundColor: '#fff',
        color : 'black',
        fontWeight : 'bold',
            
      },
      getProps: (state, rowInfo, column) => {
        return {
            style: {
                background: rowInfo && rowInfo.index%2 == 0 ? 'yellow' : rowInfo && rowInfo.index%2 == 1 ? 'black':null,
                color:rowInfo && rowInfo.index%2 == 0 ?"black":"white",
                textDecorationLine: 'underline',
                fontWeight : 'bold',
            },
        };
    },
    Cell: (row) => {
      return <div href="#Likujdime-ditore" onClick={() => this.TestLikuidime(row.original[0],row.index)}>{row.original[2]}</div>;
    },
    },

    
  ];
  const columns3 = [
    {
      Header: "Nr",

      id: "row",
      filterable: false,

      Cell: (row) => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      Header: "Nr.POD",
      accessor: "0",

      //  Cell: e => <a href={e.value}>{(onClick = this.showModal())}</a>
    },
    {
      Header: "Data",
      accessor: "1",
    },
    {
      Header: "Vlera",
      accessor: "2",
    },
    {
      Header: "Currency",
      accessor: "3",
    },
  ];
    return (

     
      <Grid fluid>
        {window.UserP.username.toUpperCase().includes("GERIADMIN") ? (
          <div>
            <Row>
              
              <Col lg={3} sm={6}>
                <label>Kliente Subjekte</label>
                <Select
                  className="custom-Select"
                  //value={this.state.kushPaguan}
                  onChange={this.onChangeFunc("KlienteSubjekte")}
                  options={this.convertToDropDown(this.state.data8)}
                  defaultValue={{ value: "Te", label: "Te Gjitha" }}
                />
              </Col>
              <Col lg={3} sm={6}>
                <label className="">Kodi Levizjes</label>
                <Select
                  onChange={this.onChangeFunc("KodLevizje")}
                  options={this.convertToDropDown(this.state.data5)}
                  defaultValue={{ value: "True", label: "Te Gjitha" }}
                />
              </Col>
              <Col lg={3} sm={6}>
                <label>Kodi Produktit</label>
                <Select
                  id="3"
                  className="custom-Select "
                  // value={this.state.kodiProduktit}
                  onChange={this.onChangeFunc("KodiProduktit")}
                  options={kodeProdukte}
                  defaultValue={kodeProdukte[4]}
                />
              </Col>
              <Col lg={3} sm={6}>
               
                <DatePicker
                  onChange={this.handleChange1}
                  value={this.state.pDeri}
                  name="pDeri"
                  dateFormat="Pp"
                  className="mt-4"
                />
                <button
                  onClick={() => this.handleClick()}
                  className="btn btn-primary ml-4 "
                >
                  {" "}
                  Kerko
                </button>
              </Col>
            </Row>
            {this.state.loading ? (
              <LoadingSpinner />
            ) : (  
            <div>
                
                <Row className="mt-4">
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-ribbon text-warning" />}
                      statsText="Porosi Te Krijuara"
                      statsValue={this.state.number}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Dje"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-wallet text-success" />}
                      statsText="Pode te Grumbulluara"
                      statsValue={this.state.number2}
                      statsIcon={<i className="fa fa-calendar-o" />}
                      statsIconText="Dje"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-graph1 text-success" />}
                      statsText="Pode te Dorezuara"
                      statsValue={this.state.number3}
                      statsIcon={<i className="fa fa-clock-o" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-graph1 text-danger" />}
                      statsText="Pode te Padorezuar"
                      statsValue={this.state.number1}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-home text-warning" />}
                      statsText="Pode ne HUB"
                      statsValue={this.state.number4}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-car text-success" />}
                      statsText="Pod Deleguar Korrierit"
                      statsValue={this.state.number5}
                      statsIcon={<i className="fa fa-calendar-o" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>

                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-home text-success" />}
                      statsText="Pod ne Agjensi"
                      statsValue={this.state.number6}
                      statsIcon={<i className="fa fa-clock-o" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-box1 text-danger" />}
                      statsText="Pode te Kthyera Mbrapa ne Klient"
                      statsValue={this.state.number7}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={3} sm={6}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-graph1 text-danger" />}
                      statsText="Refuzime"
                      statsValue={this.state.number8}
                      statsIcon={<i className="fa fa-clock-o" />}
                      statsIconText="Statusi i fundit"
                    />
                  </Col>

                 
                </Row>
              </div>
            )}
          </div>
        ) : (
          <div>
            {this.state.loading ? (
              <LoadingSpinner />
            ) : (
              <div>


{this.state.showModal ? (
                              <div>
                                <ModalNew
                                  showModal={this.state.showModal}
                                  handleClose={this.hideModal}
                                  className="modal fade docs-example-modal-sm"
                                  tabindex="-1"
                                  role="dialog"
                                  aria-labelledby="mySmallModalLabel"
                                  aria-hidden="true"
                                  show={this.state.show}
                                >
                             
                                { <ReactTable
                                columns={columns}
                                data={this.state.posts}
                                defaultPageSize={10}
                                className="-striped -highlight mt-4 mr-3 ml-3"
                                pageText="Faqe"
                                nextText="Para"
                                rowsText="Rreshta"
                                previousText="Mbrapa"
                                noDataText="Nuk ka te dhena"
                                
                              />
                              }
                            
                            
                                </ModalNew> 
                                     </div>): null}
                
                <Row className="mt-4">
                  <Col lg={4} sm={6}>
                  <a href="#Porosi-te-krijuara" onClick={() => this.TestA()}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-ribbon text-primary" />}
                      statsText="Porosi Te Krijuara"
                      statsValue={this.state.number}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    /></a>
                  
                  </Col>
                  <Col lg={4} sm={6}>
                  <a href="#Pode-te-grumbulluara" onClick={() => this.TestB()}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-wallet text-success" />}
                      statsText="Pode te Grumbulluara"
                      statsValue={this.state.number2}
                      statsIcon={<i className="fa fa-calendar-o" />}
                      statsIconText="Statusi i fundit"
                    /></a>
                  </Col>

                  <Col lg={4} sm={6}>
                  <a href="#Pode-te-Dorezuara" onClick={() => this.TestC()}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-graph1 text-success" />}
                      statsText="Pode te Dorezuara"
                      statsValue={this.state.number3}
                      statsIcon={<i className="fa fa-clock-o" />}
                      statsIconText="Statusi i fundit"
                    /></a>
                  </Col>
                  </Row>
                    <Row>
                  <Col lg={4} sm={6}>
                  <a href="#Pode-te-Padorezuar" onClick={() => this.TestD()}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-graph1 text-danger" />}
                      statsText="Pode te Padorezuar"
                      statsValue={this.state.number1}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    /></a>
                  </Col>
                
                  <Col lg={4} sm={6}>
                  <a href="#Pode-ne-HUB" onClick={() => this.TestE()}>
                    <StatsCard
                      bigIcon={<i className="pe-7s-home text-warning" />}
                      statsText="Pode ne HUB"
                      statsValue={this.state.number4}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Statusi i fundit"
                    /></a>
                  </Col>
                  <Col lg={4} sm={6}>
                 
                  
                    <StatsCard
                      bigIcon={<i className="pe-7s-note2 text-primary" />}
                      statsText="Te Gjitha"
                      statsValue={this.state.number9}
                      statsIcon={<i className="fa fa-calendar-o" />}
                      statsIconText="Statusi i fundit"
                    />
              
                  </Col> 
                </Row>
                <Row>
                  
                  {/* <Row> */}
                  
                  
                </Row>
              </div>
            )}
          </div>
        )}
        <Row />
      </Grid>
      
    );
  }
}


const ModalNew = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main2">
          {children}
          <button className="btn btn-primary m-3" onClick={handleClose}>
            Mbyll
          </button>
        </section>
      </div>
    );
  };
style:{}

export default RaportDashboard;
