using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class DorezimeArkaAgjentRes: BaseRes
    {

        public string Nr_POD { get; set; }
        public string Pershkrimi { get; set; }
        public string Pesha__kg_ { get; set; }
        public string Kod_Levizje { get; set; }
        public string Kush_Paguan { get; set; }
        public string Shtesa { get; set; }
        public string Vl__Sig_ { get; set; }
        public string Tvsh { get; set; }
        public string Takse_Karburant_Leke { get; set; }
        public string Koment { get; set; }
        public string Vl_CmimBazeEuro { get; set; }
        public string Cmimi_me_zbritje { get; set; }
        public Nullable<decimal> Totali { get; set; }
        public string Vlera_Kunder_Pagese { get; set; }
        public string Monedha_Kunder_Pagese { get; set; }
        public string Origjina { get; set; }
        public string Qyteti_Destinacion { get; set; }
        public string Data { get; set; }
        public string Menyre_Pagese { get; set; }
        public string Kodi_Produktit { get; set; }
        public string Kliente_Subjekte_Dergues { get; set; }
        public string Kliente_Subjekte_Marres { get; set; }

        public string Korrieri { get; set; }
        public string Marresi { get; set; }

        public string MarresiNeDorezim { get; set; }

        public string Agjensia_Dorezuese { get; set; }

        public string Derguesi { get; set; }

        public string Kod_Reference { get; set; }
        public string Perdoruesi { get; set; }
    }
}