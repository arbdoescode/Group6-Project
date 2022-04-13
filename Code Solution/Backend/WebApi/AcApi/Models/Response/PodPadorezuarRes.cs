using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class PodPadorezuarRes: BaseRes
    {
        public string Nr_POD { get; set; }
        public string Arsye_Mosdorezimi { get; set; }
        public string Origjina { get; set; }
        public string Data { get; set; }

        public string Menyre_Pagese { get; set; }
        public string Kush_Paguan { get; set; }

        public string Derguesi { get; set; }

        public string Vlera_Kunder_Pagese { get; set; }
        public string Monedha_Kunder_Pagese { get; set; }

        public Nullable<decimal> Totali { get; set; }
     
    }
}