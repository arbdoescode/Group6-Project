using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class GjurmoResp: BaseRes
    {
        public string koditem { get; set; }

        public Nullable<System.DateTime> data { get; set; }

        public string AgjEmriBurim { get; set; }
        public string Operatori { get; set; }
        public string Veprimi { get; set; }
        public string CantaItemKod { get; set; }
    }
}