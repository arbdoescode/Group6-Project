import React, { Component } from "react";
import axios from "axios";
import "../components/Login.css";
import Errors from "../components/Input/Errors";
import Alerts from "./Alerts";
import TestVariable from "../variables/TestVariables";
import logo from "../components/logo.png"
import photo from "../components/postman.png"

axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

class Login2 extends Component {
  state = {
    username: window.UserP.username,
    password: window.UserP.password,
    user: "",
    validation: { required: false },
    searchresults: [],
    errors: [],
    errors2: "",
    valid: false,
  };

  handleClick = (e) => {
    const data1 = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(window.UserP.url + "/LoginKS", data1)
      .then((response) => {
        const searchresults = response.data;

        this.setState({ searchresults });

        if (searchresults.Result === true) {
         
          window.UserP.PerdoruesID = searchresults.UsernameID;
          window.UserP.usernameKS = searchresults.UsernameKS;
          window.UserP.username = searchresults.Username;
          window.UserP.key = searchresults.ResultMessage;
          window.UserP.agencyId = searchresults.AgencyId;
          window.UserP.agency = searchresults.Agjensi;
          window.UserP.terminalId = searchresults.TerminalId;
          window.UserP.idProcesori = searchresults.IdProcesori;
          window.UserP.UserRole = searchresults.UserRole;
          this.props.test("test-key", e, searchresults);

        
        } else {
          this.setState({ errors: searchresults.ResultMessage });
          this.changeInputColor();
        }
      })
      .catch((error) => {
   
        alert(error + " Ju lutem kontaktoni departamentin e IT!");
      });
  };
  checkValidity(value) {
    let isValid = false;
    if (value === "" && isValid) {
      isValid = true;
    }
    return isValid;
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleInputChange2 = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  changeInputColor = (e) => {
    document.getElementById("input2").style.borderColor = "red";
    document.getElementById("input1").style.borderColor = "red";
  };

  render() {
    return (
      <div class="logindashboard">  
     <nav class="navbar navbar-expand-lg bg-transparent">
  <div class="container-fluid mh-100">
    <a class="navbar-brand" href="#"  >
      <img src={logo} alt="" width="300" height="300"/>
      
    </a>
    <div id="btns" class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button id="btn1" class="btn btn-primary me-md-2 " type="button">Contacts</button>
  <button id="btn2" class="btn btn-primary" type="button">Home</button>
</div>
  </div>
</nav>

      
  
    {/* <div id="postman">
    <div class="image-holder"></div>
    </div>
        <div className="Form1"  style={{backgroundColor:"#F7B046",borderRadius:"10%"}}>
          
          <div id="id" className="input" style={{ display: "block", justifyContent: "center" }}>
          
            

              <div className="panel panel-default">
                {this.state.errors.length === 0 ? (
                  ""
                ) : (
                  <Errors errors={this.state.searchresults} />
                )}
                <input
                style={{backgroundColor:"#8E617F", borderRadius:"35px",textAlign:"center", borderColor:"transparent",width:"80%",margin:"auto",fontSize:"18px"}}
                id="input1"
                  className="form-control "
                  placeholder="Username"
                  type="username"
                  required
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleInputChange(e, "username")}
                />
                <TestVariable
                  changed={e => this.handleInputChange(e, "password")}
                  name={this.state.password}
                ></TestVariable>  */}

                {/* <input
                style={{backgroundColor:"#8E617F", borderRadius:"35px",textAlign:"center", borderColor:"transparent",width:"80%",margin:"auto",fontSize:"18px"}}
                id="input2"
                  className="form-control mt-4 "
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => this.handleInputChange(e, "password")}
                  name="password"
                  value={this.state.password}
                />
              </div>
              <div className="panel panel-default" >
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                   onClick={(e) => this.handleClick(e)}
                  // onClick={console.log("login")}
                  id="login"
                >
                  {this.state.tagged ? "Tagged" : "Login"}
                </button>
              </div>
            </div>
          </div> */}
          <div class="container">
          {this.state.errors.length === 0 ? (
                  ""
                ) : (
                  <Errors errors={this.state.searchresults} />
                )}
          <div class="row justify-content-md-center" id="row">
          <div class="image-postman">  
                       <img src={photo} class="img-fluid " alt="Responsive image" id="img"></img>
                     </div>
                    <div class="col-auto-lg-8 mt-5" id="log" >
                     <p className="Auth-form-title ">Sign In</p>
                     </div></div>
                     <div class="row justify-content-md-center" >
                     <div class="col-md-5"  >
      <form id="form" className="Auth-form ">
        
        <div className="Auth-form-content">
         
          <div className="form-group">
            
            <input
            id="input"
              type="email"
              className="form-control mt-1"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleInputChange(e, "username")}
              required
            />
          </div>
          <div className="form-group mt-3">
           
            <input
             id="input"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              onChange={(e) => this.handleInputChange(e, "password")}
              value={this.state.password}
              required
            />
          </div>
          <div  class="d-flex justify-content-center" >
            <button type="submit" className="btn btn-primary position-relative" id="login" 
             onClick={(e) => this.handleClick(e)}
             
             >
              Log in
            </button>
          </div>
         
        </div>
      </form>
      </div>
    </div>
    </div>
      
      </div>
    );
  }
}

export default Login2;



