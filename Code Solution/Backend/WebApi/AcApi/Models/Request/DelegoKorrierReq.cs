using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class DelegoKorrierReq : BaseReq
    {
        public string NrRendor { get; set; }

        public string [] PodKodi { get; set; }

        public string CantaKodi { get; set; }

        public string AgjensiBurim { get; set; }

        public string Perdorues { get; set; }

        public string Terminal { get; set; }

        public string StatusPod { get; set; }

        public string StatusFizikPod { get; set; }

        public string Targa { get; set; }

        public string Marresi { get; set; }

        public string IsKBo { get; set; }

        public string Korrieri { get; set; }

        public string AgjensiaDestinacion { get; set; }
    }
}