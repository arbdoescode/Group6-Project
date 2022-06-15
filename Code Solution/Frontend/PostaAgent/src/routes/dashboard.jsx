import Grumbullime from "../views/Grumbullime";
//import Raport from "../views/Raport";
import React from "react";
import Fjalekalimin from "../components/Input/Fjalekalim";

import PrintoPod from "../views/PrintoPod";
import KrijoCante from "../views/KrijoCante";

import Dashboard from "../views/RaportDashboard"


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
  { value: "11", label: "Raport Operativ" },
];


const dashboardRoutes = [
 
  {
    path: "/dashboard",
    name: <p align="left">Dashboard</p>,
    icon: "pe-7s-graph",
    component: Dashboard


  },

  {
    path: "/grumbulime/agjent",
    name: <p align="left">Grumbullime Agjent</p>,
    icon: "pe-7s-search",
    component: Grumbullime


  }, 
  {
    path: "/printo/fature",
    name: <p align="left">Printo Pod</p>,
    icon: "pe-7s-print",
    component: PrintoPod,
    
  },
  {
    path: "/krijo/cante",
    name: <p align="left">Krijo Cante</p>,
    icon: "pe-7s-shopbag",
    component: KrijoCante,
  },


  {
      path: "/ndrysho/fjalekalimin",
    name: <p align="left">Ndrysho Fjalekalimin</p>,
    icon: "pe-7s-door-lock",
    component: Fjalekalimin,
    
  },

  { redirect: true, path: "/#", to: "/dashboard", name: "Dashboard" },
];

export default dashboardRoutes;
