using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class CriticalDashboardReq
    {
        public string QytetiDestinacion { get; set; }
        public string QytetiOrigjine { get; set; }
        public string nrPOd { get; set; }
        public string KlientSubjektEmri { get; set; }
        public string Pershkrimi { get; set; }
        public string pNga { get; set; }
        public string pDeri { get; set; }
        public string dtDeriGrumbullim { get; set; }
        public string dtNgaGrumbullim { get; set; }
        public string pStatus { get; set; }

        public string KlientSubjektID { get; set; }

        public string KodiProduktit { get; set; }

        public int ScrollCount { get; set; }

    }
}