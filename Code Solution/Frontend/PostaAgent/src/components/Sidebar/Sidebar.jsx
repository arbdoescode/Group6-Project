import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HeaderLinks from "../Header/HeaderLinks.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";
import RaportGrumbullimeArka from "../../views/Raporte/RaportGrumbullimeArka.jsx";
import RaportPodeGrumbulluar from "../../views/Raporte/RaportPodeGrumbulluar.jsx";
import RaportDorezimeArka from "../../views/Raporte/RaportDorezimeArka.jsx";
import Select from "react-select";
import Grumbullime from "../../views/Grumbullime.jsx";

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

                    {/* {prop.items?<Select   className="custom-Select mt-4"
            value={this.state.select}
            onChange={this.onChangeFunc("select")}
                  options={selectRaport} >  
                    {this.state.select.value == "1" ? <p>etst</p> : null}
                 
                 {console.log(this.state.select.value , )} 
                 </Select>  : 
                     <NavLink
                     to={prop.path}                
                    className="nav-link"
                   active
                   ClassName="active"
                      >
                       <i className={prop.icon} />
                     <p>{prop.name}</p>
                    </NavLink>
             
                   }  */}

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
          </ul>
        </div>
       
        
      </div>
    );
  }
}

export default Sidebar;