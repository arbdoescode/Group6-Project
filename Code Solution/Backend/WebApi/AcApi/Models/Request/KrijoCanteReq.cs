using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class KrijoCanteReq
    {
        public string CantaKodi { get; set; }

        public string[] NrPod { get; set; }
        public string NrPodi { get; set; }

        public string AgjensiaBurim { get; set; }

        public string AgjensiaDestinacion { get; set; }

        public string Pesha { get; set; }

        public long PerdoruesId { get; set; }

        public string NrRripSigurimi { get; set; }

        public string CantaStatusRow { get; set; }

        public string CantaId { get; set; }

        public string IdProcesori { get; set; }
        
        public string CantaItemKodi { get; set; }


    }
}