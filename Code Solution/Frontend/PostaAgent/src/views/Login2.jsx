import React, { Component } from "react";
import axios from "axios";
import "../components/Login.css";
import Errors from "../components/Input/Errors";
import Alerts from "./Alerts";
import TestVariable from "../variables/TestVariables";

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
      <div>  
        <div id="top_menu">
        <div id="logo"></div>
        <div  >
        <button class="btn btn-lg float-right" style={{backgroundColor:"#F6B245",borderColor:"transparent",color:"white",width:"200px",borderRadius:"35px",marginRight:"150px"}}>Contacts</button>
    <button class="btn btn-lg float-right" style={{backgroundColor:"#8C617F",borderColor:"transparent",color:"white",width:"200px",borderRadius:"35px",marginRight:"80px"}}>Home</button>
  
</div>

        </div>

        <h1
 
      style={{ display: "flex", justifyContent: "center",position:"relative",color:"white"}}
    >Sign In
    </h1>
    <div id="postman">
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
                {/* <TestVariable
                  changed={e => this.handleInputChange(e, "password")}
                  name={this.state.password}
                ></TestVariable> */}

                <input
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
          </div>
   
      </div>
    );
  }
}

export default Login2;



