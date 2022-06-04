import React from "react";
import Select from "react-select";

import Fjalekalimin from "../components/Input/Fjalekalim";
import HapjeCante from "../views/HapjeCante";
import Dorezime from "../views/Dorezime";
import RaportDitor from "../views/RaportDitor";

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
    path: "/hapjecante",
    name: <p align="left">Hapje Cante</p>,
    icon: "pe-7s-shopbag",
    component: HapjeCante,
  },
  {
    path: "/dorezime",
    name: <p align="left">Dorezime</p>,
    icon: "pe-7s-car",
    component: Dorezime,
  },
  {
    path: "/RaportDitor",
    name: <p align="left">Raport Ditor</p>,
    icon: "pe-7s-graph3",
    component: RaportDitor,
  },

  { redirect: true, path: "/#", to: "/dashboard", name: "Dashboard" },
];

export default dashboardRoutes;
