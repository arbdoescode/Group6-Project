using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class KtheMbrapaArkaAgjentReq
    {
        public string NrPod { get; set; }
        public string Agjensi { get; set; }
        public string KushPaguan { get; set; }
        public string KodLevizje { get; set; }
        public string MenyrePagese { get; set; }
        public string Destinacion { get; set; }
        public string KlienteSubjekte { get; set; }
        public string KodiProduktit { get; set; }
        public string Pershkrimi { get; set; }
        public string PNga { get; set; }
        public string PDeri { get; set; }
        public string Perdorues { get; set; }
        public string PerdoruesAgjensi { get; set; }
        public string ProcesorId { get; set; }
        public string Korrier { get; set; }
        public string Dergues { get; set; }
        public string StatusPodDirection { get; set; }
    }
}