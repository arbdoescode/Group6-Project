
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class KomisionDorezimeRes :BaseRes
    {

        public string Nr_POD { get; set; }
        public string Pershkrimi { get; set; }
        public string Kod_Levizje { get; set; }
        public string Kush_Paguan { get; set; }  
        public Nullable<decimal> Totali { get; set; }
        public string Origjina { get; set; }
        public string Data { get; set; }
        public string Menyre_Pagese { get; set; }
        public string Kodi_Produktit { get; set; }
        public string Kliente_Subjekte_Dergues { get; set; }
        public string Kliente_Subjekte_Marres { get; set; }
        public string Agjensia_Dorezuese { get; set; }
        public string Cmimi_Baze { get; set; }
        public string Komisioni { get; set; }

        public string VlCmimiBazeEuro { get; set; }

        public string CmimiZbritje { get; set; }

      



    }
}