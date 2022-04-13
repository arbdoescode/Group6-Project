using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class CriteriaTransLogDorezimeParam
    {
        public string QytetiDestinacion { get; set; }
        public string QytetiOrigjine { get; set; }
        public string nrPOd { get; set; }

        public long Username { get; set; }


        public string Agjensi { get; set; }

        public string PerdoruesAgjensi { get; set; }

        public string ProcesorId { get; set; }

        public string Terminal { get; set; }

        public string PerdoruesName { get; set; }

        public string KlientSubjektEmri { get; set; }
        public string Pershkrimi { get; set; }
        public string pNga { get; set; }
        public string pDeri { get; set; }
        public string pNga1 { get; set; }
        public string pDeri1 { get; set; }
        public string pStatus { get; set; }
    }
}