using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class PodKosovaReq : BaseReq
    {
        public string NrRendor { get; set; }

        public string Pod { get; set; }

        public string Derguesi { get; set; }

        public string AdresaDerguesit { get; set; }
 
        public string KodSherbimiD { get; set; }

        public string KodSherbimiP { get; set; }

        public string KodSherbimiDK { get; set; }

        public string KodSherbimiPK { get; set; }

        public string Pesha { get; set; }

        public string VleraMallit { get; set; }

        public string TarifaPostare { get; set; }

        public string Marresi { get; set; }

        public string Qyteti { get; set; }

        public string Adresa { get; set; }

        public string NrTelefoni { get; set; }

        public string KushPaguan { get; set; }

        public string VleraEuro { get; set; }

        public string VleraLeke { get; set; }

        public string Status { get; set; }

        public string KlientSubjektID { get; set; }

        public string MenyrePageseKesh { get; set; }

        public string MenyrePageseKredi { get; set; }

        public string Token { get; set; }

        public string Cmimi { get; set; }

        public string username { get; set; }


    }
}