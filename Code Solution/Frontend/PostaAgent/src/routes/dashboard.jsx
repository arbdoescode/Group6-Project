import React from "react";
import Select from "react-select";

import Fjalekalimin from "../components/Input/Fjalekalim";
import Grumbullime from "../views/Grumbullime";

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
    path: "/grumbulime/agjent",
    name: <p align="left">Grumbullime Agjent</p>,
    icon: "pe-7s-search",
    component: Grumbullime


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
