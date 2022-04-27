 import React from "react";




export  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="btn btn-primary btn-sm m-2" onClick={handleClose}>
            Mbyll
          </button>
        </section>
      </div>
    );
  };

  export  const columns2 = [
    {
      Header: "Kodi",
      accessor: "koditem",
    },
    {
      Header: "Data",
      accessor: "data",
    },
    {
      Header: "Veprimi",
      accessor: "Veprimi",
    },

    {
      Header: "Canta",
      accessor: "CantaItemKod",
      Cell: (row) => (
        <div>
          <span title={row.value}>{row.value}</span>
        </div>
      ),
    },
  ];



  export const optionsPagesa = [
    { value: "True", label: "Paguan Derguesi" },
    { value: "False", label: "Paguan Marresi" },
    { value: "5", label: "Te Gjitha" },
  ];
  
  export const menyrePagese = [
    { value: "True", label: "Me Kredi" },
    { value: "False", label: "Me Kesh" },
    { value: "5", label: "Te Gjitha" },
  ];
  export const kodeProdukte = [
    { value: "1", label: "D2D" },
    { value: "2", label: "P2P" },
    { value: "3", label: "D2DK" },
    { value: "4", label: "P2PK" },
    { value: "5", label: "Te Gjitha" },
  ];