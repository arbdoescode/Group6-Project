import Grumbullime from "../views/Grumbullime";
//import Raport from "../views/Raport";
import React from "react";
import Fjalekalimin from "../components/Input/Fjalekalim";
import Gjurmim from "../views/Gjurmim";
import KtheMbrapsht from "../views/KtheMbrapsht";
import ShperndaKorrier from "../views/ShperndaKorrier";
import Dorezime from "../views/Dorezime";
import DorezoKthimeMbrapa from "../views/DorezoKthimeMbrapa";
import HapCante from "../views/HapCante";
import PrintoPod from "../views/PrintoPod";
import KrijoCante from "../views/KrijoCante";
import KrijoCanteKthime from "../views/KrijoCanteKthime";
import PranoCante from "../views/PranoCante";
import Select from "react-select";
import Raportet from "../views/Raporte/Raportet";
import ShtoGrumbullime from "../views/ShtoGrumbullime";

import RaportGrumbullimeArka from "../views/Raporte/RaportGrumbullimeArka";

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
    path: "/ndrysho/fjalekalimin",
    name: <p align="left">Ndrysho Fjalekalimin</p>,
    icon: "pe-7s-door-lock",
    component: Fjalekalimin,
    
  },

  { redirect: true, path: "/#", to: "/dashboard", name: "Dashboard" },
];

export default dashboardRoutes;
