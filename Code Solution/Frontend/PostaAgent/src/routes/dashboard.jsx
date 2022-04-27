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
  //
  {
    path: "/gjurmo",
    name: <p align="left">Gjurmo POD</p>,
    icon: "pe-7s-search",
    component: Gjurmim,
   items :  Grumbullime 

  },
//
  {
    path: "/grumbulime/agjent",
    name: <p align="left">Grumbullime Agjent</p>,
    icon: "pe-7s-search",
    component: Grumbullime


  },
  //
  {
    path: "/shto/grumbulime",
    name: <p align="left">Shto Grumbullime</p>,
    icon: "pe-7s-search",
    component: ShtoGrumbullime


  },
  //
  {
    path: "/shperndarja/korrier",
    name: <p align="left">Shperndarja ne Korrier</p>,
    icon: "pe-7s-phone",
    component: ShperndaKorrier,
  },
//
  {
    path: "/dorezime",
    name: <p align="left">Dorezime</p>,
    icon: "pe-7s-diskette",
    component: Dorezime,
  },
  //
  {
    path: "/printo/fature",
    name: <p align="left">Printo Pod</p>,
    icon: "pe-7s-print",
    component: PrintoPod,
    
  },
  //
  {
    path: "/kthe/mbrapsht",
    name: <p align="left">Kthe Mbrapsht</p>,
    icon: "pe-7s-back",
    component: KtheMbrapsht,
  },
  //
  {
    path: "/klient/kthim/dorezim",
    name: <p>Dorezo Kthime Mbrapa ne Klient</p>,
    icon: "pe-7s-diskette",
    component: DorezoKthimeMbrapa,
  },
  //
  {
    path: "/krijo/cante",
    name: <p align="left">Krijo Cante</p>,
    icon: "pe-7s-shopbag",
    component: KrijoCante,
  },
  //
  {
    path: "/hap/cante",
    name: <p align="left">Hap Verifiko Cante</p>,
    icon: "pe-7s-unlock",
    component: HapCante,
  },
  //
  {
    path: "/prano/cante",
    name: <p align="left">Prano Cante</p>,
    icon: "pe-7s-check",
    component: PranoCante,
  },

  {
    path: "/arka/kesh/GRumb",
    name: <p align="left">Raporte</p>,
    icon: "pe-7s-folder",
   component:Raportet,
  // items:KtheMbrapsht
  },
  //
  {
      path: "/ndrysho/fjalekalimin",
    name: <p align="left">Ndrysho Fjalekalimin</p>,
    icon: "pe-7s-door-lock",
    component: Fjalekalimin,
    
  },

  { redirect: true, path: "/#", to: "/dashboard", name: "Dashboard" },
];

export default dashboardRoutes;
