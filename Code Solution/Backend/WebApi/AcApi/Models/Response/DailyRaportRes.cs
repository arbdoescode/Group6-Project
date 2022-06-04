using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AcApi.Models.Response
{
    public class DailyRaportRes //: BaseReq
    {
        public List<string> NrPod { get; set; }

        public List<string> KodLevizje { get; set; }

        public List<string> Pershkrimi { get; set; }

        public List<string> MenyraPageses { get; set; }

        public List<string> Destinacioni { get; set; }

        public List<string> KushPaguan { get; set; }
    }
}