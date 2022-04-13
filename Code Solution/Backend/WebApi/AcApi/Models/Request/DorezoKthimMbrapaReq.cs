using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Request
{
    public class DorezoKthimMbrapaReq : BaseReq
    {
        public string PodKodi { get; set; }

        public string CantaKodi { get; set; }
        public string AgjensiaBurim { get; set; }

        public string AgjensiaDest { get; set; }

        public string Ora { get; set; }

        public string StatusPod { get; set; }

        public string StatusFizikPod { get; set; }

        public string ArsyeMosdorezimi { get; set; }

        public long? PerdoruesId { get; set; }

        public string Shoferi { get; set; }
        public string Targa { get; set; }

        public long? Korrieri { get; set; }

        public string Marresi { get; set; }

        public string StatusPodDirection { get; set; }

        public string Terminal { get; set; }
    }
}