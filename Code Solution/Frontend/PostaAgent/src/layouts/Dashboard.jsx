import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { NavItem, Nav } from "react-bootstrap";
import LoadingSpinner from "../components/Input/LoadingSpinner";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import { style } from "../variables/Variables.jsx";

import dashboardRoutes from "../routes/dashboard.jsx";
import dashboardRoutes2 from "../routes/dashboardadmin.jsx";
import dashboardRoutes3 from "../routes/dashboardCourier.jsx";
import Login2 from "../views/Login2";
import HeaderLinks from "../components/Header/HeaderLinks";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: "",
     access: "",
     isLogedIn: false,
       isLoaded:true,
       user: "",
       _notificationSystem: null,
        number: "",
       
       url: "http://localhost:35832/api/", 
      
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
  }
  test = (key, e, searchresults) => {
    this.setState({
      isLogedIn: true,
      user: searchresults.Username,
      _notificationSystem: this.refs.notificationSystem,
    });
    localStorage.setItem('token',window.UserP.key);
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: this.state.isLogedIn
        ? "Miresevini! Ju u loguat me sukses!"
        : "Miresevini AC Programi Postar Agjent",
      // <div>
      //    <b>AC Programi Postar Agjent</b>
      // </div>
      level: level,
      position: "tr",
      autoDismiss: 10,
    });
  };
  redirectToLogin = (e) => {
    this.setState({ isLogedIn: false });
    localStorage.setItem('token','');
  };
  hoverToLogout = (e) => {
    e.target.style.backgroundColor="#d9d9d9"
    e.target.style.color="#33adff";
  };
  hoverToLeave = (e) => {
    e.target.style.backgroundColor="#fff"
    e.target.style.color="#000";
  };
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Miresevini <b>AC Programi Postar Agjent</b>{" "}
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15,
    });
  }
  componentDidMount() {}

  componentWillMount() {
      
      const name = localStorage.getItem('token');

  if(name){

    window.UserP = {
      username: "",
      password: "",
      ClientSubjectId: -1,
      usernameKS: "",
      key: "",
      agencyId:"",
      // userrole:"",
      url:this.state.url,
    };
    
  
    
    fetch(window.UserP.url + "POD/StayLogged", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        
        Token: localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      this.setState({ check: data[0],access:data[1] }); 
      
      
    if(this.state.check=="True"){
     
      const data1 = {
        username: this.state.access,
      };
      axios
      .post(window.UserP.url + "/ReLoginKS", data1)
      .then((response) => {
        const searchresults = response.data;
        this.setState({ searchresults });
      
        window.UserP.PerdoruesID = searchresults.UsernameID;
        window.UserP.usernameKS = searchresults.UsernameKS;
        window.UserP.username = searchresults.Username;
        window.UserP.key = searchresults.ResultMessage;
        window.UserP.agencyId = searchresults.AgencyId;
        window.UserP.agency = searchresults.Agjensi;
        window.UserP.terminalId = searchresults.TerminalId;
        window.UserP.idProcesori = searchresults.IdProcesori;
          this.setState({
            isLogedIn: true,
            user: searchresults.Username,
            _notificationSystem: this.refs.notificationSystem,
            isLoaded:false,
          });
         
      })
      
    }
    else{
  
      window.UserP = {
        username: "",
        password: "",
        ClientSubjectId: -1,
        usernameKS: "",
        key: "",
        terminalId: "",
        agencyId: "",
        idProcesori: "",
        url:this.state.url,
      };
         this.setState({
          isLoaded:false,
          isLogedIn:false,
        })
          this.redirectToLogin();
        }
  });
}else{
  
    window.UserP = {
      username: "",
      password: "",
      ClientSubjectId: -1,
      usernameKS: "",
      key: "",
      terminalId: "",
      agencyId: "",
      idProcesori: "",
      url:this.state.url,
    };
       this.setState({
        isLoaded:false,
      })
  }
}

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      //  this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
      if(this.state.isLoaded==true){
      return(
        <div>
          <div className="loginloader"></div>
      <LoadingSpinner/>
      </div>
      )
    }else{
    if (!this.state.isLogedIn) {
      return (
        <div>
          <NotificationSystem ref="notificationSystem" style={style} />
          <Login2 test={this.test} />
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref="mainPanel">
            {/* <label> {userProfile.use} </label> */}
            <span className="label label-success" style={style}>
              {/* headeri */}
              <div style={{"width":"100%","height":"55px","backgroundColor":"#fff","border":"1px solid #808080","position": "relative"}}>
                <div style={{"margin": "0","position": "absolute","top": "50%","-ms-transform": "translateY(-50%)","transform": "translateY(-50%)","left":"15px"}}>
                  <button className="pe-7s-power" onMouseOver={e => this.hoverToLogout(e)} onMouseOut={e => this.hoverToLeave(e)} style={{"color":"#000","background-color": "#fff", "border": "1px solid #d9d9d9","padding": "8px 10px","text-align": "center","text-decoration": "none","display": "inline-block","font-size": "18px","transition-duration": "0.4s","cursor": "pointer","borderRadius":"4px"}} onClick={() => this.redirectToLogin()}>
                    
                  </button>
                </div>
              </div>
            </span>
            <Header {...this.props} />
            { (window.UserP.UserRole==="3") ?<Switch>
              
              {dashboardRoutes.map((prop, key) => {             
                if (prop.name === "Notifications")
                  return (     
                               
                    <Route
                   
                      // path={prop.path}
                      // key={key}                                
                      // render={(routeProps) =>  (
                      //    <prop.component                    
                      //   {...routeProps}
                      //    handleClick={this.handleNotificationClick}
                      //    onClick={this.props.items}
              
                      // /> 
                 
                    path={prop.path}
                    component={prop.component}   
                      
                    key={key}
                  />                   
                  );

                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key}  />;
                return (
            
                  <Route
                    path={prop.path}
                    component={prop.component}  
                         //   component={prop.items}
                    key={key}
                  />
                );
              
              })}
              




      
            </Switch>:(window.UserP.UserRole==="2") ?<Switch>
              
              {dashboardRoutes2.map((prop, key) => {             
                if (prop.name === "Notifications")
                  return (     
                               
                    <Route
                   
                      // path={prop.path}
                      // key={key}                                
                      // render={(routeProps) =>  (
                      //    <prop.component                    
                      //   {...routeProps}
                      //    handleClick={this.handleNotificationClick}
                      //    onClick={this.props.items}
              
                      // /> 
                 
                    path={prop.path}
                    component={prop.component}   
                      
                    key={key}
                  />                   
                  );

                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key}  />;
                return (
            
                  <Route
                    path={prop.path}
                    component={prop.component}  
                         //   component={prop.items}
                    key={key}
                  />
                );
              
              })}
              




      
            </Switch>:(window.UserP.UserRole==="1") ?<Switch>
              
              {dashboardRoutes3.map((prop, key) => {             
                if (prop.name === "Notifications")
                  return (     
                               
                    <Route
                   
                      // path={prop.path}
                      // key={key}                                
                      // render={(routeProps) =>  (
                      //    <prop.component                    
                      //   {...routeProps}
                      //    handleClick={this.handleNotificationClick}
                      //    onClick={this.props.items}
              
                      // /> 
                 
                    path={prop.path}
                    component={prop.component}   
                      
                    key={key}
                  />                   
                  );

                if (prop.redirect)
                  return <Redirect from={prop.path} to={prop.to} key={key}  />;
                return (
            
                  <Route
                    path={prop.path}
                    component={prop.component}  
                         //   component={prop.items}
                    key={key}
                  />
                );
              
              })}
              




      
            </Switch>:
            
            
            null}

            <Footer />
          </div>
        </div>
      );
    }
  }
  }
 
}

export default Dashboard;
