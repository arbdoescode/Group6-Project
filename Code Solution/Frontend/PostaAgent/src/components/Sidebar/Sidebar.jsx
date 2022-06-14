import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HeaderLinks from "../Header/HeaderLinks.jsx";
import dashboardRoutes2 from "../../routes/dashboardCourier.jsx";
import dashboardRoutes3 from "../../routes/dashboardadmin.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";


const selectRaport = [
  { value: "1", label: "Raport Grumbullime Arka" },
  { value: "2", label: "Raport Dorezime Arka" },
  { value: "3", label: "Raport Grumbullime" },
  { value: "4", label: "Raport Dorezime" },
  { value: "5", label: "Raport Pode Te Padorezuara" },
  { value: "6", label: "Raport Pode Te Kthyera Mbrapa" },
  { value: "7", label: "Printo Manifest Cante" },
  { value: "8", label: "Printo Manifest Korrieri" },
  { value: "9", label: "Raport Komision Grumbullime" },
  { value: "10", label: "Raport Komision Dorezime" },
  { value: "11", label: "Raport Operativ"  },
];



class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      select: "",
    user: window.UserP.username,
    };
  }

  onChangeFunc = (name) => (value) => {
    this.setState({
      [name]: value
      
    });
  };
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return (
      <div id="sidebar" className="sidebar" data-color="blue">
        <div className="logo">
          <a className="simple-text logo-normal">Albanian Courier</a>
        </div>
        <div className="sidebar-wrapper">
        { (window.UserP.UserRole==="1") ?
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >

                    <NavLink
                     to={prop.path}                
                      className="nav-link"
                    active
                    ClassName="active"
                      >
                       <i className={prop.icon} />
                     <p>{prop.name}</p>
                    </NavLink>
              </li>
                  );
                   
              return null;
            })}
          </ul>:(window.UserP.UserRole==="2") ?
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes2.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >

                    <NavLink
                     to={prop.path}                
                      className="nav-link"
                    active
                    ClassName="active"
                      >
                       <i className={prop.icon} />
                     <p>{prop.name}</p>
                    </NavLink>
              </li>
                  );
                   
              return null;
            })}
          </ul>:(window.UserP.UserRole==="3") ?
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {dashboardRoutes3.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >

                    <NavLink
                     to={prop.path}                
                      className="nav-link"
                    active
                    ClassName="active"
                      >
                       <i className={prop.icon} />
                     <p>{prop.name}</p>
                    </NavLink>
              </li>
                  );
                   
              return null;
            })}
          </ul>:null}
        </div>
       
        
      </div>
    );
  }
}

export default Sidebar;
